"use client";

import { useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";

// Polyvagal Ladder self-mapping tool.
// Based on Stephen Porges' three autonomic states:
//   Ventral vagal (safe, social, connected)
//   Sympathetic (fight, flight, anxious, angry)
//   Dorsal vagal (shut down, numb, collapsed, frozen)
//
// The student maps where they spend most of their time and
// tracks how the ratio changes across the program.

type LadderState = {
  currentState: "ventral" | "sympathetic" | "dorsal" | null;
  ventral: string;
  sympathetic: string;
  dorsal: string;
  snapshots: Array<{
    date: string;
    state: "ventral" | "sympathetic" | "dorsal";
    note: string;
  }>;
};

const STATES = [
  {
    key: "ventral" as const,
    label: "Safe and connected",
    color: "bg-sage",
    borderColor: "border-sage",
    textColor: "text-sage",
    description:
      "Calm. Present. Open to connection. Curious. Your shoulders are soft. Your breath is easy. You can think clearly and the room feels safe.",
    question:
      "How often are you here on a typical day? What puts you here?",
  },
  {
    key: "sympathetic" as const,
    label: "Fight or flight",
    color: "bg-gold/80",
    borderColor: "border-gold/60",
    textColor: "text-sage-deep",
    description:
      "Activated. Scanning. Heart rate up. Shoulders tight. Jaw clenched. Mind racing. Ready to fight, ready to run, ready to control. You might call this anxiety, anger, or hustle.",
    question:
      "How often are you here? What triggers the activation?",
  },
  {
    key: "dorsal" as const,
    label: "Shutdown",
    color: "bg-sage-deep/60",
    borderColor: "border-sage-deep/40",
    textColor: "text-cream-warm",
    description:
      "Numb. Flat. Disconnected. The body feels heavy. Nothing feels worth the effort. You might call this depression, dissociation, or just being tired all the time.",
    question:
      "How often are you here? What does the world look like from this state?",
  },
];

export function PolyvagalLadder({
  title,
  description,
  storageKey,
}: {
  title: string;
  description: string;
  storageKey: string;
}) {
  const [state, setState, { status }] = useToolStorage<LadderState>(
    storageKey,
    {
      currentState: null,
      ventral: "",
      sympathetic: "",
      dorsal: "",
      snapshots: [],
    },
  );
  const [note, setNote] = useState("");

  function selectState(key: "ventral" | "sympathetic" | "dorsal") {
    setState({ ...state, currentState: key });
  }

  function saveSnapshot() {
    if (!state.currentState) return;
    setState({
      ...state,
      snapshots: [
        ...state.snapshots,
        {
          date: new Date().toISOString(),
          state: state.currentState,
          note,
        },
      ],
    });
    setNote("");
  }

  return (
    <ToolShell title={title} description={description} status={status}>
      <p className="mb-6 font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
        Where are you on the ladder right now?
      </p>

      <div className="space-y-3">
        {STATES.map((s) => (
          <button
            key={s.key}
            onClick={() => selectState(s.key)}
            className={`block w-full rounded-soft border p-5 text-left transition-all ${
              state.currentState === s.key
                ? `${s.borderColor} ${s.color} ${s.textColor} shadow-soft`
                : "border-sage/20 bg-cream-warm text-sage-deep hover:border-sage/40"
            }`}
          >
            <p className="font-serif text-xl">
              {s.label}
            </p>
            <p
              className={`mt-2 text-sm ${
                state.currentState === s.key
                  ? "opacity-90"
                  : "text-sage-deep/75"
              }`}
            >
              {s.description}
            </p>
          </button>
        ))}
      </div>

      {state.currentState && (
        <div className="mt-6 space-y-4">
          <p className="font-serif text-lg text-sage">
            {STATES.find((s) => s.key === state.currentState)?.question}
          </p>
          <textarea
            value={state[state.currentState]}
            onChange={(e) =>
              setState({
                ...state,
                [state.currentState as string]: e.target.value,
              })
            }
            rows={3}
            placeholder="What does this state look like in your daily life…"
            className="w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />

          <div className="flex items-center justify-between">
            <p className="text-xs text-sage-deep/60">
              {state.snapshots.length} snapshots saved
            </p>
            <button
              onClick={saveSnapshot}
              className="rounded-soft bg-sage px-5 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
            >
              Save this snapshot
            </button>
          </div>
        </div>
      )}
    </ToolShell>
  );
}
