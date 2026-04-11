"use client";

import { useEffect, useRef, useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";

type Phase = "idle" | "inhale" | "hold" | "exhale" | "done";

export function Breathwork({
  title,
  description,
  inhale,
  hold = 0,
  exhale,
  cycles,
  storageKey,
}: {
  title: string;
  description: string;
  inhale: number;
  hold?: number;
  exhale: number;
  cycles: number;
  storageKey: string;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentCycle, setCurrentCycle] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [completions, setCompletions] = useToolStorage<number>(
    storageKey,
    0,
  );
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function runPhase(p: Phase, seconds: number, onComplete: () => void) {
    setPhase(p);
    setCountdown(seconds);
    let remaining = seconds;
    timerRef.current = setInterval(() => {
      remaining -= 1;
      setCountdown(remaining);
      if (remaining <= 0) {
        clearTimer();
        onComplete();
      }
    }, 1000);
  }

  function runCycle(cycleIndex: number) {
    if (cycleIndex >= cycles) {
      setPhase("done");
      setCompletions((prev) => prev + 1);
      return;
    }
    setCurrentCycle(cycleIndex + 1);
    runPhase("inhale", inhale, () => {
      if (hold > 0) {
        runPhase("hold", hold, () => {
          runPhase("exhale", exhale, () => runCycle(cycleIndex + 1));
        });
      } else {
        runPhase("exhale", exhale, () => runCycle(cycleIndex + 1));
      }
    });
  }

  function start() {
    setCurrentCycle(0);
    runCycle(0);
  }

  function stop() {
    clearTimer();
    setPhase("idle");
    setCurrentCycle(0);
    setCountdown(0);
  }

  const scale =
    phase === "inhale"
      ? 1.25
      : phase === "hold"
        ? 1.25
        : phase === "exhale"
          ? 0.75
          : 1;

  const phaseLabel =
    phase === "idle"
      ? `Cycle ${cycles} total · ${inhale}s in, ${hold > 0 ? `${hold}s hold, ` : ""}${exhale}s out`
      : phase === "done"
        ? "Done"
        : phase === "inhale"
          ? `Inhale · ${countdown}`
          : phase === "hold"
            ? `Hold · ${countdown}`
            : `Exhale · ${countdown}`;

  return (
    <ToolShell title={title} description={description}>
      <div className="flex flex-col items-center">
        <div className="relative flex h-56 w-56 items-center justify-center">
          <div
            className="absolute h-40 w-40 rounded-full bg-sage/10 transition-transform ease-in-out"
            style={{
              transform: `scale(${scale})`,
              transitionDuration: `${
                phase === "inhale"
                  ? inhale
                  : phase === "exhale"
                    ? exhale
                    : hold
              }s`,
            }}
          />
          <div
            className="absolute h-32 w-32 rounded-full border border-sage/30 bg-sage/20 transition-transform ease-in-out"
            style={{
              transform: `scale(${scale})`,
              transitionDuration: `${
                phase === "inhale"
                  ? inhale
                  : phase === "exhale"
                    ? exhale
                    : hold
              }s`,
            }}
          />
          <div className="relative text-center">
            <p className="font-serif text-2xl text-sage">{phaseLabel}</p>
            {phase !== "idle" && phase !== "done" && (
              <p className="mt-2 text-sm text-sage-deep/60">
                Cycle {currentCycle} of {cycles}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          {phase === "idle" || phase === "done" ? (
            <button
              onClick={start}
              className="rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
            >
              {phase === "done" ? "Do it again" : "Begin"}
            </button>
          ) : (
            <button
              onClick={stop}
              className="rounded-soft border border-sage/40 bg-cream-warm px-6 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage"
            >
              Stop
            </button>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-sage-deep/60">
          You have done this practice {completions}{" "}
          {completions === 1 ? "time" : "times"}.
        </p>
      </div>
    </ToolShell>
  );
}
