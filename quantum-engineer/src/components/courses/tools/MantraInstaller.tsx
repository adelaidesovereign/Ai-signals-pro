"use client";

import { useEffect, useRef, useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";

// A simple tool that lets the student write a single identity sentence in
// present tense, then holds it in front of them in a breath-paced rhythm —
// the way a hypnagogic install would feel. The repeat count is tracked so
// the user can see how many times they have installed this sentence.

type MantraState = {
  sentence: string;
  completions: number;
};

export function MantraInstaller({
  title,
  description,
  storageKey,
  repeats = 10,
}: {
  title: string;
  description: string;
  storageKey: string;
  repeats?: number;
}) {
  const [state, setState] = useToolStorage<MantraState>(storageKey, {
    sentence: "",
    completions: 0,
  });
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [currentRepeat, setCurrentRepeat] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  function runNextPhase(repeatIndex: number, phaseIndex: 0 | 1 | 2) {
    if (repeatIndex >= repeats) {
      setRunning(false);
      setState({ ...state, completions: state.completions + 1 });
      return;
    }
    const phases: Array<["in" | "hold" | "out", number]> = [
      ["in", 4000],
      ["hold", 1000],
      ["out", 5000],
    ];
    const [nextPhase, ms] = phases[phaseIndex];
    setPhase(nextPhase);
    setCurrentRepeat(repeatIndex + 1);
    timerRef.current = setTimeout(() => {
      if (phaseIndex < 2) {
        runNextPhase(repeatIndex, (phaseIndex + 1) as 0 | 1 | 2);
      } else {
        runNextPhase(repeatIndex + 1, 0);
      }
    }, ms);
  }

  function start() {
    setRunning(true);
    setCurrentRepeat(0);
    runNextPhase(0, 0);
  }

  function stop() {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    setRunning(false);
    setCurrentRepeat(0);
  }

  const canStart = state.sentence.trim().length > 0;

  return (
    <ToolShell title={title} description={description}>
      <div className="space-y-5">
        <label className="block">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
            Your sentence, in present tense
          </span>
          <textarea
            value={state.sentence}
            onChange={(e) =>
              setState({ ...state, sentence: e.target.value })
            }
            rows={2}
            disabled={running}
            placeholder="I am the one who…"
            className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-lg text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15 disabled:opacity-60"
          />
        </label>

        {running && (
          <div className="flex flex-col items-center rounded-soft bg-cream-deep/50 px-6 py-8 text-center">
            <div className="relative flex h-40 w-40 items-center justify-center">
              <div
                className={`absolute h-36 w-36 rounded-full border border-sage/40 bg-sage/10 transition-transform ease-in-out ${
                  phase === "in" || phase === "hold"
                    ? "scale-110"
                    : "scale-90"
                }`}
                style={{
                  transitionDuration:
                    phase === "in" ? "4s" : phase === "out" ? "5s" : "1s",
                }}
              />
              <p className="relative font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
                {phase === "in"
                  ? "Breathe in"
                  : phase === "hold"
                    ? "Hold"
                    : "Breathe out"}
              </p>
            </div>
            <p className="mt-6 max-w-sm font-serif text-xl leading-snug text-sage">
              {state.sentence}
            </p>
            <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/60">
              Repeat {currentRepeat} of {repeats}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <p className="text-xs text-sage-deep/60">
            Installed {state.completions}{" "}
            {state.completions === 1 ? "time" : "times"}
          </p>
          {running ? (
            <button
              onClick={stop}
              className="rounded-soft border border-sage/40 bg-cream-warm px-5 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={start}
              disabled={!canStart}
              className="rounded-soft bg-sage px-5 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
            >
              Install now
            </button>
          )}
        </div>
      </div>
    </ToolShell>
  );
}
