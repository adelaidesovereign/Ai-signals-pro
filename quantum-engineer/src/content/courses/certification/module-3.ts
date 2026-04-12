import type { CourseModule } from "../types";

export const module3: CourseModule = {
  slug: "module-3-what-is-running-the-show",
  title: "What Is Actually Running the Show",
  eyebrow: "Module 3",
  summary:
    "The neuroscience of why you are stuck. The RAS, the subconscious, and the reason every coping tool you have tried left the root untouched. This module gives you the map so the work in Modules 4 and 5 has somewhere to land.",
  lessons: [
    {
      slug: "3-1-the-filter",
      title: "Your Brain Is Filtering Reality",
      eyebrow: "Lesson 3.1",
      reading: "20 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "Your brain takes in approximately eleven million bits of sensory information every second. Your conscious mind gets access to roughly forty of them. The system that decides which forty become your experience is called the Reticular Activating System.\n\nThe RAS is not neutral. It has a standing order from your subconscious about what is relevant, what is dangerous, and what is possible. It only lets through the data that matches those orders.\n\nIf the standing order says you are not safe, the RAS finds evidence of danger everywhere and quietly throws out the evidence of safety. If the order says you are not enough, it finds proof of inadequacy and fails to deliver the moments of real recognition that contradict it.\n\nYou are not seeing reality. You are seeing a filtered version of it, constructed by a program you never consciously chose. This is documented neuroscience, not a metaphor.",
        },
        {
          type: "tool",
          tool: "writing-prompt",
          title: "The filter audit",
          prompt:
            "Name the three sentences your RAS seems to be filtering reality through right now. They usually start with 'I always…' or 'It never…' or 'People always…' — the sentences so familiar you stopped noticing they were running.",
          placeholder: "1.\n2.\n3.",
          minRows: 6,
          storageKey: "cert-3-1-filter-audit",
        },
      ],
    },

    {
      slug: "3-2-how-the-code-was-installed",
      title: "How the Code Was Installed",
      eyebrow: "Lesson 3.2",
      reading: "20 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "Between the ages of zero and seven, your brain operated primarily in theta brainwave state. Theta is the same state adults enter in the drowsy moments between waking and sleep — the state where the analytical filter is absent. For small children, theta is the default.\n\nEverything your environment gave you during those years went in unfiltered. Every repeated message from caregivers. Every emotionally charged experience. Every argument overheard. Every moment the room went quiet and you felt something you did not have words for. All of it went straight into the subconscious, filed as truth.\n\nThat is the program running your life right now. Not because you chose it. Because you were too young to filter it.\n\nNone of this was your fault. None of it. And the same mechanism that installed it — theta state, felt experience, repetition — is the same mechanism that can update it.",
        },
        {
          type: "tool",
          tool: "self-compassion-break",
          title: "Self-compassion for the child who received the code",
          description:
            "Before you go further, hold what you just learned with Kristin Neff's three-step compassion practice. The suffering is real. You are not alone in it. And you deserve kindness for carrying a program that was never yours.",
          storageKey: "cert-3-2-compassion-child",
        },
        {
          type: "tool",
          tool: "writing-prompt",
          title: "What was the room teaching you?",
          prompt:
            "Before the age of seven, your nervous system was reading the room and writing code. Name three things the room you grew up in was implicitly teaching you about love, safety, or what it meant to be a person. Not accusations. Observations.",
          placeholder: "The room was teaching me that…",
          minRows: 6,
          storageKey: "cert-3-2-room-teaching",
        },
      ],
    },

    {
      slug: "3-3-why-coping-never-touched-the-root",
      title: "Why Coping Never Touched the Root",
      eyebrow: "Lesson 3.3",
      reading: "20 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "Coping manages the symptom. It does not touch the root. This is why the same pattern keeps returning under stress — a better job, a new relationship, a different city, and eventually the same feeling follows you there. Because you brought the program with you.\n\nEvery mindset practice you have tried was aimed at your conscious mind. That is five percent of the territory. The subconscious runs the other ninety-five percent, and it does not speak in words. It speaks in feeling, body state, and repetition.\n\nThe tools in Modules 4 and 5 speak the subconscious language directly. They reach it through the body, in theta, using the same mechanism that installed the original code. But before we use them, you need to see — clearly and without judgment — which of your current tools have been symptom tools and which have been root tools.",
        },
        {
          type: "h",
          text: "The honest audit",
        },
        {
          type: "p",
          text: "Every tool you have ever used lives in one of two columns. Symptom tools helped you get through the day. Root tools actually changed the pattern at its source. Most people find that almost everything is in the left column. That is not a judgment of those tools. It is a clarification of where the real work still lives.",
        },
        {
          type: "tool",
          tool: "eft-tapping",
          title: "A first tapping round — releasing the frustration",
          description:
            "Before you do the audit, let the frustration of having tried so many things without the root changing have somewhere to go. EFT tapping is clinically validated for exactly this. The old belief: the frustration. The reframe: I now have the mechanism.",
          storageKey: "cert-3-3-first-tapping",
        },
        {
          type: "tool",
          tool: "writing-prompt",
          title: "Symptom tools versus root tools",
          prompt:
            "Make two columns. On the left, every tool that has helped manage the symptom — therapy, meditation, exercise, journaling, a specific relationship, a specific job. On the right, every tool that has actually changed the root pattern at its source. Be honest.",
          placeholder: "Symptom tools:\n- \n- \n- \n\nRoot tools:\n- \n- ",
          minRows: 10,
          storageKey: "cert-3-3-symptom-vs-root",
        },
      ],
    },
  ],
};
