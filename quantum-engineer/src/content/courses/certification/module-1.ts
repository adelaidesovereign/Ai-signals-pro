import type { CourseModule } from "../types";

export const module1: CourseModule = {
  slug: "module-1-you-are-safe-here",
  title: "You Are Safe Here",
  eyebrow: "Module 1",
  summary:
    "Before we talk about your brain, your heart, your past, or your future — the body has to come down. Nothing in this program can land while your nervous system is bracing for impact. These four lessons are the ground. The rest of the program is built on top of them.",
  lessons: [
    // ----- Lesson 1.1 -----
    {
      slug: "1-1-you-are-not-broken",
      title: "You Are Not Broken",
      eyebrow: "Lesson 1.1",
      reading: "20 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "I want to say this once, clearly, at the very beginning, before we do anything else.\n\nYou are not broken. You have never been broken.\n\nThe reason nothing has worked so far is not that you did not try hard enough, or that you are somehow more resistant to change than other people, or that there is something fundamentally wrong with the way you are built.\n\nThe reason is that you have been given tools built for the wrong layer of the machine. You have been managing symptoms — some of them brilliantly — while the root has been running underneath, untouched, generating the same output year after year in a new costume.\n\nThis program is not another set of coping tools. This is the mechanism for finding the root, updating it at the level where it was originally installed, and wiring in the identity that was yours before fear told you to be someone smaller.\n\nBut first — before any of that — your body has to feel safe enough to receive it. A nervous system in survival mode rejects new code the same way your immune system rejects a transplant. Safety is not a nice-to-have. It is the prerequisite.",
        },
        {
          type: "h",
          text: "Before anything else, let this land in your body",
        },
        {
          type: "p",
          text: "You are about to rate yourself across eight dimensions. This is not a test. This is a snapshot of where you are today, so that at the end of this program you can see, in real numbers, how far you have come. Be honest. The only person who sees this is you.",
        },
        {
          type: "tool",
          tool: "pre-post-assessment",
          title: "Your starting point",
          description:
            "Rate yourself on each dimension from 1 to 10. There is no passing score. This is a photograph of today so the version of you at the end of the program can look back and see the distance.",
          snapshotLabel: "Day 1 — beginning the program",
          storageKey: "cert-1-1-assessment",
        },
        {
          type: "note",
          text: "Save that snapshot. You will take this same assessment at the midpoint and at the end of the program. The change between the first and the last is the proof that the work worked.",
        },
      ],
    },

    // ----- Lesson 1.2 -----
    {
      slug: "1-2-your-nervous-system",
      title: "Your Nervous System — The Polyvagal Ladder",
      eyebrow: "Lesson 1.2",
      reading: "25 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "Stephen Porges, the neuroscientist behind polyvagal theory, discovered something that changes how we understand the body.\n\nYour nervous system is not binary — on or off, stressed or calm. It operates on a ladder with three rungs.\n\nThe top rung is called the ventral vagal state. This is where the body feels safe. You are calm, curious, present, socially open. Your breath is easy. Your shoulders are soft. Your thinking is clear. This is the only state in which you can learn new things at depth, update old beliefs, and install a new identity.\n\nThe middle rung is the sympathetic state. Fight or flight. Your heart rate is elevated. You are scanning for danger. Your jaw is tight. Your mind is racing. You might call this anxiety, anger, hustle, or just being wound tight.\n\nThe bottom rung is the dorsal vagal state. Shutdown. Numb. Flat. Nothing feels worth the effort. You might call this depression, dissociation, or being exhausted all the time.\n\nMost people who come to this work have been living on the middle or bottom rung for so long that they have forgotten the top one exists. The activation feels like personality. The numbness feels like who they are.\n\nIt is neither. It is a nervous system state. And it can change.",
        },
        {
          type: "h",
          text: "Where do you live on the ladder?",
        },
        {
          type: "p",
          text: "This tool maps your current default state. Not where you are in a good moment — where you spend most of your time. Be honest about where you actually live on the ladder, because that is the baseline you are about to shift.",
        },
        {
          type: "tool",
          tool: "polyvagal-ladder",
          title: "Map your nervous system",
          description:
            "Select the state where you spend most of your time. Write how it shows up in your daily life. Save the snapshot so you can see it change as the program progresses.",
          storageKey: "cert-1-2-polyvagal",
        },
        {
          type: "note",
          text: "If you selected sympathetic or dorsal and it was hard to admit, that is the honest starting point. The next lesson teaches you the three moves that bring the body back to ventral. You will use them before every other practice in this program.",
        },
      ],
    },

    // ----- Lesson 1.3 -----
    {
      slug: "1-3-the-settle",
      title: "The Settle — Three Moves That Regulate You in Two Minutes",
      eyebrow: "Lesson 1.3",
      reading: "15 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "There are three things a body needs to move from the middle or bottom rung of the ladder back to ventral vagal. Three things that are mechanical, not emotional. They work every time because they are built on the way the vagus nerve actually operates.\n\nMove one. The long exhale. Your vagus nerve is most activated by exhales that are longer than your inhales. Breathe in for four seconds. Breathe out for eight. Five cycles. The body cannot maintain fight-or-flight while it is doing this. It is not possible.\n\nMove two. Orient. Slowly turn your head and let your eyes land on things in the room — a corner of the wall, a plant, a texture, the light. Linger on each one. This is an ancient safety signal. You are telling the brainstem that the environment is known and there is no predator behind you.\n\nMove three. Name one specific, present-moment truth that is safe. Not a general affirmation. A specific truth. The door is closed. The air is warm. No one in this room is about to hurt me. The body is literal. It needs a specific fact to register that the scan can stop.\n\nTwo minutes. Three moves. This is the condition every other practice in the program requires.",
        },
        {
          type: "tool",
          tool: "breathwork",
          title: "The long exhale",
          description:
            "Four seconds in, eight seconds out. Five cycles. The vagus nerve activates on the exhale. Your heart rate will drop measurably by the third cycle.",
          inhale: 4,
          exhale: 8,
          cycles: 5,
          storageKey: "cert-1-3-long-exhale",
        },
        {
          type: "tool",
          tool: "present-moment-anchor",
          title: "Orient and anchor",
          description:
            "Name five things you see, four things you hear, three things you feel, two things you smell, one thing you taste. Your body is giving you fifteen specific present-moment truths. That is enough to break the scan.",
          storageKey: "cert-1-3-anchor",
        },
        {
          type: "note",
          text: "Do these three moves once right now. Then do them every single morning before your feet touch the floor, and once more before every practice in this program. They are not the work. They are the condition the work requires.",
        },
      ],
    },

    // ----- Lesson 1.4 -----
    {
      slug: "1-4-building-safety-every-day",
      title: "Building a Regulated Baseline",
      eyebrow: "Lesson 1.4",
      reading: "20 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "A nervous system that has been in survival mode for years does not come down in one session. It comes down through repetition. The same way the old activation was built — through thousands of small moments — the new baseline is built through thousands of small moments of safety.\n\nYour job this week is not to start the deep work. Your job is to practice safety. Morning settle. Midday check-in. Evening settle. Three touch points across the day where you give the body one clear signal: you are safe. Nothing more.\n\nThe daily checklist below is your first protocol. Not the full daily protocol that comes later in the program — just the safety layer. Do this for one full week before moving to Module 2. The body needs to believe the floor is solid before it will let you go deeper.",
        },
        {
          type: "tool",
          tool: "daily-checklist",
          title: "The safety protocol — week one",
          description:
            "Your first protocol. Three moments of safety across the day. The streak counter builds automatically. This is not discipline — it is repetition at the level the nervous system learns.",
          items: [
            {
              key: "morning-settle",
              label: "Morning settle",
              detail: "Three moves: long exhale (5 cycles), orient the room, name one safe truth.",
            },
            {
              key: "midday-check",
              label: "Midday check-in",
              detail: "Hand on heart. Three slow breaths. Ask: where am I on the ladder right now?",
            },
            {
              key: "evening-settle",
              label: "Evening settle",
              detail: "Three moves again before bed. Let the body end the day in ventral.",
            },
          ],
          storageKey: "cert-1-4-safety-protocol",
        },
        {
          type: "p",
          text: "When your streak reaches seven days, you are ready for Module 2. Not before. The body needs the week. Trust the pace.",
        },
        {
          type: "tool",
          tool: "writing-prompt",
          title: "What does safety feel like in your body?",
          prompt:
            "Most people who have been in survival mode for a long time do not actually know what safety feels like. After doing the settle for a few days, describe the sensation. Where in your body do you notice it? What is different about the way the room feels? What is different about the way your chest holds?",
          placeholder: "When the settle lands, the inside of my body feels like…",
          minRows: 6,
          storageKey: "cert-1-4-safety-feeling",
        },
      ],
    },
  ],
};
