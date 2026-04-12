import type { CourseModule } from "../types";

export const module2: CourseModule = {
  slug: "module-2-the-heart-as-the-gate",
  title: "The Heart as the Gate",
  eyebrow: "Module 2",
  summary:
    "HeartMath Institute research has measured the heart's electromagnetic field up to three feet from the body. The shape of that field changes based on your emotional state. Heart coherence is the physiological gate every other practice in this program has to pass through. If the heart is broadcasting incoherence, nothing you install will take.",
  lessons: [
    {
      slug: "2-1-the-hearts-field",
      title: "Your Heart's Electromagnetic Field",
      eyebrow: "Lesson 2.1",
      reading: "20 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "Your heart is not just a pump. Your heart generates an electromagnetic field more than sixty times the amplitude of the field produced by your brain. That field has been measured by standard equipment up to three feet from the body. This is not mysticism. This is the HeartMath Institute publishing peer-reviewed research for over three decades.\n\nWhat makes this relevant to the work you are doing is not that the field exists. It is what it carries.\n\nFear, frustration, and anger produce a chaotic, incoherent waveform. Gratitude, appreciation, and calm produce a smooth, rhythmic, coherent waveform. The difference is measurable in real time.\n\nYour brain and your heart are in constant two-way communication. The heart sends more signals to the brain than the brain sends to the heart. And when the heart's waveform is coherent, the brain becomes physiologically capable of learning, updating old patterns, and accepting new identity information. When the heart is incoherent, those processes shut down.\n\nThis is why affirmations fail. Your mouth says one thing. Your heart is broadcasting the opposite. The body believes the heart. Every time.",
        },
        {
          type: "h",
          text: "Your first heart coherence practice",
        },
        {
          type: "tool",
          tool: "heart-coherence",
          title: "Heart coherence — four minutes",
          description:
            "Hand on the center of your chest. Breathe as if the breath is moving in and out through the heart. Five seconds in, five seconds out. Bring up one real, specific memory of appreciation. Hold it. The circle paces you.",
          durationSeconds: 240,
          storageKey: "cert-2-1-coherence",
        },
        {
          type: "tool",
          tool: "writing-prompt",
          title: "One real memory of appreciation",
          prompt:
            "Name the specific memory you used during the coherence practice. Not a general idea of gratitude — the actual moment. A person's face. A place. A sentence someone said. The more specific, the more reliably you can return to it tomorrow.",
          placeholder: "The memory I used was…",
          minRows: 4,
          storageKey: "cert-2-1-appreciation-memory",
        },
      ],
    },

    {
      slug: "2-2-coherence-vs-incoherence",
      title: "Why Your Affirmations Failed",
      eyebrow: "Lesson 2.2",
      reading: "20 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "If your mind is saying I am safe and your heart field is transmitting the waveform of fear, the body believes the heart. Every time. The heart's signal is stronger, it is closer to the nervous system, and it is the first translator of information into physiology.\n\nEvery affirmation you have ever repeated that you did not feel in your body was teaching your nervous system that your words and your truth do not match. You were not getting closer to the new identity. You were reinforcing the gap.\n\nThe work of this program does not ask you to override anything. It asks you to enter coherence first — so the heart and the mind are broadcasting the same signal — and then install the new state from inside that aligned field.\n\nCoherence is the gate. Everything that follows in this program passes through it.",
        },
        {
          type: "h",
          text: "Where are you coherent and where are you not?",
        },
        {
          type: "tool",
          tool: "self-compassion-break",
          title: "A self-compassion break for the gap",
          description:
            "Before you move forward, hold what you just learned with compassion. The affirmations were not your fault. You were given tools built for the wrong layer. Kristin Neff's three-step self-compassion break is here for the grief of that.",
          storageKey: "cert-2-2-compassion",
        },
        {
          type: "note",
          text: "If the self-compassion practice surfaced something heavy, that is correct. The grief of lost time — years spent trying to fix yourself with tools that were never going to reach the root — is a real grief. Module 5 will hold that grief properly. For now, just notice it.",
        },
      ],
    },

    {
      slug: "2-3-the-coherence-ritual",
      title: "The Coherence Ritual",
      eyebrow: "Lesson 2.3",
      reading: "20 minutes of practice",
      blocks: [
        {
          type: "script",
          text: "From this point forward, every practice in this program begins with coherence. The settle from Module 1 brings the nervous system to ventral. The coherence ritual brings the heart into alignment with the mind. Together they are the two-step gate.\n\nThe sequence is always the same. Settle first. Coherence second. Then the work.\n\nYou already know the settle: long exhale, orient, name one safe truth. The coherence adds: hand on heart, breathe through the heart for three minutes, hold the appreciation memory.\n\nWhen you can enter coherence reliably — meaning the expansion in your chest arrives within the first ninety seconds — you are ready for Module 3.",
        },
        {
          type: "tool",
          tool: "heart-coherence",
          title: "The full coherence ritual — five minutes",
          description:
            "This time, do the settle from Lesson 1.3 first (long exhale + orient), then go straight into heart coherence. Five minutes. Let the two practices become one continuous flow.",
          durationSeconds: 300,
          storageKey: "cert-2-3-full-coherence",
        },
        {
          type: "tool",
          tool: "daily-checklist",
          title: "Updated daily protocol — safety + coherence",
          description:
            "Your daily checklist expands. The morning settle stays. Coherence is added after it. The evening settle stays. This is the foundation the rest of the program builds on.",
          items: [
            {
              key: "morning-settle",
              label: "Morning settle",
              detail: "Long exhale, orient, one safe truth.",
            },
            {
              key: "morning-coherence",
              label: "Morning heart coherence",
              detail: "Three to five minutes. Breath through the heart. Appreciation memory.",
            },
            {
              key: "midday-check",
              label: "Midday check-in",
              detail: "Hand on heart. Three breaths. Where am I on the ladder?",
            },
            {
              key: "evening-settle",
              label: "Evening settle",
              detail: "Long exhale, orient, one safe truth before bed.",
            },
          ],
          storageKey: "cert-2-3-daily-protocol",
        },
      ],
    },
  ],
};
