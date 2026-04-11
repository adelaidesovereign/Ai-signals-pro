import type { CourseModule } from "../types";

export const module3: CourseModule = {
  slug: "module-3-finding-your-root-program",
  title: "Finding Your Root Program",
  eyebrow: "Module 3",
  summary:
    "The somatic work of locating the specific belief that is still running. Not analysis. Not theory. The exact address, in the body, where the old sentence lives.",
  lessons: [
    {
      slug: "3-1-the-somatic-marker-method",
      title: "The Somatic Marker Method",
      eyebrow: "Lesson 3.1",
      reading: "Watch — 17 minutes",
      blocks: [
        {
          type: "video",
          title: "The Somatic Marker Method",
          duration: "17:00",
        },
        {
          type: "script",
          text: "Your body knows what your mind is hiding from you. Bring to mind the area of your life where you feel most stuck. Do not think about it. Feel it. Where in your body does that stuck feeling live? What is its quality — tight, hollow, heavy, numb?\n\nStay with the sensation without analyzing it. Within 60 to 90 seconds it will often produce an image, a memory, or a phrase. That is the implicit belief surfacing. That is the root.",
        },
        {
          type: "h",
          text: "The guided practice for this lesson",
        },
        {
          type: "p",
          text: "Set a quiet fifteen minutes. Sit somewhere you are not going to be interrupted. Watch the video once. Then close your eyes and do exactly what it describes. Bring the stuckness into the room. Feel it. Stay with it. Let whatever comes come. Do not edit. Open your notes the second the session ends and write whatever surfaced, exactly as it surfaced, before the analytical mind has time to reshape it.",
        },
        {
          type: "note",
          text: "If nothing comes the first time, that is not a failure. That is a part of you testing whether this is safe enough to reveal itself. Come back the next day and do it again. The body answers once the body trusts you are listening.",
        },
        {
          type: "tool",
          tool: "somatic-find",
          title: "The guided somatic root find",
          description:
            "Four steps, one ninety-second body hold, and a capture. Do not skip the waiting. That is where the work actually happens.",
          storageKey: "cert-3-1-somatic-find",
        },
      ],
    },
    {
      slug: "3-2-the-question-that-reveals-everything",
      title: "The Question That Reveals Everything",
      eyebrow: "Lesson 3.2",
      reading: "Watch — 14 minutes",
      blocks: [
        {
          type: "video",
          title: "The Question That Reveals Everything",
          duration: "14:00",
        },
        {
          type: "script",
          text: "There is a question that bypasses the analytical mind and goes directly to the program running beneath it.\n\nWhat would have to be true for this pattern to make complete sense?\n\nNot why does this keep happening. What would have to be true about you, about the world, about what you deserve — for this specific pattern to be the logical result?\n\nWhen you find the honest answer, you will feel it land in your body. Not as an intellectual insight. As something that feels like obvious reality. That is the belief. That is what we are changing.",
        },
        {
          type: "h",
          text: "How to use the question",
        },
        {
          type: "p",
          text: "Write the pattern at the top of a clean page. Under it, write the question exactly as Adelaide says it. Then let your hand write whatever comes next, without editing. The first answer that lands with a small body shift is the real one. The ones that land with a mental shrug are not. Trust the body shift, not the logic.",
        },
        {
          type: "tool",
          tool: "writing-prompt",
          title: "The question that reveals everything",
          prompt:
            "Pattern at the top. Then the question. Then your honest answer. Write until your body gives you the one that lands, not the one that sounds smart.",
          placeholder:
            "The pattern:\n\nWhat would have to be true for this pattern to make complete sense?\n\nThe answer my body gave:",
          minRows: 10,
          storageKey: "cert-3-2-question",
        },
      ],
    },
    {
      slug: "3-3-parts-work",
      title: "Parts Work — Meeting Your Protective Systems",
      eyebrow: "Lesson 3.3",
      reading: "Watch — 18 minutes",
      blocks: [
        {
          type: "video",
          title: "Parts Work — Meeting Your Protective Systems",
          duration: "18:00",
        },
        {
          type: "script",
          text: "Richard Schwartz's Internal Family Systems model, listed as an evidence-based practice since 2015, teaches something that changed how I understand the psyche: every pattern of self-sabotage, every inner critic, every part of you that holds back — is protecting something.\n\nIt is not your enemy. It is a part of you that learned, in a specific context, that protection was necessary.\n\nWhen you approach it with curiosity instead of judgment, it will tell you exactly what it is protecting and why. That conversation is where the root becomes visible.",
        },
        {
          type: "h",
          text: "The conversation this lesson asks you to have",
        },
        {
          type: "p",
          text: "Identify the part of you that has been standing between you and the work. The part that procrastinates. The part that criticizes. The part that forgets. Pick one. Close your eyes. Locate it in your body. Ask it, gently: what are you protecting? Wait. The answer will come. It may be an image, a short sentence, a felt memory. Thank the part. Do not argue with it. Write what it said in your notes below.",
        },
        {
          type: "note",
          text: "The relationship you build with your protective parts is the foundation of every future change. The parts do not step aside because you push them. They step aside because they feel understood. This is the difference between fighting yourself and coming home to yourself.",
        },
        {
          type: "tool",
          tool: "parts-work",
          title: "A part conversation",
          description:
            "Five gentle questions, asked slowly, one at a time. Write what each answer gives you exactly as it comes. You are building a relationship, not solving a problem.",
          storageKey: "cert-3-3-parts",
        },
      ],
    },
  ],
};
