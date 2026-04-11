"use client";

import { useEffect, useRef, useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";

type Session = {
  oldState: string;
  newState: string;
  shift: string;
  sessions: number;
};

type Step = "old" | "new" | "hold" | "integrate" | "done";

export function ReconsolidationHold({
  title,
  description,
  storageKey,
}: {
  title: string;
  description: string;
  storageKey: string;
}) {
  const [state, setState, { status }] = useToolStorage<Session>(storageKey, {
    oldState: "",
    newState: "",
    shift: "",
    sessions: 0,
  });
  const [step, setStep] = useState<Step>("old");
  const [remaining, setRemaining] = useState(180);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function startHold() {
    setStep("hold");
    setRemaining(180);
    timerRef.current = setInterval(() => {
      setRemaining((n) => {
        if (n <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setStep("integrate");
          return 0;
        }
        return n - 1;
      });
    }, 1000);
  }

  function finish() {
    setState({ ...state, sessions: state.sessions + 1 });
    setStep("done");
  }

  function restart() {
    setState({ ...state, oldState: "", newState: "", shift: "" });
    setStep("old");
  }

  const mm = Math.floor(remaining / 60);
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <ToolShell title={title} description={description} status={status}>
      <div className="mb-4 flex gap-1">
        {(["old", "new", "hold", "integrate", "done"] as Step[]).map((s, i) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${
              ["old", "new", "hold", "integrate", "done"].indexOf(step) >= i
                ? "bg-sage"
                : "bg-cream-deep"
            }`}
          />
        ))}
      </div>

      {step === "old" && (
        <div>
          <p className="font-serif text-xl text-sage">Bring the old state into the room.</p>
          <p className="mt-2 text-sm text-sage-deep/75">
            Not the story. The felt sense of the old belief. The body state
            that lives with it. Let it come forward and name what it feels
            like.
          </p>
          <textarea
            value={state.oldState}
            onChange={(e) => setState({ ...state, oldState: e.target.value })}
            rows={3}
            placeholder="The old state feels like…"
            className="mt-4 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
          <button
            onClick={() => setStep("new")}
            disabled={!state.oldState.trim()}
            className="mt-4 rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {step === "new" && (
        <div>
          <p className="font-serif text-xl text-sage">Now bring the new state forward.</p>
          <p className="mt-2 text-sm text-sage-deep/75">
            The version of you without the old belief. How does her body
            feel? What is she doing right now? Let the felt sense of her
            land in your body.
          </p>
          <textarea
            value={state.newState}
            onChange={(e) => setState({ ...state, newState: e.target.value })}
            rows={3}
            placeholder="The new state feels like…"
            className="mt-4 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
          <button
            onClick={startHold}
            disabled={!state.newState.trim()}
            className="mt-4 rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
          >
            Hold both at once
          </button>
        </div>
      )}

      {step === "hold" && (
        <div className="text-center">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
            The reconsolidation window
          </p>
          <p className="mt-3 font-serif text-5xl text-sage">
            {mm}:{ss}
          </p>
          <p className="mt-5 max-w-prose text-base text-sage-deep/90">
            Hold the old state and the new state in the same body at the
            same time. Do not force. Do not collapse into either one. Let
            both exist. The brain registers the coexistence as new
            information, and the old belief updates with the new data.
          </p>
        </div>
      )}

      {step === "integrate" && (
        <div>
          <p className="font-serif text-xl text-sage">What shifted?</p>
          <p className="mt-2 text-sm text-sage-deep/75">
            A sentence. A sensation. A quiet nothing. Any of it is valid. Do
            not invent. Write what was actually there.
          </p>
          <textarea
            value={state.shift}
            onChange={(e) => setState({ ...state, shift: e.target.value })}
            rows={4}
            placeholder="What shifted…"
            className="mt-4 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
          <button
            onClick={finish}
            className="mt-4 rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
          >
            Close the session
          </button>
        </div>
      )}

      {step === "done" && (
        <div className="text-center">
          <p className="font-serif text-2xl text-sage">
            That was a reconsolidation session.
          </p>
          <p className="mt-4 max-w-prose text-sage-deep/85">
            You do not need to do this every day. Once a week is enough for
            most patterns. Come back when the old pattern returns — and it
            will return. The mechanism is the hold, and the hold gets faster
            every time.
          </p>
          <p className="mt-6 text-sm text-sage-deep/60">
            Total sessions: {state.sessions}
          </p>
          <button
            onClick={restart}
            className="mt-5 rounded-soft border border-sage/40 bg-cream-warm px-6 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage"
          >
            Begin again
          </button>
        </div>
      )}
    </ToolShell>
  );
}
