"use client";

import { useEffect, useRef, useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";

export function HeartCoherence({
  title,
  description,
  durationSeconds,
  storageKey,
}: {
  title: string;
  description: string;
  durationSeconds: number;
  storageKey: string;
}) {
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(durationSeconds);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [sessions, setSessions] = useToolStorage<number>(storageKey, 0);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const breathRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
      if (breathRef.current) clearInterval(breathRef.current);
    };
  }, []);

  function start() {
    setRunning(true);
    setRemaining(durationSeconds);
    setPhase("in");

    // overall countdown
    tickRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          stop(true);
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    // 5s in / 5s out breath rhythm
    breathRef.current = setInterval(() => {
      setPhase((p) => (p === "in" ? "out" : "in"));
    }, 5000);
  }

  function stop(completed = false) {
    if (tickRef.current) clearInterval(tickRef.current);
    if (breathRef.current) clearInterval(breathRef.current);
    tickRef.current = null;
    breathRef.current = null;
    setRunning(false);
    if (completed) {
      setSessions((prev) => prev + 1);
    }
  }

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <ToolShell title={title} description={description}>
      <div className="flex flex-col items-center">
        <div className="relative flex h-56 w-56 items-center justify-center">
          <div
            className={`absolute h-48 w-48 rounded-full border border-sage/30 bg-sage/10 transition-transform ease-in-out ${
              phase === "in" ? "scale-110" : "scale-90"
            }`}
            style={{ transitionDuration: "5s" }}
          />
          <div className="relative text-center">
            <p className="font-serif text-xl text-sage">
              {running
                ? phase === "in"
                  ? "Breathe in, slow"
                  : "Breathe out, slow"
                : "5s in, 5s out"}
            </p>
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-sage-deep/60">
              {running
                ? `${minutes}:${String(seconds).padStart(2, "0")}`
                : `${Math.floor(durationSeconds / 60)} min practice`}
            </p>
          </div>
        </div>

        <div className="mt-6">
          {running ? (
            <button
              onClick={() => stop(false)}
              className="rounded-soft border border-sage/40 bg-cream-warm px-6 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={start}
              className="rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
            >
              Begin
            </button>
          )}
        </div>

        <p className="mt-5 max-w-prose text-center text-xs text-sage-deep/60">
          Hand on the centre of your chest. Breathe through the heart, not
          the head. Hold one real, specific felt memory of appreciation.
          {sessions > 0 && (
            <>
              <br />
              You have completed this practice {sessions}{" "}
              {sessions === 1 ? "time" : "times"}.
            </>
          )}
        </p>
      </div>
    </ToolShell>
  );
}
