"use client";

import { useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";
import { softSpeak } from "@/lib/audio/voice";

// Kristin Neff's three-step Self-Compassion Break.
// Step 1: Acknowledge the suffering (mindfulness)
// Step 2: Recognize common humanity (this is not just me)
// Step 3: Offer kindness to yourself (self-kindness)
//
// Evidence: strong associations with reduced depression, lower anxiety,
// decreased rumination, increased life satisfaction. Even short exercises
// were effective in reducing negative affect.

type SCState = {
  suffering: string;
  humanity: string;
  kindness: string;
  completions: number;
};

export function SelfCompassionBreak({
  title,
  description,
  storageKey,
}: {
  title: string;
  description: string;
  storageKey: string;
}) {
  const [state, setState, { status }] = useToolStorage<SCState>(storageKey, {
    suffering: "",
    humanity: "",
    kindness: "",
    completions: 0,
  });
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);

  const steps: Array<{
    label: string;
    heading: string;
    guide: string;
    field: keyof Omit<SCState, "completions">;
    placeholder: string;
    voiceLine: string;
  }> = [
    {
      label: "1 / 3 — Mindfulness",
      heading: "This is a moment of suffering.",
      guide:
        "Name what is hard right now. Not the story. The honest sentence about what hurts. Mindfulness means acknowledging the pain without drowning in it and without pushing it away.",
      field: "suffering",
      placeholder: "What is hard right now is…",
      voiceLine: "This is a moment of suffering. That is true, and it is allowed to be true.",
    },
    {
      label: "2 / 3 — Common humanity",
      heading: "Suffering is part of being human.",
      guide:
        "Right now, somewhere, thousands of people are feeling something very close to what you are feeling. You are not the only one. You are not broken for hurting. This is what being a person includes.",
      field: "humanity",
      placeholder: "I am not alone in this because…",
      voiceLine: "Suffering is part of being human. You are not alone in this.",
    },
    {
      label: "3 / 3 — Self-kindness",
      heading: "May I be kind to myself in this moment.",
      guide:
        "Place your hand on your heart. Speak to yourself the way you would speak to someone you love who came to you in pain. What would you say? Write it. Mean it.",
      field: "kindness",
      placeholder: "What I would say to myself if I were speaking to someone I love…",
      voiceLine: "May you be kind to yourself. May you give yourself the compassion you need.",
    },
  ];

  async function advance() {
    if (step < 3) {
      const next = step + 1;
      setStep(next as 0 | 1 | 2 | 3);
      softSpeak(steps[step].voiceLine, "meditation").catch(() => {});
    }
  }

  function finish() {
    setState({ ...state, completions: state.completions + 1 });
    setStep(3);
  }

  function restart() {
    setState({ ...state, suffering: "", humanity: "", kindness: "" });
    setStep(0);
  }

  if (step === 0) {
    return (
      <ToolShell title={title} description={description} status={status}>
        <div className="text-center">
          <p className="font-serif text-xl text-sage">
            Kristin Neff's three-step self-compassion practice.
          </p>
          <p className="mt-4 max-w-prose text-sage-deep/85">
            Three steps, each one a few sentences of writing and one
            sentence spoken to you. The whole thing takes less than five
            minutes and the research says it measurably reduces suffering
            even in a single session.
          </p>
          <button
            onClick={advance}
            className="mt-6 rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
          >
            Begin the break
          </button>
          {state.completions > 0 && (
            <p className="mt-4 text-xs text-sage-deep/60">
              You have done this {state.completions}{" "}
              {state.completions === 1 ? "time" : "times"}.
            </p>
          )}
        </div>
      </ToolShell>
    );
  }

  if (step <= 3 && step >= 1 && step <= 3) {
    const current = steps[step - 1];
    if (step === 3 && state.kindness.trim()) {
      return (
        <ToolShell title={title} description={description} status={status}>
          <div className="text-center">
            <p className="font-serif text-2xl text-sage">
              You just held yourself with compassion.
            </p>
            <p className="mt-4 max-w-prose text-sage-deep/85">
              That is not a small thing. The part of you that offered
              kindness is the same part that will hold the new identity
              steady when the old pattern returns. Come back to this
              practice whenever the work gets heavy.
            </p>
            <p className="mt-6 text-sm text-sage-deep/60">
              Completed {state.completions + 1}{" "}
              {state.completions + 1 === 1 ? "time" : "times"}.
            </p>
            <button
              onClick={() => {
                setState({
                  ...state,
                  completions: state.completions + 1,
                });
                restart();
              }}
              className="mt-5 rounded-soft border border-sage/40 bg-cream-warm px-6 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage"
            >
              Begin again
            </button>
          </div>
        </ToolShell>
      );
    }

    return (
      <ToolShell title={title} description={description} status={status}>
        <div className="mb-4 flex gap-1">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-sage" : "bg-cream-deep"
              }`}
            />
          ))}
        </div>
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
          {current.label}
        </p>
        <h3 className="mt-3 font-serif text-2xl text-sage">
          {current.heading}
        </h3>
        <p className="mt-3 text-base text-sage-deep/85">{current.guide}</p>
        <textarea
          value={state[current.field]}
          onChange={(e) =>
            setState({ ...state, [current.field]: e.target.value })
          }
          rows={4}
          placeholder={current.placeholder}
          className="mt-5 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              if (step < 3) {
                advance();
              } else {
                finish();
              }
            }}
            disabled={!state[current.field].trim()}
            className="rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
          >
            {step < 3 ? "Next" : "Close the practice"}
          </button>
        </div>
      </ToolShell>
    );
  }

  return null;
}
