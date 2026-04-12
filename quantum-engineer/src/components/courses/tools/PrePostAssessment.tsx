"use client";

import { useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";

// 8-dimension self-assessment taken at the start of the program and
// again at day 30, 60, 90 and completion. The before/after comparison
// is the single most motivating thing a student can see — and the
// single most credible proof the program works.

const DIMENSIONS = [
  { key: "safety", label: "How safe do you feel in your own body on a typical day?" },
  { key: "sleep", label: "How well do you sleep most nights?" },
  { key: "patterns", label: "How often does the same old pattern repeat in your life?" },
  { key: "identity", label: "How clearly can you describe who you are without the fear?" },
  { key: "relationships", label: "How present and honest are you in your closest relationships?" },
  { key: "energy", label: "How much energy do you have for the things that matter to you?" },
  { key: "hope", label: "How much do you believe real, permanent change is possible for you?" },
  { key: "body", label: "How connected do you feel to your own body right now?" },
];

type Snapshot = {
  date: string;
  label: string;
  scores: Record<string, number>;
};

type AssessmentState = {
  snapshots: Snapshot[];
};

export function PrePostAssessment({
  title,
  description,
  storageKey,
  snapshotLabel = "Today",
}: {
  title: string;
  description: string;
  storageKey: string;
  snapshotLabel?: string;
}) {
  const [state, setState] = useToolStorage<AssessmentState>(storageKey, {
    snapshots: [],
  });
  const [scores, setScores] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState(false);

  const filledCount = Object.keys(scores).length;
  const allFilled = filledCount === DIMENSIONS.length;

  function saveSnapshot() {
    const snap: Snapshot = {
      date: new Date().toISOString(),
      label: snapshotLabel,
      scores: { ...scores },
    };
    setState({ snapshots: [...state.snapshots, snap] });
    setSaved(true);
  }

  const hasHistory = state.snapshots.length > 0;
  const first = state.snapshots[0];
  const latest = state.snapshots[state.snapshots.length - 1];

  return (
    <ToolShell title={title} description={description}>
      {!saved ? (
        <div className="space-y-5">
          {DIMENSIONS.map((dim) => (
            <div key={dim.key}>
              <p className="text-base text-sage-deep/90">{dim.label}</p>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => setScores({ ...scores, [dim.key]: n })}
                    className={`flex h-10 w-10 items-center justify-center rounded-soft text-sm transition-all ${
                      scores[dim.key] === n
                        ? "bg-sage text-cream-warm shadow-soft"
                        : "border border-sage/20 bg-cream-warm text-sage-deep hover:border-sage"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-4">
            <p className="text-xs text-sage-deep/60">
              {filledCount} of {DIMENSIONS.length} rated
            </p>
            <button
              onClick={saveSnapshot}
              disabled={!allFilled}
              className="rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
            >
              Save this snapshot
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-serif text-2xl text-sage">Snapshot saved.</p>
          <p className="mt-4 text-sage-deep/85">
            {hasHistory && state.snapshots.length > 1
              ? "You now have multiple snapshots. The chart below shows how each dimension has moved."
              : "This is your baseline. When you take the assessment again later, you will see the change."}
          </p>

          {/* Before / after comparison chart */}
          {state.snapshots.length > 1 && first && latest && (
            <div className="mt-8 space-y-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                {first.label} vs {latest.label}
              </p>
              {DIMENSIONS.map((dim) => {
                const before = first.scores[dim.key] ?? 0;
                const after = latest.scores[dim.key] ?? 0;
                const change = after - before;
                return (
                  <div key={dim.key} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-sage-deep/85">
                        {dim.label.split("?")[0]}
                      </span>
                      <span
                        className={
                          change > 0
                            ? "font-sans text-sage"
                            : change < 0
                              ? "font-sans text-sage-deep/80"
                              : "font-sans text-sage-deep/60"
                        }
                      >
                        {before} → {after}{" "}
                        {change > 0
                          ? `(+${change})`
                          : change < 0
                            ? `(${change})`
                            : "(no change)"}
                      </span>
                    </div>
                    <div className="flex h-3 gap-1">
                      <div
                        className="rounded-full bg-sage/30"
                        style={{ width: `${before * 10}%` }}
                      />
                      <div
                        className="rounded-full bg-sage"
                        style={{ width: `${after * 10}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="mt-8 text-xs text-sage-deep/60">
            Total snapshots taken: {state.snapshots.length}
          </p>
        </div>
      )}
    </ToolShell>
  );
}
