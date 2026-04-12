"use client";

import { useEffect, useRef, useState } from "react";
import { ThetaAudio } from "@/lib/audio/theta";
import { AmbientAudio } from "@/lib/audio/ambient";
import type { AmbientKind, SolfeggioFrequency } from "@/lib/audio/ambient";
import { softSpeak, cancelSpeech, waitForVoices } from "@/lib/audio/voice";

// A full subliminal track — plays theta binaural beats, an optional
// ambient soundscape (rain, ocean, forest), an optional solfeggio
// frequency tone, and speaks identity phrases in a soft voice at a
// slow cadence. 100% browser-side, no audio files.

type Props = {
  title: string;
  description: string;
  phrases: string[];
  // Seconds of silence AFTER each phrase finishes speaking.
  phraseGapSeconds?: number;
  // How long the whole track runs in seconds.
  durationSeconds?: number;
  // Theta frequency (4-8 Hz). Default 6 = mid-theta.
  beatFrequency?: number;
  // Optional ambient soundscape layered under the theta.
  ambient?: AmbientKind;
  // Optional solfeggio frequency tone layered in at low volume.
  solfeggio?: SolfeggioFrequency;
};

export function SubliminalPlayer({
  title,
  description,
  phrases,
  phraseGapSeconds = 4,
  durationSeconds = 22 * 60,
  beatFrequency = 6,
  ambient,
  solfeggio,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState<string>("");
  const [showPhrase, setShowPhrase] = useState(false);

  const audioRef = useRef<ThetaAudio | null>(null);
  const ambientRef = useRef<AmbientAudio | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phraseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const orderRef = useRef<number[]>([]);
  const indexRef = useRef(0);

  useEffect(() => {
    return () => {
      stopAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stopAll() {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    if (phraseRef.current) {
      clearTimeout(phraseRef.current);
      phraseRef.current = null;
    }
    cancelSpeech();
    if (audioRef.current) {
      audioRef.current.stop().catch(() => {});
      audioRef.current = null;
    }
    if (ambientRef.current) {
      ambientRef.current.stop().catch(() => {});
      ambientRef.current = null;
    }
  }

  function shuffleOrder() {
    const order = phrases.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    orderRef.current = order;
    indexRef.current = 0;
  }

  async function schedulePhrases() {
    if (!audioRef.current || phrases.length === 0) return;
    const idx = orderRef.current[indexRef.current % orderRef.current.length];
    const phrase = phrases[idx];
    setCurrentPhrase(phrase);

    indexRef.current += 1;
    if (indexRef.current >= orderRef.current.length) {
      shuffleOrder();
    }

    // Await the voice finishing before scheduling the next phrase. This
    // prevents the next phrase from cutting off the current one when the
    // premium voice takes longer to speak than a fixed gap would allow.
    try {
      await softSpeak(phrase, "subliminal");
    } catch {
      /* ignore speech errors */
    }

    // If the player was stopped while the voice was speaking, bail out.
    if (!audioRef.current) return;

    phraseRef.current = setTimeout(() => {
      schedulePhrases();
    }, phraseGapSeconds * 1000);
  }

  async function play() {
    await waitForVoices();
    const audio = new ThetaAudio({ beatFrequency });
    audioRef.current = audio;
    await audio.start();

    // Layered ambient soundscape + optional solfeggio tone.
    if (ambient || solfeggio) {
      const ambientAudio = new AmbientAudio({
        kind: ambient ?? "none",
        volume: 0.22,
        solfeggio,
        solfeggioVolume: 0.03,
      });
      ambientRef.current = ambientAudio;
      await ambientAudio.start();
    }

    setPlaying(true);
    setElapsed(0);
    shuffleOrder();

    tickRef.current = setInterval(() => {
      setElapsed((n) => {
        if (n + 1 >= durationSeconds) {
          stopAll();
          setPlaying(false);
          return durationSeconds;
        }
        return n + 1;
      });
    }, 1000);

    // Short delay before first phrase so the theta has a moment to settle.
    setTimeout(() => {
      if (audioRef.current) schedulePhrases();
    }, 4000);
  }

  function pause() {
    stopAll();
    setPlaying(false);
  }

  const mm = Math.floor(elapsed / 60);
  const ss = String(elapsed % 60).padStart(2, "0");
  const totalMin = Math.floor(durationSeconds / 60);

  return (
    <section className="my-10 overflow-hidden rounded-soft border border-sage/20 bg-cream-warm shadow-card">
      <div className="bg-cream-deep/40 px-8 py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
              Sacred Sovereign Subliminal
            </p>
            <h3 className="mt-2 font-serif text-3xl text-sage">{title}</h3>
            <p className="mt-3 max-w-prose text-base text-sage-deep/85">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center">
          <div className="relative flex h-44 w-44 items-center justify-center">
            <div
              className={`absolute h-40 w-40 rounded-full border border-sage/40 transition-all ${
                playing ? "animate-pulse bg-sage/15" : "bg-sage/5"
              }`}
            />
            <div className="relative text-center">
              <p className="font-serif text-2xl text-sage">
                {mm}:{ss}
              </p>
              <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/60">
                of {totalMin} minutes
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            {playing ? (
              <button
                onClick={pause}
                className="rounded-soft border border-sage/40 bg-cream-warm px-6 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage"
              >
                Pause
              </button>
            ) : (
              <button
                onClick={play}
                className="rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
              >
                Begin
              </button>
            )}
            <button
              onClick={() => setShowPhrase((s) => !s)}
              className="font-sans text-[11px] uppercase tracking-quiet text-sage-deep/60 hover:text-sage"
            >
              {showPhrase ? "Hide phrases" : "Show phrases"}
            </button>
          </div>

          {showPhrase && currentPhrase && (
            <p className="mt-6 max-w-md text-center font-serif text-lg italic leading-relaxed text-sage-deep/85">
              {currentPhrase}
            </p>
          )}

          <p className="mt-6 max-w-prose text-center text-xs text-sage-deep/55">
            For the fullest effect, use headphones and a quiet room. Close
            your eyes. The body does not need to understand every word —
            the nervous system does.
          </p>
        </div>
      </div>
    </section>
  );
}
