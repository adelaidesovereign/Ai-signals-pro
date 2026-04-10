"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type Entry = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

export function JournalEditor({
  initialEntries,
}: {
  initialEntries: Entry[];
}) {
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setSaving(true);
    const res = await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title || undefined, body }),
    });
    if (res.ok) {
      const { entry } = await res.json();
      setEntries([
        {
          id: entry.id,
          title: entry.title ?? "",
          body: entry.body,
          createdAt: entry.createdAt,
        },
        ...entries,
      ]);
      setTitle("");
      setBody("");
    }
    setSaving(false);
  }

  async function removeEntry(id: string) {
    const confirmed = confirm("Remove this entry? This cannot be undone.");
    if (!confirmed) return;
    await fetch(`/api/journal?id=${id}`, { method: "DELETE" });
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-10">
      <form
        onSubmit={submit}
        className="rounded-soft border border-sage/15 bg-cream-warm p-6 shadow-card sm:p-8"
      >
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
          New entry
        </p>
        <div className="mt-4 space-y-4">
          <Input
            id="journal-title"
            label="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Leave it blank if there is no name for this one"
          />
          <Textarea
            id="journal-body"
            label="What do you want to remember?"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
          />
        </div>
        <div className="mt-5 flex items-center justify-end">
          <Button
            type="submit"
            size="sm"
            disabled={saving || !body.trim()}
          >
            {saving ? "Saving" : "Save entry"}
          </Button>
        </div>
      </form>

      {entries.length === 0 ? (
        <p className="text-sm italic text-sage-deep/60">
          Nothing written yet. The first entry is always the hardest, and then
          this page starts to feel like a place you want to come back to.
        </p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.id}>
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/55">
                    {new Date(entry.createdAt).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  {entry.title && (
                    <h3 className="mt-2 font-serif text-2xl text-sage">
                      {entry.title}
                    </h3>
                  )}
                  <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-sage-deep/90">
                    {entry.body}
                  </p>
                </div>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/50 hover:text-sage"
                >
                  Remove
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
