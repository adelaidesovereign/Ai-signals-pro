import type { CourseModule } from "../types";

export const module5: CourseModule = {
  slug: "module-5-installing-your-true-identity",
  title: "Installing Your True Identity",
  eyebrow: "Module 5",
  summary:
    "Moving from practice to reliable daily wiring. The Quantum Zeno Effect in practical form. What to do when decoherence pulls you back, and how fast the return can become.",
  lessons: [
    {
      slug: "5-1-defining-who-you-actually-are",
      title: "Defining Who You Actually Are",
      eyebrow: "Lesson 5.1",
      reading: "18 minutes of practice",
      blocks: [
        {
          type: "video",
          title: "Defining Who You Actually Are",
          duration: "18:00",
        },
        {
          type: "script",
          text: "Before you install anything new, you need to know precisely what you are installing. Not a vague better version. Not an aspirational archetype.\n\nThe specific, concrete, felt reality of who you are when fear is not in the room. How she moves. How she speaks. What she does with her time. What she will not tolerate. What brings her peace that cannot be disturbed.\n\nWrite it down. In present tense. In specific physical detail.\n\nBecause the subconscious does not respond to generalities. It responds to vivid, emotionally charged, sensorially specific experience.",
        },
        {
          type: "h",
          text: "The writing exercise",
        },
        {
          type: "p",
          text: "The sentence you wrote in Lesson 1.3 is the seed. This lesson is the expansion of that seed into a full felt reality. Open your notes and write at least thirty specific, present-tense sentences. What she eats for breakfast. How she greets her morning. What her voice sounds like on the phone. What her shoulders do when she walks into a room. What she notices first when she enters a space. Specificity is the fuel of installation.",
        },
        {
          type: "tool",
          tool: "writing-prompt",
          title: "Thirty present-tense sentences",
          prompt:
            "Write at least thirty present-tense sentences about who she is in the specific sensory details of her day. Every sentence must be something the body could actually feel. Start each one with 'I' or 'She' and let them pile up.",
          placeholder:
            "1. She wakes up and…\n2. Her body is…\n3. The first thing she does is…\n…",
          minRows: 15,
          storageKey: "cert-5-1-thirty-sentences",
        },
      ],
    },
    {
      slug: "5-2-the-daily-protocol",
      title: "The Daily Protocol",
      eyebrow: "Lesson 5.2",
      reading: "17 minutes of practice",
      blocks: [
        {
          type: "video",
          title: "The Daily Protocol",
          duration: "17:00",
        },
        {
          type: "script",
          text: "The protocol is not about discipline. It is about physics.\n\nThe Quantum Zeno Effect — an experimentally verified phenomenon — states that consistent observation of a quantum state prevents it from transitioning back to a previous state.\n\nYour daily practice is that consistent observation. Morning theta installation. Midday anchor. Evening reconsolidation. Sleep threshold subliminal work.\n\nNot because it is a good habit. Because it is the engineering mechanism that keeps the new identity stable while the old circuits weaken.\n\nEvery single day. This is the work.",
        },
        {
          type: "h",
          text: "The protocol, printed",
        },
        {
          type: "list",
          items: [
            "Morning — thirteen minutes. Settle, heart coherence, five minutes of embodied installation, one present-tense sentence of identity before the feet touch the floor.",
            "Midday — sixty seconds. Hand on heart, three breaths, return to the felt state, continue your day.",
            "Evening — fifteen minutes. Three-question review in the journal, then the hypnagogic install as you fall asleep.",
            "Weekly — one thirty-to-forty-five-minute full reconsolidation session. Choose a time and protect it.",
          ],
        },
        {
          type: "tool",
          tool: "daily-checklist",
          title: "The daily protocol, tracked",
          description:
            "Tap each box as you complete it through the day. Your streak builds automatically. Not willpower — physics. Consistency is the entire game.",
          items: [
            { key: "settle", label: "Morning settle", detail: "Two-minute orient and safety truth" },
            { key: "coherence", label: "Heart coherence", detail: "Five minutes, breath through the heart" },
            { key: "install", label: "Embodied installation", detail: "Five minutes inside her body" },
            { key: "sentence", label: "One identity sentence", detail: "Present tense, out loud or in the body" },
            { key: "midday", label: "Midday anchor", detail: "Sixty seconds, hand on heart, return" },
            { key: "review", label: "Evening review", detail: "Three questions in the journal" },
            { key: "hypnagogic", label: "Hypnagogic install", detail: "One sentence held as you drift to sleep" },
          ],
          storageKey: "cert-5-2-daily-protocol",
        },
      ],
    },
    {
      slug: "5-3-when-the-old-version-tries-to-return",
      title: "When the Old Version Tries to Return",
      eyebrow: "Lesson 5.3",
      reading: "14 minutes of practice",
      blocks: [
        {
          type: "video",
          title: "When the Old Version Tries to Return",
          duration: "14:00",
        },
        {
          type: "script",
          text: "Decoherence is real. The old circuits are deeper and more established. Under stress, under unfamiliar conditions, under the weight of old environments — the system will drift toward what it knows. This is not failure. This is physics.\n\nThe practice is not the perfect performance of the new identity. The practice is the noticing and the return.\n\nHow fast can you recognize decoherence and come back? That speed — that is what you are building.\n\nNot perfection. Rapid recovery.",
        },
        {
          type: "h",
          text: "The new metric",
        },
        {
          type: "p",
          text: "Stop measuring your progress by whether the old pattern shows up. It will. Measure your progress by how quickly you recognize the drift and how quickly you come back. Three days down used to be three weeks. Three weeks used to be three months. Three months used to be a whole life. That compression — that is the real metric. Track it in the notes below for the next thirty days.",
        },
        {
          type: "tool",
          tool: "writing-prompt",
          title: "Your return time, tracked",
          prompt:
            "Each time you notice you have drifted back into the old state, write the date and how long it took you to notice. Over the weeks, watch the numbers get smaller. That is the real metric.",
          placeholder:
            "— Date / hours it took to notice / what brought me back —\n\n",
          minRows: 8,
          storageKey: "cert-5-3-return-time",
        },
      ],
    },
  ],
};
