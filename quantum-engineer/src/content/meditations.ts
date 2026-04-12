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
  // ======================================================================
  // SOS — 3-minute emergency regulation. The first meditation in the
  // library and the one accessible from the dashboard SOS button.
  // ======================================================================
  {
    slug: "sos-come-back",
    title: "SOS — come back to yourself in three minutes",
    subtitle:
      "An emergency regulation practice for the moment you are activated and need to come down right now",
    intention:
      "This is the one you use when your nervous system has spiked and you cannot think clearly. Three minutes. No build-up. Immediate regulation. Do it standing, sitting, lying down, in a car, in a bathroom stall. Anywhere. Right now.",
    durationMinutes: 3,
    beatFrequency: 6,
    stages: [
      {
        name: "Right now",
        steps: [
          { text: "Stop. You are here. You are listening.", pause: 3 },
          { text: "Put one hand on the center of your chest.", pause: 4 },
          { text: "Breathe in through your nose for four seconds.", pause: 4 },
          { text: "Hold for one second.", pause: 1 },
          { text: "Breathe out through your mouth for eight seconds. Slow.", pause: 8 },
          { text: "Again. In for four.", pause: 4 },
          { text: "Hold.", pause: 1 },
          { text: "Out for eight. All the way out.", pause: 8 },
          { text: "One more. In.", pause: 4 },
          { text: "Out. Let everything drop one level.", pause: 8 },
          { text: "Now look at something in the room. Anything. Name it silently.", pause: 5 },
          { text: "Look at something else. Name it.", pause: 5 },
          { text: "One more thing. Name it.", pause: 5 },
          { text: "Name one thing that is true and safe right now. Specific. Not general.", pause: 6 },
          { text: "You are here. The scan can stop. You came back.", pause: 6 },
          { text: "When you are ready, continue your day. You do not have to earn your way back. You just came back.", pause: 4 },
        ],
      },
    ],
  },

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

  // ======================================================================
  // YOGA NIDRA — the oldest systematic guided meditation tradition.
  // 45 minutes. 61-point body rotation of consciousness, sankalpa
  // intention, opposites, visualization, integration.
  // ======================================================================
  {
    slug: "yoga-nidra-coming-home",
    title: "Yoga Nidra — the sleep of the yogi",
    subtitle:
      "A 45-minute Yoga Nidra with sankalpa, 61-point rotation of consciousness, opposites, and visualization",
    intention:
      "The oldest guided meditation tradition on earth, adapted for the framework. You lie down. You do nothing. Adelaide's voice walks you through the full sequence, and by the end the body has dropped below alpha into genuine theta. This is the single most restorative meditation in the library.",
    durationMinutes: 45,
    beatFrequency: 5,
    stages: [
      {
        name: "Preparation",
        steps: [
          { text: "Lie down on your back. Let your legs be a comfortable distance apart. Palms facing up.", pause: 10 },
          { text: "Let your body settle into whatever is holding you.", pause: 10 },
          { text: "This is Yoga Nidra — the sleep of the yogi. You will stay just barely awake. Not sleeping. Not fully awake. In between.", pause: 10 },
          { text: "If you fall asleep, that is also allowed. The practice still does its work.", pause: 10 },
          { text: "Take one full breath in. Hold it at the top for a beat. And let it out slowly through the mouth.", pause: 10 },
          { text: "Again. In. Hold. Out.", pause: 10 },
          { text: "And now let the breath find its own pace. You are no longer directing it.", pause: 15 },
        ],
      },
      {
        name: "Sankalpa",
        steps: [
          { text: "Now I want you to find your sankalpa.", pause: 6 },
          { text: "Your sankalpa is a short sentence in present tense that speaks to who you are underneath all the doing.", pause: 10 },
          { text: "Not a goal. Not a wish. A truth. The one you would say if fear were not in the room.", pause: 12 },
          { text: "Let it come. It may be words. It may be a feeling. Do not force it.", pause: 14 },
          { text: "When the sentence arrives, silently repeat it three times inside your body. Not your head. Your body.", pause: 20 },
          { text: "Hold it. Let the body remember it. You will return to it at the end.", pause: 14 },
        ],
      },
      {
        name: "Rotation of consciousness",
        steps: [
          { text: "Now we begin the rotation of consciousness. I will name a point on your body and you simply place your awareness there. Feel that point. No need to move anything.", pause: 8 },
          { text: "Forehead.", pause: 2 },
          { text: "Right eye.", pause: 2 },
          { text: "Left eye.", pause: 2 },
          { text: "Right ear.", pause: 2 },
          { text: "Left ear.", pause: 2 },
          { text: "Tip of the nose.", pause: 2 },
          { text: "Chin.", pause: 2 },
          { text: "Right shoulder.", pause: 2 },
          { text: "Right elbow.", pause: 2 },
          { text: "Right wrist.", pause: 2 },
          { text: "Tip of the right thumb.", pause: 2 },
          { text: "Second finger.", pause: 2 },
          { text: "Third finger.", pause: 2 },
          { text: "Fourth finger.", pause: 2 },
          { text: "Fifth finger.", pause: 2 },
          { text: "Right wrist.", pause: 2 },
          { text: "Right elbow.", pause: 2 },
          { text: "Right shoulder.", pause: 2 },
          { text: "Center of the chest.", pause: 3 },
          { text: "Left shoulder.", pause: 2 },
          { text: "Left elbow.", pause: 2 },
          { text: "Left wrist.", pause: 2 },
          { text: "Left thumb.", pause: 2 },
          { text: "Second finger.", pause: 2 },
          { text: "Third finger.", pause: 2 },
          { text: "Fourth finger.", pause: 2 },
          { text: "Fifth finger.", pause: 2 },
          { text: "Left wrist.", pause: 2 },
          { text: "Left elbow.", pause: 2 },
          { text: "Left shoulder.", pause: 2 },
          { text: "Throat.", pause: 3 },
          { text: "Right side of the chest.", pause: 3 },
          { text: "Center of the chest.", pause: 3 },
          { text: "Left side of the chest.", pause: 3 },
          { text: "Navel.", pause: 3 },
          { text: "Lower abdomen.", pause: 3 },
          { text: "Right hip.", pause: 2 },
          { text: "Right knee.", pause: 2 },
          { text: "Right ankle.", pause: 2 },
          { text: "Right big toe.", pause: 2 },
          { text: "Second toe.", pause: 2 },
          { text: "Third.", pause: 2 },
          { text: "Fourth.", pause: 2 },
          { text: "Fifth toe.", pause: 2 },
          { text: "Right ankle.", pause: 2 },
          { text: "Right knee.", pause: 2 },
          { text: "Right hip.", pause: 2 },
          { text: "Left hip.", pause: 2 },
          { text: "Left knee.", pause: 2 },
          { text: "Left ankle.", pause: 2 },
          { text: "Left big toe.", pause: 2 },
          { text: "Second.", pause: 2 },
          { text: "Third.", pause: 2 },
          { text: "Fourth.", pause: 2 },
          { text: "Fifth toe.", pause: 2 },
          { text: "Left ankle.", pause: 2 },
          { text: "Left knee.", pause: 2 },
          { text: "Left hip.", pause: 3 },
          { text: "The whole front of the body.", pause: 5 },
          { text: "The whole back of the body.", pause: 5 },
          { text: "The whole body. Head to toe.", pause: 14 },
        ],
      },
      {
        name: "Breath awareness",
        steps: [
          { text: "Now bring your attention to the breath.", pause: 6 },
          { text: "You are not changing it. You are watching it.", pause: 8 },
          { text: "Count each out-breath silently. Ten, nine, eight, seven.", pause: 10 },
          { text: "Six, five, four, three.", pause: 8 },
          { text: "Two, one, and then start again at ten.", pause: 15 },
          { text: "If you lose count, begin again. No correction. Just the return.", pause: 20 },
        ],
      },
      {
        name: "Opposites",
        steps: [
          { text: "Now I will name pairs of sensations. Feel each one briefly, then let it go.", pause: 6 },
          { text: "Heaviness. Feel your whole body heavy.", pause: 10 },
          { text: "Lightness. Feel your body light. Weightless.", pause: 10 },
          { text: "Heaviness again. Just for a breath.", pause: 8 },
          { text: "Lightness. The lightness of being held.", pause: 10 },
          { text: "Warmth. A slow warmth through your chest.", pause: 10 },
          { text: "Coolness. A cool touch across your forehead.", pause: 10 },
          { text: "Joy. Remember a moment of real joy. Let it be in your body.", pause: 14 },
          { text: "Sadness. Remember a moment of real sadness. Let it pass through.", pause: 14 },
          { text: "Now both. Joy and sadness at once. Let them coexist.", pause: 14 },
        ],
      },
      {
        name: "Visualization",
        steps: [
          { text: "Now picture a deep blue sky.", pause: 8 },
          { text: "You are looking up at it from a place where nothing is asked of you.", pause: 10 },
          { text: "A full moon is rising in the blue.", pause: 10 },
          { text: "The moon has been there your whole life.", pause: 10 },
          { text: "The moon knows who you are without the fear.", pause: 12 },
          { text: "Feel her gaze, held on you, without judgment.", pause: 14 },
          { text: "The moon is the witness you have always been looking for. And she has always been there.", pause: 16 },
        ],
      },
      {
        name: "Return to sankalpa",
        steps: [
          { text: "Now bring back your sankalpa. The sentence you held at the beginning.", pause: 10 },
          { text: "Repeat it silently three more times. Inside your body.", pause: 18 },
          { text: "The body remembers it now. The subconscious has taken it in. It is installed.", pause: 12 },
        ],
      },
      {
        name: "Externalization",
        steps: [
          { text: "Begin to bring awareness back to the room.", pause: 8 },
          { text: "Feel the surface under your body.", pause: 8 },
          { text: "The sounds of the room around you.", pause: 8 },
          { text: "Very gently, begin to move your fingers and your toes.", pause: 10 },
          { text: "A deeper breath.", pause: 6 },
          { text: "Stretch if your body asks for it.", pause: 8 },
          { text: "When you are ready, roll onto your right side and rest there for a breath or two.", pause: 10 },
          { text: "And slowly, when you are ready, open your eyes. You have come back from deep rest. Welcome home.", pause: 6 },
        ],
      },
    ],
  },

  // ======================================================================
  // NSDR — Non-Sleep Deep Rest. Andrew Huberman's evidence-based protocol.
  // 20 minutes. Postural reset, longer exhales, precise body scan,
  // stillness with awareness, return with intention.
  // ======================================================================
  {
    slug: "nsdr-huberman-protocol",
    title: "NSDR — Non-Sleep Deep Rest",
    subtitle:
      "A 20-minute evidence-based protocol for dopamine replenishment, nervous system reset, and accelerated learning",
    intention:
      "The modern science-backed version of yoga nidra. Use this after any hard mental work, between lessons, or any time your nervous system needs a reset. Peer-reviewed research shows NSDR replenishes dopamine and consolidates learning in a way ordinary rest does not. Twenty minutes buys you the equivalent of a much longer nap without the grogginess.",
    durationMinutes: 20,
    beatFrequency: 5,
    stages: [
      {
        name: "Arrival",
        steps: [
          { text: "Lie down on your back, or sit upright if you prefer. Either works.", pause: 6 },
          { text: "Let your eyes close.", pause: 4 },
          { text: "Notice that you have decided to do this. That one decision is enough. Nothing else is required.", pause: 10 },
          { text: "Let your body settle against whatever is holding you.", pause: 10 },
        ],
      },
      {
        name: "Breath reset",
        steps: [
          { text: "Take a deep breath in through your nose.", pause: 4 },
          { text: "And a much longer breath out through your mouth. Longer than you think.", pause: 8 },
          { text: "Again. In.", pause: 4 },
          { text: "And out. Much longer.", pause: 8 },
          { text: "The long exhale is the single fastest way to slow your heart rate. Your nervous system is downshifting as we speak.", pause: 10 },
          { text: "One more. In through the nose. And a long slow exhale through the mouth.", pause: 12 },
          { text: "Now let the breath go back to whatever it wants to do. You are no longer controlling it.", pause: 10 },
        ],
      },
      {
        name: "Precise body scan",
        steps: [
          { text: "Bring your attention to the top of your head.", pause: 8 },
          { text: "Feel any sensation there. A tingle. A temperature. A nothing. Whatever is there.", pause: 10 },
          { text: "Now move your attention slowly down to your forehead. Feel it.", pause: 10 },
          { text: "Your eyes, resting behind their lids.", pause: 10 },
          { text: "Your jaw, which is softer than it usually is.", pause: 10 },
          { text: "Your throat.", pause: 10 },
          { text: "Your shoulders. Feel them drop one more notch.", pause: 12 },
          { text: "Your chest. The breath moving in and out, unhurried.", pause: 12 },
          { text: "Your arms, all the way down to your fingertips.", pause: 12 },
          { text: "Your belly. Let it be soft.", pause: 12 },
          { text: "Your hips and lower back.", pause: 10 },
          { text: "Your thighs.", pause: 10 },
          { text: "Your knees.", pause: 8 },
          { text: "Your calves.", pause: 8 },
          { text: "Your ankles and feet.", pause: 10 },
          { text: "The whole body. One single field of sensation.", pause: 14 },
        ],
      },
      {
        name: "Stillness with awareness",
        steps: [
          { text: "Now simply stay here. You are not asleep. You are not trying to do anything. You are aware, and you are still.", pause: 20 },
          { text: "Thoughts may arrive. Let them pass through like weather.", pause: 20 },
          { text: "The body is doing all the work for you. Dopamine is replenishing. The nervous system is resetting. You do not need to help.", pause: 25 },
          { text: "Stay here.", pause: 30 },
          { text: "A little longer.", pause: 25 },
        ],
      },
      {
        name: "Return",
        steps: [
          { text: "Begin to bring awareness back to the room.", pause: 6 },
          { text: "Feel your hands and your feet.", pause: 6 },
          { text: "Take a slightly deeper breath.", pause: 5 },
          { text: "As you come back, set one gentle intention for the next hour of your life. Just one.", pause: 12 },
          { text: "When you are ready, open your eyes. You have just given your nervous system a full reset. Move slowly into the next thing.", pause: 6 },
        ],
      },
    ],
  },

  // ======================================================================
  // BLESSING OF THE ENERGY CENTERS — Joe Dispenza style.
  // 35 minutes. Seven energy centers held in awareness for ~4 minutes
  // each, each one named and blessed. The most-reported breakthrough
  // practice in the consciousness-engineering space.
  // ======================================================================
  {
    slug: "blessing-of-the-energy-centers",
    title: "Blessing of the Energy Centers",
    subtitle:
      "A 35-minute practice that holds each of the seven centers in awareness and blesses them open, one at a time",
    intention:
      "This is the practice that produces the most reported breakthroughs in the consciousness space. Seven energy centers, each held in focused awareness for several minutes with a specific intention. Do not analyse. Do not try. Let each center receive attention the way a plant receives sunlight. The centers respond to being seen.",
    durationMinutes: 35,
    beatFrequency: 6,
    stages: [
      {
        name: "Settle",
        steps: [
          { text: "Sit upright, spine long. Or lie down — either works.", pause: 8 },
          { text: "Let your eyes close.", pause: 6 },
          { text: "Take one slow breath in, and a longer breath out.", pause: 10 },
          { text: "Again. In. Out, longer.", pause: 10 },
          { text: "Let your body drop one level deeper.", pause: 12 },
          { text: "We are going to bring attention to each of your seven energy centers, one at a time. Each one receives your full awareness for a few minutes. Nothing to do. Just be there.", pause: 12 },
        ],
      },
      {
        name: "The root center",
        steps: [
          { text: "Bring your attention to the base of your spine. The root.", pause: 8 },
          { text: "This is the centre of your safety, your groundedness, your belonging.", pause: 10 },
          { text: "Feel it. Let your awareness rest there like a hand on a warm stone.", pause: 14 },
          { text: "As you hold it, let a quiet blessing go to this place: I am safe. I belong here. I have a right to take up space.", pause: 16 },
          { text: "Stay with the root. Let it receive the attention.", pause: 30 },
          { text: "Feel the body respond to being seen at this layer.", pause: 30 },
          { text: "A little longer. The root is opening.", pause: 25 },
        ],
      },
      {
        name: "The sacral center",
        steps: [
          { text: "Now move your awareness up to the sacral center, just below the navel.", pause: 10 },
          { text: "This is the centre of creativity, pleasure, and your felt relationship with what is alive.", pause: 12 },
          { text: "Let your attention rest here.", pause: 14 },
          { text: "Bless this place: I am allowed to want. I am allowed to create. I am allowed to feel pleasure without earning it.", pause: 16 },
          { text: "Stay. Hold it without doing anything. The center responds to being held.", pause: 30 },
          { text: "A little longer.", pause: 25 },
        ],
      },
      {
        name: "The solar plexus",
        steps: [
          { text: "Move your awareness up to the solar plexus. Just below your ribs.", pause: 10 },
          { text: "This is the centre of your will, your fire, your capacity to choose.", pause: 12 },
          { text: "Let your awareness settle there.", pause: 12 },
          { text: "Bless it: My will is mine. I choose what I give my energy to. I am allowed to say no.", pause: 16 },
          { text: "Hold it. Nothing else.", pause: 30 },
          { text: "A little longer. Feel it warm.", pause: 25 },
        ],
      },
      {
        name: "The heart center",
        steps: [
          { text: "Now the heart. Place a hand on the center of your chest if it helps.", pause: 10 },
          { text: "This is the centre where everything meets. The bridge between the lower and upper. The seat of who you are.", pause: 14 },
          { text: "Let your attention rest here. No strain. No agenda.", pause: 14 },
          { text: "Bless it: I am loved. I am already loved. I do not have to earn this.", pause: 16 },
          { text: "Stay. The heart opens slower than the other centers. Give it time.", pause: 35 },
          { text: "Longer. Let the chest soften.", pause: 30 },
        ],
      },
      {
        name: "The throat center",
        steps: [
          { text: "Move up to the throat.", pause: 10 },
          { text: "The centre of your truth. Your voice. What you are allowed to say.", pause: 12 },
          { text: "Let your attention rest there.", pause: 12 },
          { text: "Bless it: My voice is mine. I am allowed to say what is true even when it is inconvenient.", pause: 16 },
          { text: "Stay. The throat holds a lot. Let it be held back.", pause: 30 },
          { text: "A little longer.", pause: 25 },
        ],
      },
      {
        name: "The third eye",
        steps: [
          { text: "Move up to the space between your eyebrows. The third eye.", pause: 10 },
          { text: "This is the centre of your knowing. Intuition. What you already see before you can prove it.", pause: 12 },
          { text: "Let your awareness rest there.", pause: 14 },
          { text: "Bless it: I trust what I already know. I do not need external permission to know it.", pause: 16 },
          { text: "Stay. Feel it soften and open.", pause: 30 },
          { text: "Longer.", pause: 25 },
        ],
      },
      {
        name: "The crown",
        steps: [
          { text: "Finally, move to the crown of your head.", pause: 10 },
          { text: "The centre of your connection to the larger field you are part of.", pause: 12 },
          { text: "Feel the top of your head as if it were slightly open.", pause: 14 },
          { text: "Bless it: I am part of something larger. I do not have to hold it all alone.", pause: 16 },
          { text: "Let the crown be held by the field. Let the field be held by the crown.", pause: 30 },
          { text: "A little longer. The whole system is open now.", pause: 30 },
        ],
      },
      {
        name: "Integration",
        steps: [
          { text: "Now feel all seven centers at once. Root to crown. A single column of awareness.", pause: 20 },
          { text: "The whole system has been seen. It is all still here. Held.", pause: 20 },
          { text: "Stay as long as the body wants.", pause: 30 },
        ],
      },
      { name: "Emerge", steps: EMERGE },
    ],
  },

  // ======================================================================
  // SOMATIC EXPERIENCING PENDULATION — Peter Levine's trauma work.
  // 20 minutes. Alternating between felt activation and felt safety
  // so the nervous system learns it can leave threat state and return.
  // ======================================================================
  {
    slug: "somatic-pendulation",
    title: "Pendulation — the nervous system returning to itself",
    subtitle:
      "A 20-minute Somatic Experiencing practice. Alternating between the felt sense of activation and the felt sense of resource so the body learns the return",
    intention:
      "Peter Levine's Somatic Experiencing approach rests on one insight: trauma is not in the event, it is in the nervous system's inability to discharge the activation. Pendulation teaches the body that it can move between activation and safety without getting stuck. This meditation walks you through the pendulation slowly, so the nervous system learns the path.",
    durationMinutes: 20,
    beatFrequency: 6,
    stages: [
      { name: "Settle", steps: SETTLE.slice(0, 7) },
      {
        name: "Locate the activation",
        steps: [
          { text: "Bring to mind a situation from your life where your body is activated. Not the worst one. A medium one. A recurring tightness you know well.", pause: 12 },
          { text: "Feel it in your body. Where does the activation live?", pause: 12 },
          { text: "It might be a clenching, a bracing, a shallow breath, a held shoulder. Notice the exact location.", pause: 14 },
          { text: "Just five percent of the activation. Not the whole thing. Five percent is enough.", pause: 14 },
          { text: "Stay with the edge of it, not the centre. Watch it the way you would watch weather.", pause: 18 },
        ],
      },
      {
        name: "Locate the resource",
        steps: [
          { text: "Now gently move your attention to a different part of your body. A place that feels neutral or good.", pause: 12 },
          { text: "Maybe your feet on the floor. Maybe the warmth behind your knees. Maybe your hand on your chest.", pause: 14 },
          { text: "Find the part that is safe. That is your resource.", pause: 14 },
          { text: "Rest your awareness there. Let it expand a little.", pause: 18 },
        ],
      },
      {
        name: "Pendulation",
        steps: [
          { text: "Now gently bring your attention back to the edge of the activation. Just the edge.", pause: 14 },
          { text: "And now back to the resource. Feel the safe place again.", pause: 14 },
          { text: "Activation.", pause: 14 },
          { text: "Resource.", pause: 14 },
          { text: "Activation.", pause: 14 },
          { text: "Resource. Let it be a slow swing between them.", pause: 18 },
          { text: "Notice what happens in the activation as you keep returning to the resource.", pause: 18 },
          { text: "The body is learning it can leave and come back. This is the practice.", pause: 20 },
          { text: "Keep swinging at your own pace. I will be quiet for a moment.", pause: 40 },
          { text: "One more round. Activation. Resource. Activation. Resource.", pause: 20 },
        ],
      },
      {
        name: "Settle into the new default",
        steps: [
          { text: "Now rest in the resource. Let the activation go wherever it goes.", pause: 14 },
          { text: "Your nervous system has just practiced something it did not know it could do. Let that land.", pause: 18 },
          { text: "This is the return. This is the whole practice.", pause: 20 },
        ],
      },
      { name: "Emerge", steps: EMERGE.slice(0, 5) },
    ],
  },

  // ======================================================================
  // LONG-FORM FIELD COLLAPSE — 60-minute Dispenza-style retreat practice.
  // The longest and deepest meditation in the library. For serious days.
  // Settle, body scan, heart coherence, identity install, 20+ minutes
  // of held-state observation, integration.
  // ======================================================================
  {
    slug: "long-form-field-collapse",
    title: "The long-form field collapse",
    subtitle:
      "A 60-minute practice for the days you need to drop all the way down. Built on the same sequence Dispenza's retreat students use",
    intention:
      "This is the deepest meditation in the library. Sixty minutes. Do not do it on a stolen fifteen-minute break. Do it on a quiet morning when nothing else is asked of you. The practice holds you through the full arc — settle, body scan, heart coherence, identity install, and twenty minutes of held-state field observation. The held state is where the real collapse happens.",
    durationMinutes: 60,
    beatFrequency: 5,
    stages: [
      {
        name: "Long settle",
        steps: [
          { text: "Sit or lie down. Let your body find its quiet shape.", pause: 10 },
          { text: "Close your eyes. The next hour is yours.", pause: 10 },
          { text: "There is nothing on the other side of this that needs your attention more than this does.", pause: 12 },
          { text: "Let that land. Nothing else is pulling at you.", pause: 14 },
          { text: "Take one breath in, slow. And a much longer breath out.", pause: 12 },
          { text: "Again. In.", pause: 8 },
          { text: "Out, longer.", pause: 12 },
          { text: "Once more. In.", pause: 8 },
          { text: "Out. All the way out.", pause: 14 },
          { text: "Let the breath become its own. I am going to be quiet for a while. Just stay.", pause: 40 },
        ],
      },
      {
        name: "Body scan",
        steps: [
          { text: "Bring your awareness to the top of your head.", pause: 10 },
          { text: "Notice it. No change required.", pause: 10 },
          { text: "Slowly, move the attention down to your forehead. Your eyes behind their lids. Your jaw unclenched. Your throat.", pause: 20 },
          { text: "Your shoulders. Your chest. Your arms all the way to your fingertips.", pause: 20 },
          { text: "Your belly, soft. Your lower back. Your hips.", pause: 20 },
          { text: "Your thighs. Your knees. Your calves. Your ankles. Your feet.", pause: 20 },
          { text: "The whole body. Held as one single field of sensation.", pause: 25 },
          { text: "Stay in the whole body for a moment longer. No part pulled at. No part excluded.", pause: 30 },
        ],
      },
      {
        name: "Heart coherence",
        steps: [
          { text: "Now place your attention at the center of your chest.", pause: 10 },
          { text: "Breathe in and out as if the breath were moving through the heart.", pause: 14 },
          { text: "Five seconds in, five seconds out. Let me pace you for a few rounds, then I will step back.", pause: 10 },
          { text: "In.", pause: 5 },
          { text: "Out.", pause: 5 },
          { text: "In.", pause: 5 },
          { text: "Out.", pause: 5 },
          { text: "In.", pause: 5 },
          { text: "Out.", pause: 5 },
          { text: "Now bring up one real, specific memory of appreciation. A person. A moment. A place.", pause: 14 },
          { text: "Let the felt sense of it live in your chest while you keep breathing through the heart.", pause: 20 },
          { text: "Stay. I will be quiet. You are changing the shape of your heart field right now.", pause: 45 },
          { text: "A little longer. Do not rush this. It is the door to everything else.", pause: 45 },
        ],
      },
      {
        name: "Identity install",
        steps: [
          { text: "Now, from this coherent state, invite the version of you you have been installing.", pause: 14 },
          { text: "The one without fear. Not imagined from outside — felt from inside her body.", pause: 16 },
          { text: "Feel her back. Her jaw. Her shoulders. Her breath.", pause: 16 },
          { text: "Let her fill the space your body occupies. You are not pretending. You are remembering.", pause: 20 },
          { text: "Hold her. This is who you are.", pause: 30 },
          { text: "Longer. Let every cell catch up to the state.", pause: 30 },
          { text: "A little longer still. She is not coming. She is here.", pause: 30 },
        ],
      },
      {
        name: "Open field observation",
        steps: [
          { text: "Now stop reaching for anything. Stop picturing. Stop trying to hold any particular image.", pause: 14 },
          { text: "Just be open. The held state has its own life now. You do not have to maintain it.", pause: 18 },
          { text: "This is the window. You are going to stay here for a while. I will say very little.", pause: 20 },
          { text: "Anything that arises — a thought, an image, a feeling — let it pass through. Do not grab.", pause: 25 },
          { text: "The field is rearranging right now. You can feel it if you are still enough.", pause: 30 },
          { text: "Stay.", pause: 60 },
          { text: "A little longer.", pause: 60 },
          { text: "Longer still.", pause: 60 },
          { text: "The work is being done for you. You are not required to help.", pause: 60 },
          { text: "Stay.", pause: 60 },
          { text: "Almost done. A few more breaths of the held state.", pause: 45 },
        ],
      },
      {
        name: "Integration",
        steps: [
          { text: "Very gently, begin to let the practice close.", pause: 10 },
          { text: "Notice how the inside of your body feels now compared to when you started.", pause: 12 },
          { text: "Something has shifted. You do not have to name what.", pause: 12 },
          { text: "Whatever the field has reorganized around your new state is already in motion. You do not have to track it.", pause: 16 },
          { text: "Take a deeper breath.", pause: 8 },
          { text: "And one more.", pause: 8 },
        ],
      },
      { name: "Emerge", steps: EMERGE },
    ],
  },
];

export function findMeditation(slug: string): Meditation | null {
  return MEDITATIONS.find((m) => m.slug === slug) ?? null;
}
