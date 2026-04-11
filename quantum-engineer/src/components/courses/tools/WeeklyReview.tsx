"use client";

import { useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";
import { AskAdelaide } from "./AskAdelaide";

type WeeklyEntry = {
  date: string;
  oldShowedUp: string;
  newShowedUp: string;
  nextWeekNeeds: string;
  returnSpeed: string;
};

type WeeklyState = {
  entries: WeeklyEntry[];
};

function weekKey() {
  const d = new Date();
  const year = d.getFullYear();
  const jan1 = new Date(year, 0, 1);
  const days = Math.floor((d.getTime() - jan1.getTime()) / 86400000);
  const week = Math.ceil((days + jan1.getDay() + 1) / 7);
  return `${year}-W${String(week).padStart(2, "0")}`;
}

export function WeeklyReview({
  title,
  description,
  storageKey,
}: {
  title: string;
  description: string;
  storageKey: string;
}) {
  const [state, setState, { status }] = useToolStorage<WeeklyState>(
    storageKey,
    { entries: [] },
  );

  const currentWeek = weekKey();
  const current: WeeklyEntry =
    state.entries.find((e) => e.date === currentWeek) ?? {
      date: currentWeek,
      oldShowedUp: "",
      newShowedUp: "",
      nextWeekNeeds: "",
      returnSpeed: "",
    };

  const [draft, setDraft] = useState<WeeklyEntry>(current);

  function save() {
    const others = state.entries.filter((e) => e.date !== currentWeek);
    setState({ entries: [...others, draft] });
  }

  const combinedForCoach = [
    `Week ${currentWeek}`,
    `Where the old showed up: ${draft.oldShowedUp}`,
    `Where the new showed up: ${draft.newShowedUp}`,
    `Return speed this week: ${draft.returnSpeed}`,
    `What next week needs: ${draft.nextWeekNeeds}`,
  ].join("\n");

  return (
    <ToolShell title={title} description={description} status={status}>
      <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
        Week of {currentWeek}
      </p>

      <div className="mt-5 space-y-5">
        <label className="block">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/70">
            Where did the old version show up this week?
          </span>
          <textarea
            value={draft.oldShowedUp}
            onChange={(e) =>
              setDraft({ ...draft, oldShowedUp: e.target.value })
            }
            rows={3}
            placeholder="Specific moments. Not a summary."
            className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
        </label>

        <label className="block">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/70">
            Where did the new version show up this week?
          </span>
          <textarea
            value={draft.newShowedUp}
            onChange={(e) =>
              setDraft({ ...draft, newShowedUp: e.target.value })
            }
            rows={3}
            placeholder="Small reorganizations. Door openings. Moments that went differently."
            className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
        </label>

        <label className="block">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/70">
            Your return speed this week
          </span>
          <input
            value={draft.returnSpeed}
            onChange={(e) =>
              setDraft({ ...draft, returnSpeed: e.target.value })
            }
            placeholder="How fast did you notice drift and come back?"
            className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
        </label>

        <label className="block">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/70">
            What does next week need from you?
          </span>
          <textarea
            value={draft.nextWeekNeeds}
            onChange={(e) =>
              setDraft({ ...draft, nextWeekNeeds: e.target.value })
            }
            rows={3}
            placeholder="One specific move. Not a list. One."
            className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
        </label>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-sage-deep/55">
          {state.entries.length}{" "}
          {state.entries.length === 1 ? "weekly review" : "weekly reviews"}{" "}
          in total
        </p>
        <button
          onClick={save}
          className="rounded-soft bg-sage px-5 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
        >
          Save this week
        </button>
      </div>

      <AskAdelaide
        toolName={title}
        toolPrompt={description}
        userWriting={combinedForCoach}
      />
    </ToolShell>
  );
}
