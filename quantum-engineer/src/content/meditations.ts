// Guided meditation library.
//
// Each meditation is a full script — a sequence of short spoken lines
// and the pause (in seconds) that follows each one. The
// GuidedMeditationPlayer component speaks each line with the soft voice
// and waits for the specified pause before continuing, all while theta
// binaural beats and an ambient drone play in the background.
//
// Every script follows the same arc:
//
//   1. Settle. Nervous system regulation, long exhales, body landing.
//   2. Descent. Breath pacing and imagery that carry the listener
//      toward low alpha / high theta.
//   3. The work. The specific reprogramming the meditation is about.
//      Identity installation, reconsolidation, root belief update,
//      heart coherence, parts work, hypnagogic install — the work is
//      always specific and somatic.
//   4. Integration. Holding the new state and letting the body anchor
//      into it.
//   5. Emerge. A slow return to the room with a soft arrival cue.
//
// Every script is written in Adelaide's voice: short sentences, no
// padding, no filler, warm but not soft, precise but not clinical.

export type MeditationStep = {
  text: string;
  pause: number; // seconds of silence after this line
};

export type Meditation = {
  slug: string;
  title: string;
  subtitle: string;
  intention: string;
  durationMinutes: number;
  beatFrequency: number;
  stages: Array<{ name: string; steps: MeditationStep[] }>;
};

// Shared fragments ---------------------------------------------------------

const SETTLE: MeditationStep[] = [
  { text: "Let your eyes close, or soften your gaze until the room blurs.", pause: 6 },
  { text: "Let your shoulders drop. Let your jaw come unclenched.", pause: 6 },
  { text: "Place one hand on the center of your chest.", pause: 5 },
  { text: "Take a slow breath in through your nose.", pause: 4 },
  { text: "And a longer, softer breath out through your mouth.", pause: 8 },
  { text: "Again. In, slow.", pause: 4 },
  { text: "Out, longer. Let the exhale pour all the way out.", pause: 10 },
  { text: "One more. In.", pause: 4 },
  { text: "Out. And let everything come down another notch.", pause: 12 },
];

const DESCENT: MeditationStep[] = [
  { text: "Feel the weight of your body against whatever is holding you.", pause: 8 },
  { text: "Let that weight double. Let yourself be held.", pause: 8 },
  { text: "Now follow your breath to the place just below your navel.", pause: 8 },
  { text: "Let your attention settle there. Nothing to do.", pause: 10 },
  { text: "With each exhale, let yourself drop one level deeper.", pause: 10 },
  { text: "Deeper. You are safe here. The body knows the way.", pause: 12 },
];

const EMERGE: MeditationStep[] = [
  { text: "Slowly, begin to bring your awareness back to the room.", pause: 6 },
  { text: "Notice the sounds around you. Let them back in gently.", pause: 6 },
  { text: "Feel your hands, your feet, the shape of your body.", pause: 6 },
  { text: "Take a slightly deeper breath.", pause: 5 },
  { text: "And a gentle stretch if your body asks for one.", pause: 6 },
  { text: "When you are ready, let your eyes open. Soft, not sharp.", pause: 4 },
  { text: "You are here. You are returned. And something small has shifted.", pause: 6 },
];

// ---------- Meditations ----------

export const MEDITATIONS: Meditation[] = [
  {
    slug: "coming-home-to-who-you-are",
    title: "Coming home to who you actually are",
    subtitle: "Identity installation — the core meditation of the whole program",
    intention:
      "The guided descent into theta followed by a felt-sense installation of the version of you without fear. Return to this once a week, forever.",
    durationMinutes: 20,
    beatFrequency: 6,
    stages: [
      { name: "Settle", steps: SETTLE },
      { name: "Descent", steps: DESCENT },
      {
        name: "The work",
        steps: [
          { text: "I want you to bring her into the room with you now.", pause: 6 },
          { text: "The version of you who has never known fear.", pause: 6 },
          { text: "The one who walks into rooms knowing she belongs there.", pause: 8 },
          { text: "Do not picture her from outside. Step into her body.", pause: 10 },
          { text: "Feel what her spine is doing. Tall and loose at the same time.", pause: 10 },
          { text: "Feel what her jaw is doing. Unclenched. At rest.", pause: 8 },
          { text: "Feel what her hands are doing. Open. Unhurried.", pause: 8 },
          { text: "Let her breath replace yours. Slow. Full. Easy.", pause: 10 },
          { text: "She has never apologized for taking up space.", pause: 8 },
          { text: "She has never edited herself to fit a smaller room.", pause: 8 },
          { text: "She knows exactly what she loves, and she makes no case for it.", pause: 10 },
          { text: "Feel the quality of her certainty. Not loud. Settled.", pause: 12 },
          { text: "Now hear her say, in her voice, inside your body: I am already her.", pause: 10 },
          { text: "I am already her.", pause: 10 },
          { text: "I am already her.", pause: 12 },
          { text: "Let the sentence land everywhere it needs to land.", pause: 14 },
        ],
      },
      {
        name: "Integration",
        steps: [
          { text: "Stay with her. Let her settle into every place that was waiting.", pause: 14 },
          { text: "Notice what it feels like for your body to agree with her.", pause: 14 },
          { text: "This is the state you will bring to your morning. This is home.", pause: 10 },
        ],
      },
      { name: "Emerge", steps: EMERGE },
    ],
  },

  {
    slug: "nervous-system-soften",
    title: "The nervous system soften",
    subtitle: "A twelve-minute regulation practice for the body that has been bracing",
    intention:
      "Use this when your body has been in low-grade threat state and nothing you read will land. The practice is not the work. The practice is the condition the work requires.",
    durationMinutes: 12,
    beatFrequency: 5,
    stages: [
      { name: "Settle", steps: SETTLE.slice(0, 6) },
      {
        name: "Orient",
        steps: [
          { text: "Slowly turn your head to the right.", pause: 6 },
          { text: "Let your eyes land on one thing. A corner. A shape. Any ordinary thing.", pause: 8 },
          { text: "Now slowly turn your head to the left.", pause: 6 },
          { text: "Let your eyes land on one more ordinary thing.", pause: 8 },
          { text: "You are showing your brain that the room is known.", pause: 8 },
          { text: "There is no predator here. The scan can stop.", pause: 10 },
        ],
      },
      {
        name: "Release",
        steps: [
          { text: "Bring your attention to your shoulders.", pause: 5 },
          { text: "Drop them one more time. Drop them past where you thought they could go.", pause: 8 },
          { text: "Now your jaw. Let your teeth unclench. Let your tongue rest at the bottom of your mouth.", pause: 10 },
          { text: "Now your belly. Let it be soft. You are not on duty.", pause: 10 },
          { text: "Now your eyes behind their lids. Let them stop searching.", pause: 10 },
          { text: "Say to yourself, in your own voice, inside your chest: my body is safe now.", pause: 10 },
          { text: "My body is safe now.", pause: 12 },
          { text: "My body is safe now.", pause: 14 },
        ],
      },
      { name: "Emerge", steps: EMERGE.slice(0, 5) },
    ],
  },

  {
    slug: "releasing-the-old-pattern",
    title: "Releasing the old pattern",
    subtitle: "A guided reconsolidation session for the belief that keeps returning",
    intention:
      "The full protocol in a spoken form. Bring the old state forward, bring the new state forward, hold both, let the brain update. Do this for the pattern that has returned the most.",
    durationMinutes: 25,
    beatFrequency: 6,
    stages: [
      { name: "Settle", steps: SETTLE },
      { name: "Descent", steps: DESCENT },
      {
        name: "Bring the old state forward",
        steps: [
          { text: "In this room, very gently, bring to mind the pattern you are here to change.", pause: 10 },
          { text: "Do not tell the story. Feel the body state it lives in.", pause: 10 },
          { text: "Where in your body does the old pattern live? Chest. Throat. Belly. Shoulders.", pause: 10 },
          { text: "Let that sensation become slightly more present.", pause: 10 },
          { text: "Notice the quality of it. Tight. Hollow. Heavy. Numb.", pause: 12 },
          { text: "You are not going to change it yet. You are letting it be seen.", pause: 14 },
        ],
      },
      {
        name: "Bring the new state forward",
        steps: [
          { text: "Now, in the same body, invite the version of you who has lived on the other side of this pattern.", pause: 10 },
          { text: "She is already here. She has always been here.", pause: 8 },
          { text: "Feel the way her chest holds when the old pattern is not running her.", pause: 12 },
          { text: "Feel the softness in her jaw. The rest in her shoulders.", pause: 12 },
          { text: "Let both the old state and the new state be in the same body at the same time.", pause: 12 },
          { text: "Do not make them fight. Just let them both be present.", pause: 14 },
        ],
      },
      {
        name: "The hold",
        steps: [
          { text: "This is the window. Stay with both. Three minutes. I will be quiet.", pause: 45 },
          { text: "Keep breathing. Both states held. Nothing to force.", pause: 45 },
          { text: "Your brain is noticing that these two can coexist.", pause: 45 },
          { text: "That coexistence is the update. The old belief is being rewritten in real time.", pause: 30 },
        ],
      },
      {
        name: "Integration",
        steps: [
          { text: "Now let the old state dissolve gently. It does not need to be pushed away.", pause: 10 },
          { text: "It has already been held and seen.", pause: 8 },
          { text: "Let the new state fill the space where it was.", pause: 12 },
          { text: "This is the state you will return to every morning.", pause: 10 },
          { text: "Take one deep breath and thank the part of you that let this happen.", pause: 12 },
        ],
      },
      { name: "Emerge", steps: EMERGE },
    ],
  },

  {
    slug: "heart-coherence-descent",
    title: "Heart coherence descent",
    subtitle: "Fifteen minutes of heart-centered breath to bring the field into alignment",
    intention:
      "Use this before any installation work. A coherent heart field is the physiological condition every other practice in the framework requires.",
    durationMinutes: 15,
    beatFrequency: 6,
    stages: [
      { name: "Settle", steps: SETTLE.slice(0, 6) },
      {
        name: "Descend into the heart",
        steps: [
          { text: "Bring your attention to the center of your chest.", pause: 8 },
          { text: "Place one hand there if you have not already.", pause: 6 },
          { text: "Now imagine you are breathing in and out through this spot.", pause: 10 },
          { text: "Not through your nose. Through your heart.", pause: 10 },
          { text: "Five seconds in, five seconds out. Let me pace you.", pause: 5 },
          { text: "In.", pause: 5 },
          { text: "Out.", pause: 5 },
          { text: "In.", pause: 5 },
          { text: "Out.", pause: 5 },
          { text: "Keep this rhythm. I will be quiet while you find it.", pause: 30 },
        ],
      },
      {
        name: "Coherence",
        steps: [
          { text: "Now, while you breathe, bring up a specific, real memory of appreciation.", pause: 10 },
          { text: "A moment when you felt genuinely held. A person. A place. A creature.", pause: 10 },
          { text: "Do not make one up. Use one you actually remember.", pause: 10 },
          { text: "Let the felt sense of that memory live in your chest as you breathe.", pause: 14 },
          { text: "Your heart field is changing shape right now. This is not metaphor.", pause: 12 },
          { text: "You are now broadcasting coherence. The body trusts the room.", pause: 14 },
          { text: "Stay in this state. Breathing. Feeling. Being measured.", pause: 30 },
        ],
      },
      { name: "Emerge", steps: EMERGE.slice(0, 5) },
    ],
  },

  {
    slug: "meeting-your-younger-self",
    title: "Meeting your younger self",
    subtitle: "A twenty-minute parts work meditation for the child who wrote the code",
    intention:
      "The program that is running inside you was written by a smaller version of you who was trying to survive. This meditation is the meeting that child has been waiting for.",
    durationMinutes: 20,
    beatFrequency: 5,
    stages: [
      { name: "Settle", steps: SETTLE },
      { name: "Descent", steps: DESCENT },
      {
        name: "The meeting",
        steps: [
          { text: "I want you to picture a safe room. Any room. Any time. Your choosing.", pause: 10 },
          { text: "The light is soft. There is a seat for you, and a seat across from you.", pause: 10 },
          { text: "In a moment, a younger version of you is going to come into this room.", pause: 10 },
          { text: "The version who first learned the pattern you are now rewriting.", pause: 12 },
          { text: "When you are ready, let her come in.", pause: 14 },
          { text: "Notice how old she is. What she is wearing. What her eyes are doing.", pause: 14 },
          { text: "Do not rush her. Let her come at her own pace.", pause: 12 },
        ],
      },
      {
        name: "The conversation",
        steps: [
          { text: "Ask her, inside your heart, very gently: what are you protecting?", pause: 12 },
          { text: "Wait. She will answer. In an image, a sentence, a felt sense.", pause: 18 },
          { text: "Thank her for what she told you.", pause: 10 },
          { text: "Ask her: what do you need from me, so you can rest?", pause: 12 },
          { text: "Wait. Listen.", pause: 16 },
          { text: "Whatever she asks for, offer it to her in this moment.", pause: 14 },
          { text: "Tell her, in your own voice, that you are here now. That she does not have to run the show anymore.", pause: 14 },
          { text: "That she can be a child. You will be the adult.", pause: 12 },
        ],
      },
      {
        name: "Integration",
        steps: [
          { text: "Let her climb into your lap if she wants to, or sit beside you. Or stay where she is.", pause: 12 },
          { text: "Whatever she chooses is right.", pause: 10 },
          { text: "Sit with her in silence for a moment. The relationship is the work.", pause: 20 },
        ],
      },
      { name: "Emerge", steps: EMERGE },
    ],
  },

  {
    slug: "morning-activation",
    title: "Morning activation",
    subtitle: "A nine-minute practice for the first twenty minutes of your day",
    intention:
      "Use this every morning. Before your feet touch the floor. Before the phone. The day you enter as her is not the same day as the day you enter as the old version.",
    durationMinutes: 9,
    beatFrequency: 7,
    stages: [
      {
        name: "Arrival",
        steps: [
          { text: "Good morning. Your eyes can stay closed.", pause: 5 },
          { text: "Before your feet touch the floor. Before the phone. Before the list.", pause: 8 },
          { text: "Feel your body, held by the bed. Held by the room. Held.", pause: 10 },
          { text: "Take a slow breath in. Hold it for a beat. And let it out, longer.", pause: 10 },
        ],
      },
      {
        name: "Install",
        steps: [
          { text: "Bring her forward. The one you are becoming. The one you are.", pause: 8 },
          { text: "Feel her body today. Her breath. Her ease.", pause: 10 },
          { text: "Ask yourself, in present tense: who am I collapsing into today?", pause: 12 },
          { text: "Let one sentence come. In her voice. Inside your chest.", pause: 14 },
          { text: "Whatever came, say it out loud, quietly, inside your body.", pause: 10 },
          { text: "Again. This is the state you are choosing to enter the day in.", pause: 14 },
        ],
      },
      {
        name: "Emerge",
        steps: [
          { text: "When you open your eyes, you are already her.", pause: 6 },
          { text: "There is nothing to earn. Nothing to prove. Just live the day as her.", pause: 8 },
          { text: "Take one more breath. And when you are ready, open your eyes.", pause: 6 },
        ],
      },
    ],
  },

  {
    slug: "hypnagogic-install",
    title: "Sleep threshold install",
    subtitle: "A ten-minute practice for the window just before sleep",
    intention:
      "The three to five minutes before sleep are the most open doorway to your subconscious. Use this meditation as the last thing your mind touches. Your brain takes whatever you hand it here.",
    durationMinutes: 10,
    beatFrequency: 4,
    stages: [
      {
        name: "Settle into sleep",
        steps: [
          { text: "Lie back. Let the bed hold all of your weight.", pause: 8 },
          { text: "Your eyes are closed. You are not trying to fall asleep. You are not trying to stay awake. You are in between.", pause: 12 },
          { text: "Long breath in. Longer breath out.", pause: 8 },
          { text: "Again. In. Out, longer.", pause: 10 },
          { text: "Let the body become heavier. Let the room become further away.", pause: 12 },
        ],
      },
      {
        name: "The install",
        steps: [
          { text: "Here, at the threshold, I want you to hold one sentence in your body. Not in your mind. In your body.", pause: 12 },
          { text: "The sentence is: I am already her. Let it settle in your chest.", pause: 14 },
          { text: "I am already her.", pause: 14 },
          { text: "I am already her.", pause: 16 },
          { text: "Let the sentence be the last thing your mind touches as you drift.", pause: 20 },
          { text: "Your subconscious is taking this in now. You do not have to do anything else.", pause: 20 },
          { text: "I will get quiet now. Let the practice become sleep.", pause: 30 },
        ],
      },
    ],
  },

  {
    slug: "root-belief-update",
    title: "Root belief update",
    subtitle: "An eighteen-minute practice for locating and rewriting the sentence running you",
    intention:
      "This is the meditation version of the somatic root find plus reconsolidation. When you need the actual sentence the body is operating as if it were true, and then the rewrite.",
    durationMinutes: 18,
    beatFrequency: 5,
    stages: [
      { name: "Settle", steps: SETTLE },
      { name: "Descent", steps: DESCENT },
      {
        name: "Locate the sentence",
        steps: [
          { text: "Bring to mind the pattern that returns the most.", pause: 10 },
          { text: "Feel it in your body. Do not analyze. Feel.", pause: 12 },
          { text: "Now ask, inside your chest: what would have to be true for this pattern to make complete sense?", pause: 14 },
          { text: "Wait. The answer will come as a sentence, an image, or a felt knowing.", pause: 18 },
          { text: "Whatever comes, do not edit it. Let it be what it is.", pause: 14 },
          { text: "This is the sentence that has been running you.", pause: 10 },
        ],
      },
      {
        name: "The update",
        steps: [
          { text: "You are going to write the new sentence now. Inside your body.", pause: 8 },
          { text: "Not the opposite. Not an affirmation. The true one.", pause: 10 },
          { text: "The sentence the version of you without fear would say is true.", pause: 12 },
          { text: "Listen for it. Let it come.", pause: 18 },
          { text: "Hold the old sentence and the new sentence in the same body at the same time.", pause: 14 },
          { text: "Do not push the old one away. Let them both exist.", pause: 16 },
          { text: "The brain is noticing the coexistence. The old sentence is being updated right now.", pause: 20 },
        ],
      },
      { name: "Emerge", steps: EMERGE },
    ],
  },

  {
    slug: "quantum-collapse-into-her",
    title: "Quantum collapse into her",
    subtitle: "A sixteen-minute practice that uses the physics layer of the framework",
    intention:
      "The observer decides which version of the field resolves. Use this practice when you need to remember that your state is upstream of your outcome, not downstream of it.",
    durationMinutes: 16,
    beatFrequency: 7,
    stages: [
      { name: "Settle", steps: SETTLE.slice(0, 6) },
      { name: "Descent", steps: DESCENT.slice(0, 4) },
      {
        name: "The collapse",
        steps: [
          { text: "I want you to imagine, very softly, that every version of your life exists right now as possibility.", pause: 12 },
          { text: "Every version. The one you are living, and every other.", pause: 10 },
          { text: "You are the observer. Your state decides which one resolves.", pause: 12 },
          { text: "Not your thoughts. Your state.", pause: 8 },
          { text: "Bring the state of the version of you whose life is already the one you want.", pause: 12 },
          { text: "How does her body hold this moment? How does her breath sound?", pause: 14 },
          { text: "Feel her certainty that the thing is already arranged.", pause: 12 },
          { text: "The field is listening to the state you are actually in.", pause: 12 },
          { text: "Stay here. You are being measured.", pause: 20 },
        ],
      },
      { name: "Emerge", steps: EMERGE.slice(0, 5) },
    ],
  },

  {
    slug: "return-from-decoherence",
    title: "The return from decoherence",
    subtitle: "An eight-minute practice for the moment the old version pulled you back",
    intention:
      "When you notice you have drifted into the old state. Not a punishment. A return. Run this meditation the moment you notice, and the return is the practice.",
    durationMinutes: 8,
    beatFrequency: 6,
    stages: [
      {
        name: "Meet yourself",
        steps: [
          { text: "You noticed. That is the first thing. The noticing is already the return.", pause: 8 },
          { text: "Hand on your heart. Three slow breaths.", pause: 10 },
          { text: "Nothing went wrong. The old pattern visited. That is what old patterns do.", pause: 10 },
          { text: "You are not starting over. You are already back.", pause: 10 },
        ],
      },
      {
        name: "Reset",
        steps: [
          { text: "Feel the exhale leave your body. All the way out. Longer than you think.", pause: 10 },
          { text: "Again. In slowly. Out slowly.", pause: 10 },
          { text: "Now bring the state of the version of you you have been installing.", pause: 10 },
          { text: "Not the idea of her. The felt sense. How her body holds itself.", pause: 12 },
          { text: "Let her come back into your chest.", pause: 10 },
          { text: "The return is the practice. Welcome back.", pause: 10 },
        ],
      },
    ],
  },
];

export function findMeditation(slug: string): Meditation | null {
  return MEDITATIONS.find((m) => m.slug === slug) ?? null;
}
