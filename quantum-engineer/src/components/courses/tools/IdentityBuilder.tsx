"use client";

import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";

type FieldDef = { key: string; label: string; placeholder: string };

export function IdentityBuilder({
  title,
  description,
  fields,
  storageKey,
}: {
  title: string;
  description: string;
  fields: FieldDef[];
  storageKey: string;
}) {
  const [value, setValue, { status }] = useToolStorage<Record<string, string>>(
    storageKey,
    {},
  );

  const filledCount = fields.filter((f) => (value[f.key] ?? "").trim().length > 0).length;

  return (
    <ToolShell title={title} description={description} status={status}>
      <div className="space-y-5">
        {fields.map((field) => (
          <label key={field.key} className="block">
            <span className="block font-sans text-[11px] uppercase tracking-[0.15em] text-sage">
              {field.label}
            </span>
            <textarea
              value={value[field.key] ?? ""}
              onChange={(e) =>
                setValue({ ...value, [field.key]: e.target.value })
              }
              placeholder={field.placeholder}
              rows={2}
              className="mt-2 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none transition-colors focus:border-sage focus:ring-2 focus:ring-sage/15"
            />
          </label>
        ))}
      </div>
      <p className="mt-5 text-xs text-sage-deep/60">
        {filledCount} of {fields.length} filled. Return any time and add more.
        This is the image your morning installation holds.
      </p>
    </ToolShell>
  );
}
