"use client";

import { useEffect, useRef, useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";
import { AskAdelaide } from "./AskAdelaide";

type SomaticSession = {
  pattern: string;
  location: string;
  quality: string;
  surfaced: string;
  sessions: number;
};

type Step = "pattern" | "locate" | "feel" | "wait" | "capture" | "done";

export function SomaticFind({
  title,
  description,
  storageKey,
}: {
  title: string;
  description: string;
  storageKey: string;
}) {
  const [state, setState, { status }] = useToolStorage<SomaticSession>(
    storageKey,
    {
      pattern: "",
      location: "",
      quality: "",
      surfaced: "",
      sessions: 0,
    },
  );

  const [step, setStep] = useState<Step>("pattern");
  const [countdown, setCountdown] = useState(90);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function startWait() {
    setStep("wait");
    setCountdown(90);
    timerRef.current = setInterval(() => {
      setCountdown((n) => {
        if (n <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setStep("capture");
          return 0;
        }
        return n - 1;
      });
    }, 1000);
  }

  function finishSession() {
    setState({ ...state, sessions: state.sessions + 1 });
    setStep("done");
  }

  function reset() {
    setStep("pattern");
    setCountdown(90);
  }

  return (
    <ToolShell title={title} description={description} status={status}>
      <div className="mb-4 flex gap-1">
        {(["pattern", "locate", "feel", "wait", "capture", "done"] as Step[]).map(
          (s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                ["pattern", "locate", "feel", "wait", "capture", "done"].indexOf(
                  step,
                ) >= i
                  ? "bg-sage"
                  : "bg-cream-deep"
              }`}
            />
          ),
        )}
      </div>

      {step === "pattern" && (
        <div>
          <p className="font-serif text-xl text-sage">
            Name the pattern you want to trace.
          </p>
          <p className="mt-2 text-sm text-sage-deep/75">
            Not the most painful one. The one that keeps repeating, in a new
            costume, even after every tool you have tried.
          </p>
          <textarea
            value={state.pattern}
            onChange={(e) => setState({ ...state, pattern: e.target.value })}
            placeholder="The pattern that keeps returning is…"
            rows={3}
            className="mt-4 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
          <button
            onClick={() => setStep("locate")}
            disabled={!state.pattern.trim()}
            className="mt-4 rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {step === "locate" && (
        <div>
          <p className="font-serif text-xl text-sage">Close your eyes. Bring the pattern into the room. Where in your body does it live?</p>
          <p className="mt-2 text-sm text-sage-deep/75">
            Do not think. Feel. Chest? Throat? Stomach? Shoulders? Jaw?
            Somewhere harder to name?
          </p>
          <input
            value={state.location}
            onChange={(e) => setState({ ...state, location: e.target.value })}
            placeholder="Where it lives…"
            className="mt-4 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
          <button
            onClick={() => setStep("feel")}
            disabled={!state.location.trim()}
            className="mt-4 rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {step === "feel" && (
        <div>
          <p className="font-serif text-xl text-sage">
            What is the quality of the sensation?
          </p>
          <p className="mt-2 text-sm text-sage-deep/75">
            Tight. Hollow. Heavy. Numb. Electric. Cold. Anything your body
            actually gives you.
          </p>
          <input
            value={state.quality}
            onChange={(e) => setState({ ...state, quality: e.target.value })}
            placeholder="The quality is…"
            className="mt-4 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
          <button
            onClick={startWait}
            disabled={!state.quality.trim()}
            className="mt-4 rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
          >
            Stay with it for 90 seconds
          </button>
        </div>
      )}

      {step === "wait" && (
        <div className="text-center">
          <p className="font-serif text-3xl text-sage">{countdown}</p>
          <p className="mt-4 max-w-prose text-sage-deep/85">
            Stay with the sensation. Do not analyze. Do not narrate. Let the
            body give you whatever it has. An image. A memory. A short
            sentence. Wait.
          </p>
        </div>
      )}

      {step === "capture" && (
        <div>
          <p className="font-serif text-xl text-sage">
            Write what surfaced. Exactly as it came.
          </p>
          <p className="mt-2 text-sm text-sage-deep/75">
            Do not edit. If it was a single word, write the word. If it was an
            image, describe it. If nothing came, write that.
          </p>
          <textarea
            value={state.surfaced}
            onChange={(e) => setState({ ...state, surfaced: e.target.value })}
            placeholder="What surfaced…"
            rows={4}
            className="mt-4 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
          <button
            onClick={finishSession}
            className="mt-4 rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
          >
            Close the session
          </button>
        </div>
      )}

      {step === "done" && (
        <div>
          <div className="text-center">
            <p className="font-serif text-2xl text-sage">
              That was a root find.
            </p>
            <p className="mt-4 max-w-prose text-sage-deep/85">
              What surfaced is a marker. Come back to this tomorrow. Some
              roots take three or four passes before they reveal themselves.
            </p>
            <p className="mt-6 text-sm text-sage-deep/60">
              You have done {state.sessions}{" "}
              {state.sessions === 1 ? "session" : "sessions"} on this pattern.
            </p>
            <button
              onClick={reset}
              className="mt-5 rounded-soft border border-sage/40 bg-cream-warm px-6 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage"
            >
              Begin a new session
            </button>
          </div>

          <AskAdelaide
            toolName={title}
            toolPrompt={description}
            userWriting={`Pattern: ${state.pattern}\nLocation in body: ${state.location}\nQuality: ${state.quality}\nWhat surfaced: ${state.surfaced}`}
          />
        </div>
      )}
    </ToolShell>
  );
}
