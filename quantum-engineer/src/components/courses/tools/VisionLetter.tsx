"use client";

import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";
import { AskAdelaide } from "./AskAdelaide";

// A letter from the student's future self to their current self. Format
// differs from a simple writing prompt: it presents as a letter with a
// "From / To / Dated" header, and saves as a single document.

type Letter = {
  fromWhen: string;
  body: string;
  dated: string;
};

export function VisionLetter({
  title,
  description,
  storageKey,
  timeframe = "one year from today",
}: {
  title: string;
  description: string;
  storageKey: string;
  timeframe?: string;
}) {
  const [letter, setLetter, { status }] = useToolStorage<Letter>(storageKey, {
    fromWhen: timeframe,
    body: "",
    dated: "",
  });

  function stamp() {
    const now = new Date();
    setLetter({
      ...letter,
      dated: now.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    });
  }

  return (
    <ToolShell title={title} description={description} status={status}>
      <div className="rounded-soft border border-sage/20 bg-cream px-6 py-6 sm:px-10 sm:py-8">
        <div className="flex items-start justify-between text-xs text-sage-deep/60">
          <div>
            <p className="font-sans uppercase tracking-[0.2em] text-sage">
              From
            </p>
            <p className="mt-1 font-serif text-base text-sage">
              You, {letter.fromWhen}
            </p>
          </div>
          <div className="text-right">
            <p className="font-sans uppercase tracking-[0.2em] text-sage">
              Dated
            </p>
            <p className="mt-1 font-serif text-base text-sage">
              {letter.dated || "—"}
            </p>
          </div>
        </div>

        <textarea
          value={letter.body}
          onChange={(e) => setLetter({ ...letter, body: e.target.value })}
          rows={14}
          placeholder={`Dear me,\n\nI am writing to you from ${letter.fromWhen}. Here is what I want you to know about where you ended up, how you got here, and what I wish someone had told you on the day you started…`}
          className="mt-6 w-full resize-none bg-transparent font-serif text-xl leading-relaxed text-sage-deep outline-none placeholder:text-sage-deep/40"
        />

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={stamp}
            className="font-sans text-[11px] uppercase tracking-quiet text-sage hover:text-sage-deep"
          >
            Stamp today's date
          </button>
          <p className="text-xs text-sage-deep/55">
            This letter is yours alone. It holds on this device.
          </p>
        </div>
      </div>

      <AskAdelaide
        toolName={title}
        toolPrompt={description}
        userWriting={letter.body}
      />
    </ToolShell>
  );
}
