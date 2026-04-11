"use client";

import { useState } from "react";
import Link from "next/link";

export function FloatingCoach() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating trigger button — visible on every page */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Ask Adelaide"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-sage text-cream-warm shadow-[0_10px_40px_-10px_rgba(92,107,94,0.55)] transition-all hover:scale-105 hover:bg-sage-deep sm:h-16 sm:w-16"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 sm:h-7 sm:w-7"
          aria-hidden
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-end bg-sage-deep/30 backdrop-blur-sm sm:items-center sm:justify-end sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-md flex-col rounded-t-soft bg-cream-warm shadow-[0_-10px_60px_-10px_rgba(92,107,94,0.45)] sm:rounded-soft"
            style={{ maxHeight: "80vh" }}
          >
            <div className="flex items-start justify-between border-b border-sage/15 px-6 py-5">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                  Your coach
                </p>
                <p className="mt-1 font-serif text-xl text-sage">
                  Talk to Adelaide
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="font-sans text-xs uppercase tracking-[0.15em] text-sage-deep hover:text-sage"
                aria-label="Close"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <p className="font-serif text-lg leading-relaxed text-sage-deep/95">
                Adelaide's voice is trained on the full framework. She reads
                where you are in the program, what you have written, and what
                your quiz result says — and she responds with one specific
                next move.
              </p>

              <p className="mt-4 text-sm text-sage-deep/75">
                For the full conversation, open the coach as a dedicated
                page. Your messages hold across sessions.
              </p>

              <div className="mt-6 space-y-3 text-sm">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
                  Good things to ask
                </p>
                <ul className="space-y-2 text-sage-deep/85">
                  <li className="rounded-soft border border-sage/15 bg-cream px-4 py-3">
                    "What should I focus on this week based on where I am?"
                  </li>
                  <li className="rounded-soft border border-sage/15 bg-cream px-4 py-3">
                    "The old pattern is back today. How do I come back?"
                  </li>
                  <li className="rounded-soft border border-sage/15 bg-cream px-4 py-3">
                    "I just did the somatic find — what do you make of what came up?"
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-sage/15 px-6 py-4">
              <Link
                href="/coach"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
              >
                Open the full coach
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
