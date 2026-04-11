"use client";

import { useEffect, useRef, useState } from "react";
import { ThetaAudio } from "@/lib/audio/theta";
import { softSpeak, cancelSpeech, waitForVoices } from "@/lib/audio/voice";
import type { Meditation, MeditationStep } from "@/content/meditations";

// A player for guided meditations. Speaks each step in the soft voice,
// waits the configured pause between steps, and plays theta binaural
// beats + ambient drone underneath the whole session.
//
// All audio is generated live in the browser. No audio files.

type Flat = MeditationStep & { stageIndex: number; stageName: string };

function flattenSteps(meditation: Meditation): Flat[] {
  const out: Flat[] = [];
  meditation.stages.forEach((stage, stageIndex) => {
    stage.steps.forEach((step) => {
      out.push({ ...step, stageIndex, stageName: stage.name });
    });
  });
  return out;
}

type PlayState = "idle" | "playing" | "paused" | "done";

export function GuidedMeditationPlayer({
  meditation,
}: {
  meditation: Meditation;
}) {
  const flat = flattenSteps(meditation);
  const [state, setState] = useState<PlayState>("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const [currentText, setCurrentText] = useState<string>("");
  const [currentStage, setCurrentStage] = useState<string>("");

  const audioRef = useRef<ThetaAudio | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepRef = useRef(0);

  useEffect(() => {
    return () => {
      stopAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function stopAll() {
    clearTimer();
    cancelSpeech();
    if (audioRef.current) {
      audioRef.current.stop().catch(() => {});
      audioRef.current = null;
    }
  }

  async function runStep(index: number) {
    if (index >= flat.length) {
      setState("done");
      stopAll();
      return;
    }
    const step = flat[index];
    stepRef.current = index;
    setStepIndex(index);
    setCurrentText(step.text);
    setCurrentStage(step.stageName);

    // Await the voice line fully. softSpeak returns a Promise that only
    // resolves once the audio (premium or browser) has actually finished
    // playing. No overlap, no choppy cut-off on long phrases.
    try {
      await softSpeak(step.text, "meditation");
    } catch {
      /* ignore speech errors */
    }

    // If the player was paused or ended while the voice was speaking,
    // the step index will have moved. Bail out cleanly.
    if (stepRef.current !== index) return;

    // Scale the configured silence a little so the practice feels
    // continuous instead of stilted. Long hold phases (20+ seconds)
    // are left mostly intact; short in-between pauses tighten up.
    const scaledPause =
      step.pause > 18 ? step.pause * 0.9 : step.pause * 0.65;

    timerRef.current = setTimeout(() => {
      if (stepRef.current !== index) return;
      runStep(index + 1);
    }, Math.max(1.5, scaledPause) * 1000);
  }

  async function play() {
    if (state === "paused") {
      setState("playing");
      runStep(stepRef.current);
      return;
    }
    await waitForVoices();
    const audio = new ThetaAudio({ beatFrequency: meditation.beatFrequency });
    audioRef.current = audio;
    await audio.start();
    setState("playing");
    setStepIndex(0);
    stepRef.current = 0;
    runStep(0);
  }

  function pause() {
    setState("paused");
    clearTimer();
    cancelSpeech();
  }

  function end() {
    stopAll();
    setState("idle");
    setStepIndex(0);
    stepRef.current = 0;
    setCurrentText("");
    setCurrentStage("");
  }

  const progress =
    flat.length === 0 ? 0 : Math.min(100, ((stepIndex + 1) / flat.length) * 100);

  return (
    <section className="overflow-hidden rounded-soft border border-sage/20 bg-cream-warm shadow-card">
      <div className="bg-cream-deep/40 px-8 py-8">
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
          Guided meditation
        </p>
        <h3 className="mt-2 font-serif text-3xl text-sage sm:text-4xl">
          {meditation.title}
        </h3>
        <p className="mt-2 font-sans text-sm text-sage-deep/70">
          {meditation.subtitle} &middot; {meditation.durationMinutes} minutes
          &middot; theta {meditation.beatFrequency} Hz
        </p>
        <p className="mt-5 max-w-prose text-base text-sage-deep/85">
          {meditation.intention}
        </p>
      </div>

      <div className="flex flex-col items-center px-8 py-10">
        <div className="relative flex h-48 w-48 items-center justify-center">
          <div
            className={`absolute h-44 w-44 rounded-full border border-sage/40 transition-all ${
              state === "playing" ? "animate-pulse bg-sage/15" : "bg-sage/5"
            }`}
          />
          <div className="relative text-center">
            {state === "idle" || state === "done" ? (
              <p className="font-serif text-xl text-sage">
                {state === "done" ? "Returned" : "Ready"}
              </p>
            ) : (
              <>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
                  {currentStage}
                </p>
                <p className="mt-1 font-serif text-xl text-sage">
                  {state === "paused" ? "Paused" : "Holding"}
                </p>
              </>
            )}
          </div>
        </div>

        {currentText && (state === "playing" || state === "paused") && (
          <p className="mt-6 max-w-md text-center font-serif text-lg italic leading-relaxed text-sage-deep/90">
            {currentText}
          </p>
        )}

        <div className="mt-8 flex items-center gap-3">
          {state === "idle" || state === "done" ? (
            <button
              onClick={play}
              className="rounded-soft bg-sage px-7 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
            >
              {state === "done" ? "Begin again" : "Begin"}
            </button>
          ) : state === "paused" ? (
            <>
              <button
                onClick={play}
                className="rounded-soft bg-sage px-7 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
              >
                Resume
              </button>
              <button
                onClick={end}
                className="rounded-soft border border-sage/40 bg-cream-warm px-6 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage"
              >
                End
              </button>
            </>
          ) : (
            <>
              <button
                onClick={pause}
                className="rounded-soft border border-sage/40 bg-cream-warm px-6 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage"
              >
                Pause
              </button>
              <button
                onClick={end}
                className="rounded-soft border border-sage/20 bg-cream-warm px-6 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep/70 hover:border-sage/40"
              >
                End
              </button>
            </>
          )}
        </div>

        <div className="mt-6 w-full max-w-md">
          <div className="h-1 rounded-full bg-cream-deep">
            <div
              className="h-full rounded-full bg-sage transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="mt-6 max-w-prose text-center text-xs text-sage-deep/55">
          For the fullest effect, use headphones and a quiet room. Close your
          eyes. The voice will pace you. Let the body drop the rest.
        </p>
      </div>
    </section>
  );
}
