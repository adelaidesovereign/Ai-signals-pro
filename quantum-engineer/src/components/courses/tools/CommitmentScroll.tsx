"use client";

import { useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";

// A formal commitment the student writes and signs. Rendered as a
// luxury scroll-style document. The commitment persists as a
// keepsake they can return to on the hard days.

type ScrollState = {
  commitment: string;
  signedName: string;
  dateSigned: string;
};

export function CommitmentScroll({
  title,
  description,
  storageKey,
}: {
  title: string;
  description: string;
  storageKey: string;
}) {
  const [state, setState, { status }] = useToolStorage<ScrollState>(
    storageKey,
    { commitment: "", signedName: "", dateSigned: "" },
  );
  const [editing, setEditing] = useState(!state.dateSigned);

  function sign() {
    setState({
      ...state,
      dateSigned: new Date().toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    });
    setEditing(false);
  }

  if (!editing && state.dateSigned) {
    return (
      <ToolShell title={title} description={description} status={status}>
        <div className="rounded-soft border border-gold/30 bg-cream px-8 py-10 text-center shadow-card sm:px-12 sm:py-14">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">
            A commitment, signed and held
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-gold/50" />
          <p className="mx-auto mt-8 max-w-md whitespace-pre-wrap font-serif text-xl leading-relaxed text-sage-deep">
            {state.commitment}
          </p>
          <div className="mx-auto mt-10 h-px w-16 bg-gold/50" />
          <p className="mt-6 font-serif text-2xl italic text-sage">
            {state.signedName}
          </p>
          <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-sage-deep/60">
            {state.dateSigned}
          </p>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => setEditing(true)}
            className="font-sans text-[11px] uppercase tracking-quiet text-sage-deep/60 hover:text-sage"
          >
            Edit the commitment
          </button>
        </div>
      </ToolShell>
    );
  }

  return (
    <ToolShell title={title} description={description} status={status}>
      <div className="space-y-5">
        <label className="block">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
            Your commitment — in your own words
          </span>
          <textarea
            value={state.commitment}
            onChange={(e) =>
              setState({ ...state, commitment: e.target.value })
            }
            rows={5}
            placeholder="I commit to the daily protocol because…"
            className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-5 py-4 font-serif text-lg leading-relaxed text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
        </label>
        <label className="block">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
            Sign your name
          </span>
          <input
            value={state.signedName}
            onChange={(e) =>
              setState({ ...state, signedName: e.target.value })
            }
            placeholder="Your name"
            className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-xl italic text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
          />
        </label>
        <div className="flex justify-end">
          <button
            onClick={sign}
            disabled={
              !state.commitment.trim() || !state.signedName.trim()
            }
            className="rounded-soft bg-gold/90 px-8 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep shadow-soft transition-all hover:bg-gold disabled:opacity-50"
          >
            Sign and seal
          </button>
        </div>
      </div>
    </ToolShell>
  );
}
