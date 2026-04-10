"use client";

import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/Input";

type Props = {
  courseSlug: string;
  lessonSlug: string;
  initialBody?: string;
};

export function LessonNotes({ courseSlug, lessonSlug, initialBody }: Props) {
  const [body, setBody] = useState(initialBody ?? "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    if (body === (initialBody ?? "")) return;
    setStatus("saving");
    saveTimer.current = setTimeout(async () => {
      try {
        await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseSlug, lessonSlug, body }),
        });
        setStatus("saved");
      } catch {
        setStatus("idle");
      }
    }, 700);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body]);

  return (
    <section className="mt-16 rounded-soft border border-sage/15 bg-cream-warm p-8 shadow-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
            Your notes for this chapter
          </p>
          <p className="mt-1 text-sm text-sage-deep/75">
            Private to you. Saves automatically. Lives in your account across
            devices.
          </p>
        </div>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/50">
          {status === "saving"
            ? "Saving"
            : status === "saved"
              ? "Saved"
              : ""}
        </p>
      </div>
      <div className="mt-5">
        <Textarea
          id={`note-${lessonSlug}`}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          placeholder="What is landing for you? What does your body want to say about this chapter?"
        />
      </div>
    </section>
  );
}
