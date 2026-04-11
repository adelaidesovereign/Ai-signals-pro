"use client";

import { useState } from "react";

type Props = {
  toolName: string;
  toolPrompt: string;
  userWriting: string;
  courseContext?: string;
};

export function AskAdelaide({
  toolName,
  toolPrompt,
  userWriting,
  courseContext,
}: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [reply, setReply] = useState<string | null>(null);
  const [fallback, setFallback] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = userWriting.trim().length < 10;

  async function ask() {
    setStatus("loading");
    setError(null);
    setReply(null);
    setFallback(false);

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolName,
          toolPrompt,
          userWriting,
          courseContext,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something did not connect.");
        setStatus("error");
        return;
      }
      setReply(data.reply);
      setFallback(Boolean(data.fallback));
      setStatus("ok");
    } catch {
      setError("The coaching connection is not available right now.");
      setStatus("error");
    }
  }

  return (
    <div className="mt-5 border-t border-sage/15 pt-5">
      {status !== "ok" && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
              When you are ready
            </p>
            <p className="mt-1 text-sm text-sage-deep/75">
              Ask Adelaide to read what you just wrote and reflect back one
              specific next move.
            </p>
          </div>
          <button
            onClick={ask}
            disabled={disabled || status === "loading"}
            className="rounded-soft bg-sage px-5 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
          >
            {status === "loading" ? "Reading your words" : "Ask Adelaide"}
          </button>
        </div>
      )}

      {status === "error" && error && (
        <p className="mt-3 text-sm text-sage-deep/80">{error}</p>
      )}

      {status === "ok" && reply && (
        <div className="rounded-soft border border-sage/25 bg-cream-deep/50 p-6">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
            {fallback ? "A note from the team" : "Adelaide, reading what you wrote"}
          </p>
          <div className="mt-4 space-y-4 font-serif text-lg leading-relaxed text-sage-deep/95">
            {reply.split(/\n\n+/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <button
            onClick={ask}
            className="mt-5 font-sans text-[11px] uppercase tracking-quiet text-sage hover:text-sage-deep"
          >
            Ask again
          </button>
        </div>
      )}
    </div>
  );
}
