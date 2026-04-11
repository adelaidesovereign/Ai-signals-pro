// The soft voice.
//
// Everything that speaks inside The Quantum Engineer — the coach, the
// subliminal tracks, the guided meditations — routes through this single
// module. There are two engines:
//
//   1. Premium path. Calls /api/tts which wraps OpenAI's TTS-1-HD model
//      with the "nova" voice (soft, warm, genuinely human-sounding) at a
//      slow cadence. Returns an MP3 stream that plays through a standard
//      HTMLAudioElement. Requires OPENAI_API_KEY on the server.
//
//   2. Browser fallback. Uses the built-in SpeechSynthesis API. We pick
//      the highest-quality female voice available on the device (premium
//      Apple voices when present) and speak at a very slow rate, lower
//      pitch, and softer volume. Works offline, no keys, no cost.
//
// Every caller uses `softSpeak(text)` and the module figures out which
// engine to use. When the premium path is unavailable the browser
// fallback kicks in silently. Both paths honour the same soothing
// presets so the feel is consistent across surfaces.

export type SpeakPreset = "coach" | "subliminal" | "meditation";

type UnifiedHandle = {
  cancel: () => void;
  onEnded: (fn: () => void) => void;
};

let lastHandle: UnifiedHandle | null = null;

const PRESETS: Record<
  SpeakPreset,
  { premiumSpeed: number; rate: number; pitch: number; volume: number }
> = {
  coach: {
    premiumSpeed: 0.9,
    rate: 0.85,
    pitch: 0.92,
    volume: 0.95,
  },
  subliminal: {
    // Extra soft — like soothing a baby to sleep.
    premiumSpeed: 0.82,
    rate: 0.72,
    pitch: 0.88,
    volume: 0.55,
  },
  meditation: {
    // Slow, warm, deeply paced.
    premiumSpeed: 0.82,
    rate: 0.75,
    pitch: 0.9,
    volume: 0.8,
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

function browserSpeak(text: string, preset: SpeakPreset): UnifiedHandle | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const cfg = PRESETS[preset];
  const utter = new SpeechSynthesisUtterance(text);
  const voice = pickBrowserVoice();
  if (voice) utter.voice = voice;
  utter.rate = cfg.rate;
  utter.pitch = cfg.pitch;
  utter.volume = cfg.volume;

  let endedListener: (() => void) | null = null;
  utter.onend = () => {
    if (endedListener) endedListener();
  };
  window.speechSynthesis.speak(utter);
  return {
    cancel: () => {
      try {
        window.speechSynthesis.cancel();
      } catch {
        /* ignore */
      }
    },
    onEnded: (fn) => {
      endedListener = fn;
    },
  };
}

// ---------- Premium path ----------

const audioCache = new Map<string, string>();

async function premiumSpeak(
  text: string,
  preset: SpeakPreset,
): Promise<UnifiedHandle | null> {
  if (typeof window === "undefined") return null;
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
      if (!res.ok) return null;
      const blob = await res.blob();
      url = URL.createObjectURL(blob);
      audioCache.set(cacheKey, url);
    } catch {
      return null;
    }
  }

  const audio = new Audio(url);
  audio.volume = cfg.volume;

  let endedListener: (() => void) | null = null;
  audio.addEventListener("ended", () => {
    if (endedListener) endedListener();
  });

  try {
    await audio.play();
  } catch {
    // Autoplay might be blocked — the caller should only start after a
    // user gesture.
    return null;
  }

  return {
    cancel: () => {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch {
        /* ignore */
      }
    },
    onEnded: (fn) => {
      endedListener = fn;
    },
  };
}

// ---------- Public API ----------

/**
 * Speak a piece of text with the soft voice. Prefers the premium path
 * when available, falls back to browser speech synthesis. Cancels any
 * currently-playing voice before starting the new one.
 */
export async function softSpeak(
  text: string,
  preset: SpeakPreset = "coach",
): Promise<UnifiedHandle | null> {
  if (!text.trim()) return null;
  cancelSpeech();
  const premium = await premiumSpeak(text, preset);
  if (premium) {
    lastHandle = premium;
    return premium;
  }
  const browser = browserSpeak(text, preset);
  if (browser) {
    lastHandle = browser;
    return browser;
  }
  return null;
}

export function cancelSpeech() {
  if (lastHandle) {
    lastHandle.cancel();
    lastHandle = null;
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
