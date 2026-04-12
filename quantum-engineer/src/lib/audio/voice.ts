// The soft voice.
//
// Everything that speaks inside The Quantum Engineer — the coach, the
// subliminal tracks, the guided meditations — routes through this single
// module. There are three engines in priority order:
//
//   1. ElevenLabs (premium path A). Best TTS on the market. Reached via
//      /api/tts, which uses the ELEVENLABS_API_KEY on the server. Free
//      tier 10k characters/month, no credit card required.
//
//   2. OpenAI TTS-1-HD (premium path B). "nova" voice. Fallback if
//      ElevenLabs is not configured. Requires credit on the OpenAI account.
//
//   3. Browser SpeechSynthesis (fallback). Uses the best available
//      female voice on the device. Premium macOS voices (Ava, Samantha
//      Enhanced) sound genuinely good. Default voices are robotic.
//
// All three engines return the same unified handle and the public
// `softSpeak` function returns a Promise<void> that resolves when the
// voice has finished speaking. Callers should await it.

export type SpeakPreset = "coach" | "subliminal" | "meditation";

let cancelCurrent: (() => void) | null = null;

const PRESETS: Record<
  SpeakPreset,
  {
    premiumSpeed: number;
    playbackRate: number;
    rate: number;
    pitch: number;
    volume: number;
  }
> = {
  coach: {
    // Coach talks to you at a gentle pace with a gently deeper tone.
    // premiumSpeed goes to the TTS API; playbackRate is applied to
    // the returned audio element with preservesPitch=false, which
    // both slows the audio AND drops its pitch — one lever for both.
    premiumSpeed: 0.95,
    playbackRate: 0.9,
    rate: 0.8,
    pitch: 0.75,
    volume: 0.95,
  },
  subliminal: {
    // Extra soft — like soothing a baby to sleep. Still the deepest.
    premiumSpeed: 0.9,
    playbackRate: 0.85,
    rate: 0.62,
    pitch: 0.68,
    volume: 0.55,
  },
  meditation: {
    // Slow, warm, deliberately paced for theta descent work.
    premiumSpeed: 0.9,
    playbackRate: 0.88,
    rate: 0.66,
    pitch: 0.72,
    volume: 0.85,
  },
};

// ---------- Browser fallback ----------

const PREFERRED_VOICE_NAMES = [
  "Samantha (Enhanced)",
  "Ava (Enhanced)",
  "Ava (Premium)",
  "Allison (Enhanced)",
  "Allison (Premium)",
  "Karen (Enhanced)",
  "Serena (Premium)",
  "Serena (Enhanced)",
  "Moira (Enhanced)",
  "Tessa (Enhanced)",
  "Kate (Enhanced)",
  "Google UK English Female",
  "Google US English",
  "Samantha",
  "Ava",
  "Allison",
  "Karen",
  "Serena",
  "Moira",
  "Tessa",
  "Kate",
];

let cachedVoice: SpeechSynthesisVoice | null = null;

function pickBrowserVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  if (cachedVoice) return cachedVoice;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  for (const name of PREFERRED_VOICE_NAMES) {
    const hit = voices.find((v) => v.name === name);
    if (hit) {
      cachedVoice = hit;
      return hit;
    }
  }
  const english = voices.filter((v) => v.lang.startsWith("en"));
  const femaleish = english.find((v) =>
    /(female|samantha|ava|allison|karen|serena|moira|tessa|kate|zira|hazel|susan)/i.test(
      v.name,
    ),
  );
  if (femaleish) {
    cachedVoice = femaleish;
    return femaleish;
  }
  if (english[0]) {
    cachedVoice = english[0];
    return english[0];
  }
  return voices[0] ?? null;
}

function browserSpeak(
  text: string,
  preset: SpeakPreset,
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }
    const cfg = PRESETS[preset];
    const utter = new SpeechSynthesisUtterance(text);
    const voice = pickBrowserVoice();
    if (voice) utter.voice = voice;
    utter.rate = cfg.rate;
    utter.pitch = cfg.pitch;
    utter.volume = cfg.volume;

    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      cancelCurrent = null;
      resolve();
    };

    utter.onend = done;
    utter.onerror = done;

    cancelCurrent = () => {
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
      done();
    };

    try {
      window.speechSynthesis.speak(utter);
    } catch {
      done();
    }
  });
}

// ---------- Premium path ----------

const audioCache = new Map<string, string>();

/**
 * Warm the audio cache for a future phrase so it plays instantly when
 * it is its turn. Call this while a previous phrase is still speaking
 * to eliminate silence gaps caused by the API fetch.
 */
export async function preloadSpeak(
  text: string,
  preset: SpeakPreset = "meditation",
): Promise<void> {
  if (!text.trim()) return;
  if (typeof window === "undefined") return;
  const cfg = PRESETS[preset];
  const cacheKey = `${preset}|${text}`;
  if (audioCache.has(cacheKey)) return;
  try {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text,
        voice: "nova",
        speed: cfg.premiumSpeed,
      }),
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    audioCache.set(cacheKey, url);
  } catch {
    /* ignore — will fall back to browser speech when played */
  }
}

async function premiumSpeak(
  text: string,
  preset: SpeakPreset,
): Promise<boolean> {
  if (typeof window === "undefined") return false;
  const cfg = PRESETS[preset];
  const cacheKey = `${preset}|${text}`;

  let url = audioCache.get(cacheKey);
  if (!url) {
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice: "nova",
          speed: cfg.premiumSpeed,
        }),
      });
      if (!res.ok) return false;
      const blob = await res.blob();
      url = URL.createObjectURL(blob);
      audioCache.set(cacheKey, url);
    } catch {
      return false;
    }
  }

  return new Promise<boolean>((resolve) => {
    const audio = new Audio(url);
    audio.crossOrigin = "anonymous";
    audio.volume = cfg.volume;

    // Drop the pitch naturally by slowing playback while letting the
    // pitch move with it. preservesPitch defaults to true on modern
    // browsers, so we explicitly disable it. The combined effect is
    // a voice that is slightly slower AND noticeably deeper without
    // any server-side pitch-shifting.
    audio.playbackRate = cfg.playbackRate;
    const a = audio as HTMLAudioElement & {
      preservesPitch?: boolean;
      webkitPreservesPitch?: boolean;
      mozPreservesPitch?: boolean;
    };
    a.preservesPitch = false;
    a.webkitPreservesPitch = false;
    a.mozPreservesPitch = false;

    // Route the audio element through a Web Audio BiquadFilter for a
    // darker, closer-to-the-ear intimate sound. This is the difference
    // between "spoken softly" and "true ASMR whisper". The low-pass
    // drops frequencies above ~2800 Hz, which removes sibilance and
    // harshness and leaves only the warm body of the voice.
    try {
      const Ctor =
        (window.AudioContext as typeof AudioContext | undefined) ??
        ((window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext as typeof AudioContext | undefined);
      if (Ctor) {
        const ctx = new Ctor();
        const source = ctx.createMediaElementSource(audio);
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = preset === "subliminal" ? 2400 : 2800;
        filter.Q.value = 0.7;
        const warmth = ctx.createBiquadFilter();
        warmth.type = "lowshelf";
        warmth.frequency.value = 300;
        warmth.gain.value = 2.5;
        const outputGain = ctx.createGain();
        outputGain.gain.value = 1;
        source.connect(filter);
        filter.connect(warmth);
        warmth.connect(outputGain);
        outputGain.connect(ctx.destination);
      }
    } catch {
      /* Web Audio routing failed — audio still plays through the
         element's default output, just without the filter. */
    }

    let settled = false;
    const done = (ok: boolean) => {
      if (settled) return;
      settled = true;
      cancelCurrent = null;
      resolve(ok);
    };

    audio.addEventListener("ended", () => done(true));
    audio.addEventListener("error", () => done(false));

    cancelCurrent = () => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {
        /* ignore */
      }
      done(true);
    };

    audio.play().catch(() => done(false));
  });
}

// ---------- Public API ----------

/**
 * Speak a piece of text with the soft voice and wait for it to finish.
 * Resolves when the audio (premium or fallback) has completed playing.
 * Callers should `await softSpeak(text, preset)` before starting any
 * pause or next phrase, so audio never overlaps or cuts off.
 */
export async function softSpeak(
  text: string,
  preset: SpeakPreset = "coach",
): Promise<void> {
  if (!text.trim()) return;
  cancelSpeech();
  const ok = await premiumSpeak(text, preset);
  if (ok) return;
  await browserSpeak(text, preset);
}

export function cancelSpeech() {
  if (cancelCurrent) {
    try {
      cancelCurrent();
    } catch {
      /* ignore */
    }
    cancelCurrent = null;
  }
  if (typeof window !== "undefined" && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* ignore */
    }
  }
}

export function waitForVoices(timeoutMs = 3000): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve();
      return;
    }
    if (window.speechSynthesis.getVoices().length > 0) {
      resolve();
      return;
    }
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    window.speechSynthesis.onvoiceschanged = () => finish();
    setTimeout(finish, timeoutMs);
  });
}
