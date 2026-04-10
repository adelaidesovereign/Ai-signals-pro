// Inner Circle content — replaceable monthly by Adelaide without a deploy
// once a CMS is plugged in. For now this is the static seed content that
// ships the shell. Each entry is written in Adelaide's voice and can be
// swapped or added to in code.

export type MonthlyDrop = {
  slug: string;
  month: string;
  title: string;
  summary: string;
  focus: string;
};

export type LiveCall = {
  slug: string;
  date: string;
  title: string;
  description: string;
  joinUrl?: string;
};

export type Subliminal = {
  slug: string;
  title: string;
  duration: string;
  description: string;
  audioUrl?: string;
};

export const MONTHLY_DROPS: MonthlyDrop[] = [
  {
    slug: "drop-01",
    month: "This month",
    title: "The Return — working with decoherence without punishing yourself",
    summary:
      "The thing most people quit over is not the drift. It is the story they tell themselves about the drift. This month's teaching is the replacement for the story, and the protocol for the return.",
    focus: "Layer 6 — the wiring layer",
  },
  {
    slug: "drop-02",
    month: "Last month",
    title: "The Heart Field as a Boundary",
    summary:
      "Most people think of boundaries as rules. A heart field that is coherent is its own boundary, and it is the kind that does not require enforcement. This teaching walks you through the practice that produces the field.",
    focus: "Layer 5 — the heart layer",
  },
];

export const UPCOMING_CALLS: LiveCall[] = [
  {
    slug: "call-01",
    date: "Second Sunday of each month — 3:00 PM PT",
    title: "Open Room — questions, teaching, and quiet",
    description:
      "Bring whatever is live in your practice. Adelaide teaches in response to what is in the room, not a prepared script. Recordings are posted the next day for anyone who could not make it live.",
  },
  {
    slug: "call-02",
    date: "Last Thursday of each month — 6:00 PM PT",
    title: "Deep Practice — a guided installation session together",
    description:
      "A forty-five minute guided protocol. Settle. Heart coherence. Embodied installation. Held in the field of the room. Cameras optional. Silence welcome.",
  },
];

export const SUBLIMINALS_LIBRARY: Subliminal[] = [
  {
    slug: "sub-01",
    title: "I am already her.",
    duration: "22:00",
    description:
      "A present-tense identity track for the hypnagogic threshold. Layer this under silence as you fall asleep. Repeats for twenty-two minutes.",
  },
  {
    slug: "sub-02",
    title: "My body is safe now.",
    duration: "18:00",
    description:
      "For the nervous system that has been in low-grade activation for a long time. Slow exhale pacing woven underneath.",
  },
  {
    slug: "sub-03",
    title: "The return is the practice.",
    duration: "16:00",
    description:
      "For days when the old version pulled you back. The track is written to be listened to without guilt, in the first sixty seconds of the return.",
  },
];
