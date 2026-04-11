// Sacred Sovereign Subliminals — a hand-authored library of identity
// phrases that the SubliminalPlayer speaks softly over theta audio.
//
// No audio files. The voice is generated live in the browser using the
// SpeechSynthesis API; the theta beats are generated live via Web Audio.
// This means every subliminal is immediate, offline-capable, and free to
// update as Adelaide writes new phrases.

export type SubliminalTrack = {
  slug: string;
  title: string;
  description: string;
  durationMinutes: number;
  beatFrequency: number; // 4..8
  phrases: string[];
};

export const SUBLIMINALS: SubliminalTrack[] = [
  {
    slug: "i-am-already-her",
    title: "I am already her",
    description:
      "A twenty-two-minute identity track for the hypnagogic threshold. Use this one tonight as you drift to sleep. The phrases are present tense on purpose — that is how the subconscious takes them in.",
    durationMinutes: 22,
    beatFrequency: 6,
    phrases: [
      "I am already her.",
      "My body is the home I was always meant to live in.",
      "The person I have been waiting to become is already here.",
      "I walk through my life as the one I actually am.",
      "I am safe in the quiet. I am safe in the becoming.",
      "Every breath brings me back to who I was before the fear.",
      "I do not have to prove anything to be her. I only have to let her.",
      "The field is already arranging itself around my true state.",
      "What is mine is already on its way to me.",
      "I am the one I have been looking for.",
    ],
  },
  {
    slug: "my-body-is-safe-now",
    title: "My body is safe now",
    description:
      "Eighteen minutes for the nervous system that has been in low-grade activation for a very long time. Slow exhale pacing woven underneath. Listen in a room where nothing is asked of you.",
    durationMinutes: 18,
    beatFrequency: 5,
    phrases: [
      "My body is safe now.",
      "The scan can stop. I am here.",
      "My shoulders can come down. My jaw can let go.",
      "I am allowed to rest inside my own body.",
      "Nothing in this room is asking anything of me.",
      "My breath is mine. My quiet is mine.",
      "The old alarm was for an old moment. That moment has passed.",
      "I do not need to brace to be held.",
      "My nervous system is learning it is safe to soften.",
      "I am coming home to a body that was always mine.",
    ],
  },
  {
    slug: "the-return-is-the-practice",
    title: "The return is the practice",
    description:
      "Sixteen minutes for the day the old version pulled you back. Listen without guilt in the first sixty seconds of the return. There is nothing to earn back.",
    durationMinutes: 16,
    beatFrequency: 6,
    phrases: [
      "The return is the practice.",
      "I have not lost anything by drifting.",
      "The moment I notice the drift, I am already back.",
      "My speed of return is the only metric that matters.",
      "The old state is a room I visited. I am not required to stay.",
      "I come back without punishing myself.",
      "Each return is a rewiring.",
      "I am allowed to soften the moment I notice I am hard.",
      "The part of me that noticed is already the new one.",
      "I am here. I am here. I am here.",
    ],
  },
  {
    slug: "i-am-the-observer",
    title: "I am the observer",
    description:
      "Twenty minutes on the quantum layer of the work. For when you need to remember that your state shapes the slice of reality that resolves. Best listened to before a morning installation session.",
    durationMinutes: 20,
    beatFrequency: 7,
    phrases: [
      "I am the observer.",
      "The field responds to the state I am actually in.",
      "I do not force the outcome. I become the one the outcome belongs to.",
      "What I hold inside reorganizes what I meet outside.",
      "My inner state and my outer life are one system.",
      "I choose which slice of the field I collapse into today.",
      "The version of me I observe becomes the version that holds.",
      "I am the instrument. I am the tuning. I am the frequency.",
      "Every moment is a measurement. I meet each one as her.",
      "I am the one reality is arranging itself around.",
    ],
  },
];

export function findSubliminal(slug: string): SubliminalTrack | null {
  return SUBLIMINALS.find((t) => t.slug === slug) ?? null;
}
