import type { CourseModule } from "../types";

export const module4: CourseModule = {
  slug: "module-4-finding-your-root-program",
  title: "Finding Your Root Program",
  eyebrow: "Module 4",
  summary:
    "Herman's Stage 2 begins here: remembrance and mourning. The somatic work of locating the exact belief running the pattern, meeting the protective part that guards it, and beginning to release it through EFT tapping. This is the most emotionally demanding module in the program and the most important one.",
  lessons: [
    {
      slug: "4-1-the-somatic-marker-method",
      title: "The Somatic Marker Method",
      eyebrow: "Lesson 4.1",
      reading: "25 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "Your body knows what your mind is hiding from you.\n\nBring to mind the area of your life where you feel most stuck. Do not think about it. Feel it. Where in your body does that stuck feeling live? What is its quality — tight, hollow, heavy, numb?\n\nStay with the sensation without analyzing it. Within sixty to ninety seconds, it will often produce an image, a memory, or a phrase. That is the implicit belief surfacing. That is the root.\n\nThe somatic marker method is Peter Levine's gift to trauma work. The body stores what the mind cannot hold. And when you approach the body with patience — not analysis, not interpretation, just quiet attention — it will tell you exactly where the root lives and what it says.",
        },
        {
          type: "tool",
          tool: "somatic-find",
          title: "The guided somatic root find",
          description:
            "Four steps, one ninety-second body hold, and a capture at the end. This is where the root becomes visible. Come back as often as needed — patterns usually take three or four passes before they reveal themselves fully.",
          storageKey: "cert-4-1-somatic-find",
        },
        {
          type: "note",
          text: "If nothing surfaced the first time, that is a part of you testing whether this is safe enough to show itself. Come back tomorrow and try again. The body answers once the body trusts you are listening.",
        },
      ],
    },

    {
      slug: "4-2-the-question-that-reveals",
      title: "The Question That Reveals Everything",
      eyebrow: "Lesson 4.2",
      reading: "25 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "There is a question that bypasses the analytical mind and goes directly to the program running beneath it.\n\nWhat would have to be true for this pattern to make complete sense?\n\nNot why does this keep happening. What would have to be true about you, about the world, about what you deserve — for this specific pattern to be the absolutely logical result?\n\nWhen you find the honest answer, you will feel it land in your body. Not as an intellectual insight. As something that feels like obvious reality — like an old piece of furniture you did not realize you had been sitting on for twenty years.\n\nThat landing is the root belief. That is what Modules 5 and 6 will rewrite.",
        },
        {
          type: "tool",
          tool: "writing-prompt",
          title: "The question, answered",
          prompt:
            "Write the pattern at the top. Then the question exactly as Adelaide says it. Then let your hand write whatever comes. Trust the body shift, not the logic. The first answer that lands with a small physical sensation is the real one.",
          placeholder: "The pattern:\n\nWhat would have to be true for this pattern to make complete sense?\n\nThe answer my body gave:",
          minRows: 12,
          storageKey: "cert-4-2-the-question",
        },
      ],
    },

    {
      slug: "4-3-meeting-your-protectors",
      title: "Meeting Your Protectors — IFS Parts Work",
      eyebrow: "Lesson 4.3",
      reading: "30 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "Richard Schwartz's Internal Family Systems model, listed as an evidence-based practice since 2015, teaches something that changed how I understand the psyche.\n\nEvery pattern of self-sabotage, every inner critic, every part of you that holds back — is protecting something. It is not your enemy. It is a part of you that learned, in a specific context, that protection was necessary.\n\nThe IFS protocol has six steps. The six F's: Find the part. Focus your attention on it. Flesh it out — what does it look like, how old does it feel. Feel toward it — what is your relationship with this part. Befriend it — approach with curiosity, not judgment. And ask about its Fear — what is it afraid will happen if it stops protecting.\n\nWhen you approach a protective part with curiosity instead of force, it will tell you exactly what it is protecting and why. That conversation is where the root becomes fully visible.",
        },
        {
          type: "tool",
          tool: "parts-work",
          title: "The full parts conversation — IFS 6 F's",
          description:
            "Five guided questions that walk you through the IFS protocol. Name the part. Locate it in the body. Ask how old it feels. Ask what it is protecting. Ask what it needs from you to feel safer. Write every answer exactly as it comes.",
          storageKey: "cert-4-3-parts-work",
        },
      ],
    },

    {
      slug: "4-4-tapping-the-root",
      title: "Tapping the Root — EFT on the Belief",
      eyebrow: "Lesson 4.4",
      reading: "25 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "Now you know the root belief. You found it in the body in Lesson 4.1. You named it in Lesson 4.2. You met the part that has been protecting it in Lesson 4.3. Now you tap on it.\n\nEFT — Emotional Freedom Technique — has more than three hundred clinical trials, ninety-seven randomized controlled trials, and eleven meta-analyses. It is the most clinically validated somatic release tool for belief change that exists.\n\nThe sequence is simple. You state the old belief while tapping on nine meridian points on your body. Then you state the reframe — the truth that replaces the old belief — while tapping the same nine points. Two rounds. The tapping sends a calming signal to the amygdala while the belief is live in the body, which is exactly the mismatch condition memory reconsolidation requires.\n\nUse the root belief from Lesson 4.2 as the old belief. Use the answer to the question from Chapter 2 of the Field Guide — who are you without fear — as the seed for the reframe.",
        },
        {
          type: "tool",
          tool: "eft-tapping",
          title: "EFT tapping on your root belief",
          description:
            "Enter the root belief you found in 4.2 as the old belief. Enter the truth that replaces it as the reframe. Tap through all nine points, two rounds. The tool guides you through every point.",
          storageKey: "cert-4-4-root-tapping",
        },
        {
          type: "tool",
          tool: "self-compassion-break",
          title: "Self-compassion after the tapping",
          description:
            "Tapping on a root belief can surface grief, anger, or a strange lightness. Whatever came, hold it with Neff's three-step compassion practice before you close the session.",
          storageKey: "cert-4-4-post-tapping-compassion",
        },
        {
          type: "note",
          text: "This is the most emotionally demanding lesson in the program. If you feel drained or raw afterward, that is correct. Do the evening settle from Module 1 tonight. Do not skip it. The body needs to close the session properly.",
        },
      ],
    },
  ],
};
