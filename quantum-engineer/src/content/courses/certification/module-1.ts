import type { CourseModule } from "../types";

export const module1: CourseModule = {
  slug: "module-1-who-you-actually-are",
  title: "Who You Actually Are",
  eyebrow: "Module 1",
  summary:
    "Before the science, before the tools, the honest answer to the only question that matters. The identity layer is the ground the rest of this work is built on.",
  lessons: [
    {
      slug: "1-1-the-program-you-have-been-running",
      title: "The Program You Have Been Running",
      eyebrow: "Lesson 1.1",
      reading: "14 minutes of practice",
      blocks: [
        {
          type: "video",
          title: "The Program You Have Been Running",
          duration: "14:00",
        },
        {
          type: "script",
          text: "Before we talk about quantum physics or neuroscience, I need to ask you something. Who are you when no one is watching? Not who you perform for the world. Not the version of you that shows up when someone might be judging. Who are you when you are completely alone, doing exactly what brings you peace, with no audience?\n\nMost people have never seriously asked themselves this. And that gap — between who you perform and who you actually are — that gap is where all the suffering lives.\n\nI spent 17 years in therapy. Brilliant therapists. Real work. And the breakdowns kept coming. Because we were managing symptoms. We were building better coping strategies for a life that was never mine to begin with. I was trying to succeed at being someone else. And I was very good at it. That is the cruelest part. I was good at being the wrong person.\n\nThis course is not about coping better. It is about identifying the program that was installed before you had the capacity to choose it — and replacing it with the one that is actually yours.",
        },
        {
          type: "h",
          text: "The intention of this lesson",
        },
        {
          type: "p",
          text: "Before you begin the practice, let the question sit in your body. Who are you when no one is watching. Not the answer you would give if someone were testing you. The answer that comes in a quiet room. That answer is the beginning of the work, and it is also the reason you are here.",
        },
        {
          type: "note",
          text: "When you are ready, open your notes below and write the first three words that came to you. Not sentences. Three words. They are a signal, not a summary.",
        },
        {
          type: "tool",
          tool: "present-moment-anchor",
          title: "Before you begin, come back to the room",
          description:
            "A five-sense anchor before the work starts. Fifteen specific present-moment truths. The body needs this before any identity work can land.",
          storageKey: "cert-1-1-anchor",
        },
        {
          type: "tool",
          tool: "writing-prompt",
          title: "Three words",
          prompt:
            "Who are you when no one is watching? Answer in three words. Not sentences. The first three that come before the editor interrupts.",
          placeholder: "1. \n2. \n3. ",
          minRows: 4,
          storageKey: "cert-1-1-three-words",
        },
      ],
    },
    {
      slug: "1-2-the-root-versus-the-symptom",
      title: "The Root Versus the Symptom",
      eyebrow: "Lesson 1.2",
      reading: "13 minutes of practice",
      blocks: [
        {
          type: "video",
          title: "The Root Versus the Symptom",
          duration: "13:00",
        },
        {
          type: "script",
          text: "Every breakdown. Every pattern that keeps repeating. Every relationship that ends the same way. Every business that stalls at the same point. These are not the problem. They are symptoms. The problem is always beneath them. It is the implicit belief — the subconscious code — that is generating the symptom.\n\nThe coping tools would stop the immediate crisis. They were helpful for that. But the root belief was still running. Until you find the specific belief — not generally, but the exact felt sense in your body — you cannot change it.\n\nThis module teaches you to find the root. Not the story about it. The actual root, living in your body right now.",
        },
        {
          type: "h",
          text: "The instruction for this lesson",
        },
        {
          type: "p",
          text: "Pick the pattern in your life that has most reliably returned, no matter what you have tried. Not the most painful one. The most repeating one. That is the one with the deepest root, and it is the one this course will teach you to rewrite. Write its name in your notes below.",
        },
        {
          type: "tool",
          tool: "writing-prompt",
          title: "Name the repeating pattern",
          prompt:
            "Not the most painful one. The one that keeps returning in a new costume, no matter what you do. Name it. That is your work for the rest of this course.",
          placeholder: "The pattern that keeps returning is…",
          minRows: 4,
          storageKey: "cert-1-2-repeating-pattern",
        },
      ],
    },
    {
      slug: "1-3-who-you-are-without-fear",
      title: "Who You Are Without Fear",
      eyebrow: "Lesson 1.3",
      reading: "15 minutes of practice",
      blocks: [
        {
          type: "video",
          title: "Who You Are Without Fear",
          duration: "15:00",
        },
        {
          type: "script",
          text: "Here is the question that changes everything. If you could be whoever you wanted to be — no judgment, no consequences, no fear — who would you be? How would you walk into a room? What would you be doing with your time? What would your home look like? How would you talk? Who would be around you?\n\nMost people begin answering and then immediately start editing. The mind says: that is too much, that is unrealistic, who do you think you are. That voice is not you. That is old trauma masquerading as wisdom.\n\nThe unedited answer — the first thing that came before the editor showed up — that is who you actually are. This course is the process of collapsing the distance between who you are right now and who you were before fear told you to be smaller.",
        },
        {
          type: "h",
          text: "The first writing exercise of the course",
        },
        {
          type: "p",
          text: "Open the notes below, or open a fresh page in whatever you are writing in these days, and answer the question in present tense. I walk like this. I speak like this. I wear this. My home looks like this. I tolerate this. I do not tolerate that. The room around me feels like this. Specificity is everything. Write for at least ten minutes without stopping. You will come back to this page for the entire rest of the course.",
        },
        {
          type: "note",
          text: "When you feel the editor show up — and you will — do not argue with it. Just write the sentence the editor tried to cut. Put the editor down for ten minutes. It will still be there when you are done.",
        },
        {
          type: "tool",
          tool: "identity-builder",
          title: "Her, in concrete sensory detail",
          description:
            "The image you will be installing every morning for the rest of this course. Return as often as you want. Add detail the moment anything new lands.",
          fields: [
            {
              key: "room-entry",
              label: "How she walks into a room",
              placeholder: "When she enters a room…",
            },
            {
              key: "time",
              label: "What she spends her day on",
              placeholder: "Her day is spent…",
            },
            {
              key: "home",
              label: "What her home looks like",
              placeholder: "Her home has…",
            },
            {
              key: "voice",
              label: "What her voice sounds like",
              placeholder: "Her voice is…",
            },
            {
              key: "around-her",
              label: "Who is around her",
              placeholder: "The people around her are…",
            },
            {
              key: "morning",
              label: "What her morning looks like",
              placeholder: "Her morning is…",
            },
            {
              key: "not-tolerate",
              label: "What she does not tolerate",
              placeholder: "She does not tolerate…",
            },
          ],
          storageKey: "cert-1-3-identity",
        },
      ],
    },
  ],
};
