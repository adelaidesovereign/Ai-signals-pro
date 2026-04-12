"use client";

import { useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";
import { softSpeak } from "@/lib/audio/voice";

// Nine-point EFT (Emotional Freedom Technique) tapping sequence.
// 300+ clinical trials. The user taps on meridian points while
// voicing the old belief, then the reframe. The tool guides them
// through every point with a visual indicator and optional voice.

const TAPPING_POINTS = [
  {
    key: "karate",
    label: "Karate chop",
    location: "Side of your hand",
    instruction: "Tap the fleshy side of either hand with the fingers of the other hand.",
  },
  {
    key: "eyebrow",
    label: "Eyebrow",
    location: "Inner edge of the eyebrow",
    instruction: "Tap gently on the inner edge of one eyebrow, near the bridge of your nose.",
  },
  {
    key: "side-eye",
    label: "Side of eye",
    location: "On the bone beside the outer eye",
    instruction: "Tap on the bone at the outside corner of one eye.",
  },
  {
    key: "under-eye",
    label: "Under eye",
    location: "On the bone under the eye",
    instruction: "Tap on the bone directly under one eye, centered below the pupil.",
  },
  {
    key: "under-nose",
    label: "Under nose",
    location: "Between the nose and upper lip",
    instruction: "Tap in the small groove between your nose and upper lip.",
  },
  {
    key: "chin",
    label: "Chin point",
    location: "In the crease between the lower lip and chin",
    instruction: "Tap in the crease below your lower lip, above the chin.",
  },
  {
    key: "collarbone",
    label: "Collarbone",
    location: "Just below the collarbone",
    instruction: "Find the knob where your collarbone meets your sternum. Tap just below and to the side.",
  },
  {
    key: "under-arm",
    label: "Under arm",
    location: "About four inches below the armpit",
    instruction: "Tap on the side of your body, about a hand's width below the armpit.",
  },
  {
    key: "top-head",
    label: "Top of head",
    location: "Crown of the head",
    instruction: "Tap gently on the very top of your head with your fingertips.",
  },
];

type Phase = "setup" | "tapping-old" | "tapping-new" | "done";

type TappingState = {
  oldBelief: string;
  reframe: string;
  sessions: number;
};

export function EFTTapping({
  title,
  description,
  storageKey,
}: {
  title: string;
  description: string;
  storageKey: string;
}) {
  const [state, setState, { status }] = useToolStorage<TappingState>(
    storageKey,
    { oldBelief: "", reframe: "", sessions: 0 },
  );
  const [phase, setPhase] = useState<Phase>("setup");
  const [pointIndex, setPointIndex] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const point = TAPPING_POINTS[pointIndex];

  function startOldBelief() {
    if (!state.oldBelief.trim() || !state.reframe.trim()) return;
    setPhase("tapping-old");
    setPointIndex(0);
  }

  async function nextPoint() {
    if (pointIndex < TAPPING_POINTS.length - 1) {
      setPointIndex(pointIndex + 1);
      if (voiceEnabled) {
        const text =
          phase === "tapping-old"
            ? `Even though ${state.oldBelief}, I deeply and completely accept myself.`
            : state.reframe;
        softSpeak(text, "coach").catch(() => {});
      }
    } else if (phase === "tapping-old") {
      setPhase("tapping-new");
      setPointIndex(0);
    } else {
      setState({ ...state, sessions: state.sessions + 1 });
      setPhase("done");
    }
  }

  function restart() {
    setPhase("setup");
    setPointIndex(0);
  }

  return (
    <ToolShell title={title} description={description} status={status}>
      {phase === "setup" && (
        <div className="space-y-5">
          <label className="block">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
              The old belief you are releasing
            </span>
            <textarea
              value={state.oldBelief}
              onChange={(e) =>
                setState({ ...state, oldBelief: e.target.value })
              }
              rows={2}
              placeholder="I am not safe. I am not enough. I always end up here."
              className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
            />
          </label>
          <label className="block">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
              The reframe — the truth you are installing
            </span>
            <textarea
              value={state.reframe}
              onChange={(e) =>
                setState({ ...state, reframe: e.target.value })
              }
              rows={2}
              placeholder="I am safe in my own body. I am already enough. I am coming home."
              className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
            />
          </label>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-3 text-sm text-sage-deep/75">
              <input
                type="checkbox"
                checked={voiceEnabled}
                onChange={() => setVoiceEnabled(!voiceEnabled)}
                className="accent-sage"
              />
              Voice guidance
            </label>
            <button
              onClick={startOldBelief}
              disabled={
                !state.oldBelief.trim() || !state.reframe.trim()
              }
              className="rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
            >
              Begin tapping
            </button>
          </div>
        </div>
      )}

      {(phase === "tapping-old" || phase === "tapping-new") && point && (
        <div>
          <div className="mb-4 flex gap-1">
            {TAPPING_POINTS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= pointIndex ? "bg-sage" : "bg-cream-deep"
                }`}
              />
            ))}
          </div>

          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
            {phase === "tapping-old"
              ? "Round 1 — releasing the old belief"
              : "Round 2 — installing the reframe"}
          </p>

          <div className="mt-5 flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-sage bg-sage/10">
              <span className="font-serif text-2xl text-sage">
                {pointIndex + 1}
              </span>
            </div>

            <h3 className="mt-4 font-serif text-2xl text-sage">
              {point.label}
            </h3>
            <p className="mt-2 text-sm text-sage-deep/75">
              {point.instruction}
            </p>

            <div className="mt-5 max-w-md rounded-soft border border-sage/20 bg-cream-deep/40 px-5 py-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
                {phase === "tapping-old" ? "Say out loud while tapping" : "Say the reframe while tapping"}
              </p>
              <p className="mt-2 font-serif text-lg leading-relaxed text-sage-deep">
                {phase === "tapping-old"
                  ? `Even though ${state.oldBelief}, I deeply and completely accept myself.`
                  : state.reframe}
              </p>
            </div>

            <button
              onClick={nextPoint}
              className="mt-6 rounded-soft bg-sage px-8 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
            >
              {pointIndex < TAPPING_POINTS.length - 1
                ? "Next point"
                : phase === "tapping-old"
                  ? "Begin round 2 — the reframe"
                  : "Complete the session"}
            </button>
          </div>
        </div>
      )}

      {phase === "done" && (
        <div className="text-center">
          <p className="font-serif text-2xl text-sage">
            That was a tapping session.
          </p>
          <p className="mt-4 max-w-prose text-sage-deep/85">
            Notice what shifted. The old belief may feel lighter,
            duller, further away. The reframe may feel more
            possible, more like something your body could actually
            agree with. Come back tomorrow and do another round.
            Each session loosens the root a little more.
          </p>
          <p className="mt-6 text-sm text-sage-deep/60">
            You have completed {state.sessions}{" "}
            {state.sessions === 1 ? "tapping session" : "tapping sessions"}.
          </p>
          <button
            onClick={restart}
            className="mt-5 rounded-soft border border-sage/40 bg-cream-warm px-6 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage"
          >
            Begin another session
          </button>
        </div>
      )}
    </ToolShell>
  );
}
