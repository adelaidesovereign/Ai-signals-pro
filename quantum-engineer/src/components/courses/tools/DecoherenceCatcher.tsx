"use client";

import { useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";
import { AskAdelaide } from "./AskAdelaide";

// Decoherence Catcher — logs each time the old pattern returns,
// the trigger, how long it took to notice, and what brought the
// student back. The return speed metric is the real measure of
// progress, and tracking it visually is the proof.

type DriftEntry = {
  date: string;
  trigger: string;
  hoursToNotice: string;
  whatBroughtMeBack: string;
};

type CatcherState = {
  entries: DriftEntry[];
};

export function DecoherenceCatcher({
  title,
  description,
  storageKey,
}: {
  title: string;
  description: string;
  storageKey: string;
}) {
  const [state, setState, { status }] = useToolStorage<CatcherState>(
    storageKey,
    { entries: [] },
  );
  const [trigger, setTrigger] = useState("");
  const [hours, setHours] = useState("");
  const [back, setBack] = useState("");

  function log() {
    if (!trigger.trim()) return;
    const entry: DriftEntry = {
      date: new Date().toISOString(),
      trigger: trigger.trim(),
      hoursToNotice: hours.trim(),
      whatBroughtMeBack: back.trim(),
    };
    setState({ entries: [...state.entries, entry] });
    setTrigger("");
    setHours("");
    setBack("");
  }

  const combinedForCoach = state.entries
    .slice(-5)
    .map(
      (e) =>
        `${new Date(e.date).toLocaleDateString()}: Trigger: ${e.trigger}. Noticed after: ${e.hoursToNotice}. Came back via: ${e.whatBroughtMeBack}`,
    )
    .join("\n");

  return (
    <ToolShell title={title} description={description} status={status}>
      <div className="space-y-4">
        <label className="block">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
            What triggered the drift?
          </span>
          <input
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            placeholder="A conversation, an environment, a thought, a person…"
            className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
        </label>
        <label className="block">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
            How long before you noticed?
          </span>
          <input
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="Minutes, hours, days…"
            className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
        </label>
        <label className="block">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
            What brought you back?
          </span>
          <input
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="A breath, the checklist, a meditation, the coach, noticing…"
            className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
        </label>

        <div className="flex items-center justify-between">
          <p className="text-xs text-sage-deep/60">
            {state.entries.length} drifts logged
          </p>
          <button
            onClick={log}
            disabled={!trigger.trim()}
            className="rounded-soft bg-sage px-5 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
          >
            Log this drift
          </button>
        </div>
      </div>

      {state.entries.length > 0 && (
        <div className="mt-8 space-y-3">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
            Your return speed over time
          </p>
          {state.entries
            .slice(-10)
            .reverse()
            .map((e, i) => (
              <div
                key={i}
                className="rounded-soft border border-sage/15 bg-cream-warm px-4 py-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-sage-deep/90">
                      {e.trigger}
                    </p>
                    <p className="mt-1 text-xs text-sage-deep/60">
                      Noticed after {e.hoursToNotice || "?"} · Came back
                      via {e.whatBroughtMeBack || "?"}
                    </p>
                  </div>
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/50">
                    {new Date(e.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}

      {state.entries.length >= 2 && (
        <AskAdelaide
          toolName={title}
          toolPrompt="Review my decoherence patterns and tell me what you notice about my triggers and return speed."
          userWriting={combinedForCoach}
        />
      )}
    </ToolShell>
  );
}
