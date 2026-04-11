"use client";

import { useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";

// The 5-4-3-2-1 grounding practice, built as a step-by-step guided flow.
// The student names sensory details in real time. Each list is saved.

type AnchorState = {
  see: string[];
  hear: string[];
  touch: string[];
  smell: string[];
  taste: string[];
  sessions: number;
};

const STEPS: Array<{
  key: keyof Omit<AnchorState, "sessions">;
  count: number;
  label: string;
  hint: string;
}> = [
  {
    key: "see",
    count: 5,
    label: "Five things you see",
    hint: "Soft eyes. Let them land on ordinary things. A corner, a texture, a colour.",
  },
  {
    key: "hear",
    count: 4,
    label: "Four things you hear",
    hint: "Layer by layer. Closest, then further out. Your own breath counts.",
  },
  {
    key: "touch",
    count: 3,
    label: "Three things you feel against your body",
    hint: "The chair. The fabric. The temperature on your skin.",
  },
  {
    key: "smell",
    count: 2,
    label: "Two things you can smell",
    hint: "If the room is neutral, that is still one. Write what you notice.",
  },
  {
    key: "taste",
    count: 1,
    label: "One thing you can taste",
    hint: "Even if it is nothing. Write nothing if nothing is true.",
  },
];

export function PresentMomentAnchor({
  title,
  description,
  storageKey,
}: {
  title: string;
  description: string;
  storageKey: string;
}) {
  const [state, setState, { status }] = useToolStorage<AnchorState>(
    storageKey,
    {
      see: [],
      hear: [],
      touch: [],
      smell: [],
      taste: [],
      sessions: 0,
    },
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState("");

  const step = STEPS[stepIndex];
  const currentList = state[step.key];

  function addItem() {
    if (!draft.trim()) return;
    setState({ ...state, [step.key]: [...currentList, draft.trim()] });
    setDraft("");
  }

  function next() {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setState({ ...state, sessions: state.sessions + 1 });
      setStepIndex(STEPS.length);
    }
  }

  function restart() {
    setState({
      see: [],
      hear: [],
      touch: [],
      smell: [],
      taste: [],
      sessions: state.sessions,
    });
    setStepIndex(0);
    setDraft("");
  }

  return (
    <ToolShell title={title} description={description} status={status}>
      <div className="mb-5 flex gap-1">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= stepIndex ? "bg-sage" : "bg-cream-deep"
            }`}
          />
        ))}
      </div>

      {stepIndex < STEPS.length ? (
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
            {stepIndex + 1} of {STEPS.length}
          </p>
          <h3 className="mt-2 font-serif text-2xl text-sage">{step.label}</h3>
          <p className="mt-2 text-sm text-sage-deep/75">{step.hint}</p>

          <div className="mt-5 flex gap-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem();
                }
              }}
              placeholder="Name one…"
              className="flex-1 rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
            />
            <button
              onClick={addItem}
              disabled={!draft.trim()}
              className="rounded-soft bg-sage px-5 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
            >
              Add
            </button>
          </div>

          {currentList.length > 0 && (
            <ul className="mt-5 space-y-2 text-sage-deep/90">
              {currentList.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 rounded-soft border border-sage/15 bg-cream-warm px-4 py-2 font-serif"
                >
                  <span className="text-sage">&#8226;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex items-center justify-between text-xs text-sage-deep/60">
            <span>
              {currentList.length} of {step.count} named
            </span>
            <button
              onClick={next}
              disabled={currentList.length === 0}
              className="rounded-soft border border-sage/40 bg-cream-warm px-5 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage disabled:opacity-50"
            >
              {stepIndex < STEPS.length - 1 ? "Next sense" : "Close the anchor"}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="font-serif text-2xl text-sage">Anchored.</p>
          <p className="mt-4 max-w-prose text-sage-deep/85">
            Your body just gave you fifteen specific, present-moment truths.
            That is enough to break the scan. Notice how the inside of your
            head feels now compared to sixty seconds ago.
          </p>
          <p className="mt-6 text-sm text-sage-deep/60">
            You have anchored {state.sessions}{" "}
            {state.sessions === 1 ? "time" : "times"}.
          </p>
          <button
            onClick={restart}
            className="mt-5 rounded-soft border border-sage/40 bg-cream-warm px-6 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage"
          >
            Anchor again
          </button>
        </div>
      )}
    </ToolShell>
  );
}
