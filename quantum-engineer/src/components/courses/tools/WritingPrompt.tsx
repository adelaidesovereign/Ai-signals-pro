"use client";

import { useToolStorage } from "./useToolStorage";
import { ToolShell } from "./ToolShell";
import { AskAdelaide } from "./AskAdelaide";

export function WritingPrompt({
  title,
  prompt,
  placeholder,
  minRows = 6,
  storageKey,
}: {
  title: string;
  prompt: string;
  placeholder?: string;
  minRows?: number;
  storageKey: string;
}) {
  const [value, setValue, { status }] = useToolStorage<string>(storageKey, "");
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;

  return (
    <ToolShell title={title} description={prompt} status={status}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={minRows}
        placeholder={placeholder ?? "Begin writing. Nobody else sees this."}
        className="w-full rounded-soft border border-sage/20 bg-cream px-5 py-4 font-serif text-lg leading-relaxed text-sage-deep outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/15"
      />
      <div className="mt-3 flex justify-between text-xs text-sage-deep/60">
        <span>{wordCount} words</span>
        <span>Private. Saves automatically to this device.</span>
      </div>

      <AskAdelaide
        toolName={title}
        toolPrompt={prompt}
        userWriting={value}
      />
    </ToolShell>
  );
}
