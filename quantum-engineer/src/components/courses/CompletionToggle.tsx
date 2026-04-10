"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  courseSlug: string;
  lessonSlug: string;
  initialCompleted: boolean;
};

export function CompletionToggle({
  courseSlug,
  lessonSlug,
  initialCompleted,
}: Props) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [saving, setSaving] = useState(false);

  async function toggle() {
    const next = !completed;
    setCompleted(next);
    setSaving(true);
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug,
          lessonSlug,
          completed: next,
        }),
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={saving}
      className={cn(
        "group flex w-full items-center justify-between rounded-soft border px-6 py-5 text-left transition-all duration-200",
        completed
          ? "border-sage bg-sage/5 text-sage"
          : "border-sage/20 bg-cream-warm text-sage-deep hover:border-sage/50",
      )}
    >
      <div>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
          {completed ? "Marked as read" : "Mark this chapter as read"}
        </p>
        <p className="mt-1 text-sm text-sage-deep/75">
          {completed
            ? "Your progress is saved. Return any time."
            : "When you are ready. Your place holds itself."}
        </p>
      </div>
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
          completed
            ? "border-sage bg-sage text-cream-warm"
            : "border-sage/40 bg-cream-warm",
        )}
      >
        {completed && (
          <svg
            className="h-4 w-4"
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
    </button>
  );
}
