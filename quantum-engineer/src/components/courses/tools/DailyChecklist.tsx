"use client";

import { useMemo } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";

type ChecklistItem = { key: string; label: string; detail?: string };
type DayState = { date: string; completed: string[] };
type StreakState = {
  history: DayState[];
  currentDay: DayState | null;
};

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function calculateStreak(history: DayState[]): number {
  if (history.length === 0) return 0;
  const sorted = [...history].sort((a, b) => (a.date < b.date ? 1 : -1));
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < sorted.length; i++) {
    const expected = new Date(today);
    expected.setDate(today.getDate() - i);
    const expectedKey = `${expected.getFullYear()}-${String(expected.getMonth() + 1).padStart(2, "0")}-${String(expected.getDate()).padStart(2, "0")}`;
    if (sorted[i].date === expectedKey && sorted[i].completed.length > 0) {
      streak += 1;
    } else {
      break;
    }
  }
  return streak;
}

export function DailyChecklist({
  title,
  description,
  items,
  storageKey,
}: {
  title: string;
  description: string;
  items: ChecklistItem[];
  storageKey: string;
}) {
  const [state, setState] = useToolStorage<StreakState>(storageKey, {
    history: [],
    currentDay: null,
  });

  const today = todayKey();
  const currentDay: DayState =
    state.currentDay && state.currentDay.date === today
      ? state.currentDay
      : { date: today, completed: [] };

  function toggle(key: string) {
    const next: DayState = {
      ...currentDay,
      completed: currentDay.completed.includes(key)
        ? currentDay.completed.filter((k) => k !== key)
        : [...currentDay.completed, key],
    };
    const others = state.history.filter((d) => d.date !== today);
    setState({
      currentDay: next,
      history: [...others, next],
    });
  }

  const streak = useMemo(() => calculateStreak(state.history), [state.history]);
  const doneToday = currentDay.completed.length;
  const allDone = doneToday === items.length && items.length > 0;

  return (
    <ToolShell title={title} description={description}>
      <div className="mb-5 flex items-center justify-between rounded-soft bg-cream-deep/60 px-5 py-4">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
            Today
          </p>
          <p className="mt-1 font-serif text-2xl text-sage">
            {doneToday} of {items.length} complete
            {allDone && " ✓"}
          </p>
        </div>
        <div className="text-right">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
            Current streak
          </p>
          <p className="mt-1 font-serif text-2xl text-sage">
            {streak} {streak === 1 ? "day" : "days"}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item) => {
          const done = currentDay.completed.includes(item.key);
          return (
            <button
              key={item.key}
              onClick={() => toggle(item.key)}
              className={`flex w-full items-start gap-4 rounded-soft border px-5 py-4 text-left transition-all ${
                done
                  ? "border-sage bg-sage/5"
                  : "border-sage/20 bg-cream-warm hover:border-sage/50"
              }`}
            >
              <span
                className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  done
                    ? "border-sage bg-sage text-cream-warm"
                    : "border-sage/40 bg-cream-warm"
                }`}
              >
                {done && (
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                )}
              </span>
              <span className="flex-1">
                <span
                  className={`block font-serif text-lg ${done ? "text-sage" : "text-sage-deep"}`}
                >
                  {item.label}
                </span>
                {item.detail && (
                  <span className="mt-1 block text-sm text-sage-deep/70">
                    {item.detail}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </ToolShell>
  );
}
