"use client";

import { useState } from "react";
import Link from "next/link";

// Daily mood check-in rendered at the top of the dashboard.
// "How are you right now?" — the answer shapes what the app recommends.

const MOODS = [
  {
    key: "regulated",
    emoji: "🌿",
    label: "Settled",
    description: "Calm, present, breathing easy.",
    recommendation: {
      text: "Your body is ready for installation work.",
      href: "/certification",
      cta: "Continue the program",
    },
  },
  {
    key: "activated",
    emoji: "⚡",
    label: "Activated",
    description: "Wound up. Scanning. Cannot settle.",
    recommendation: {
      text: "Regulate first. The work can wait three minutes.",
      href: "/meditations/sos-come-back",
      cta: "SOS — come back in 3 minutes",
    },
  },
  {
    key: "flat",
    emoji: "🌫️",
    label: "Flat",
    description: "Numb. Low. Nothing feels worth the effort.",
    recommendation: {
      text: "Your nervous system is in dorsal. Start with the settle, then heart coherence.",
      href: "/meditations/nervous-system-soften",
      cta: "The nervous system soften — 12 minutes",
    },
  },
  {
    key: "grief",
    emoji: "🌧️",
    label: "Grieving",
    description: "Something old surfaced. Sadness. Weight.",
    recommendation: {
      text: "Grief is a release, not a setback. Let the body have it.",
      href: "/meditations/meeting-your-younger-self",
      cta: "Meet your younger self — 20 minutes",
    },
  },
  {
    key: "strong",
    emoji: "🌅",
    label: "Strong",
    description: "Clear. Aligned. Ready for the deeper work.",
    recommendation: {
      text: "This is the state for reconsolidation or the long-form practice.",
      href: "/meditations/long-form-field-collapse",
      cta: "The long-form field collapse — 60 minutes",
    },
  },
];

export function MoodCheckin() {
  const [selected, setSelected] = useState<string | null>(null);
  const mood = MOODS.find((m) => m.key === selected);

  return (
    <section className="rounded-soft border border-sage/15 bg-cream-warm p-6 shadow-card sm:p-8">
      <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
        Right now
      </p>
      <h2 className="mt-2 font-serif text-2xl text-sage sm:text-3xl">
        How are you today?
      </h2>

      <div className="mt-5 flex flex-wrap gap-2">
        {MOODS.map((m) => (
          <button
            key={m.key}
            onClick={() => setSelected(m.key)}
            className={`flex items-center gap-2 rounded-soft px-4 py-2 text-sm transition-all ${
              selected === m.key
                ? "bg-sage text-cream-warm shadow-soft"
                : "border border-sage/20 bg-cream text-sage-deep hover:border-sage"
            }`}
          >
            <span>{m.emoji}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </div>

      {mood && (
        <div className="mt-6 rounded-soft border border-sage/15 bg-cream-deep/40 px-5 py-4">
          <p className="text-base text-sage-deep/90">{mood.recommendation.text}</p>
          <div className="mt-4">
            <Link
              href={mood.recommendation.href}
              className="inline-flex items-center justify-center rounded-soft bg-sage px-5 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
            >
              {mood.recommendation.cta}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
