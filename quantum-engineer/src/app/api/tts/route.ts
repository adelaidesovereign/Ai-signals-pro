import { NextResponse } from "next/server";

// Premium text-to-speech endpoint.
//
// Tries providers in order until one works. Each provider is enabled
// by its own environment variable so you can configure whichever is
// easiest to sign up for:
//
//   1. ELEVENLABS_API_KEY — the single best TTS on the market today.
//      Warm, truly human voices. Free tier (10k characters/month)
//      requires no credit card. Voice defaults to "Rachel" (warm,
//      calm, genuinely soothing female).
//
//   2. OPENAI_API_KEY — OpenAI's TTS-1-HD model with the "nova"
//      voice. Also excellent. Requires credit on the OpenAI account.
//
// When neither is configured, the route returns 503 with a signal to
// the client, which falls back to the browser's built-in
// SpeechSynthesis API. The UX still works in every environment.

export const runtime = "nodejs";

type Body = {
  text: string;
  voice?: string;
  speed?: number;
};

// ElevenLabs default voice: Nicole — an American female ASMR-style
// whisper voice. Specifically designed for the soothing, close-to-
// the-ear quality you want for subliminals and guided meditations.
// Override by setting ELEVENLABS_VOICE_ID in your env to any voice
// from https://elevenlabs.io/app/voice-library
const DEFAULT_ELEVENLABS_VOICE_ID = "piTKgcLEGmPE4e6mEKli";

async function tryElevenLabs(
  text: string,
  speed: number,
): Promise<Response | null> {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return null;
  const voiceId =
    process.env.ELEVENLABS_VOICE_ID ?? DEFAULT_ELEVENLABS_VOICE_ID;

  // ElevenLabs speed accepts 0.7..1.2. Clamp into that range so an
  // extreme client value never gets rejected upstream.
  const clampedSpeed = Math.max(0.7, Math.min(1.2, speed));

  // Wrap the text with the [whispers] audio tag that ElevenLabs
  // understands as an emotion cue. Only applied when the text does
  // not already contain any square-bracket tag so callers can
  // override the emotion if they ever need to.
  const taggedText = /\[[a-zA-Z]+\]/.test(text)
    ? text
    : `[whispers] ${text}`;

  // Try models in order. eleven_v3 honours audio tags like [whispers]
  // properly but may not be available on every account. turbo_v2_5 is
  // available everywhere but emotion-tag support is partial. We try
  // the tagged version on v3 first, then the tagged version on
  // turbo_v2_5, then finally the untagged version on turbo_v2_5 as a
  // last resort.
  const attempts: Array<{ model: string; input: string }> = [
    { model: "eleven_v3", input: taggedText },
    { model: "eleven_turbo_v2_5", input: taggedText },
    { model: "eleven_turbo_v2_5", input: text },
  ];

  let res: Response | null = null;
  for (const attempt of attempts) {
    try {
      res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": key,
            "Content-Type": "application/json",
            Accept: "audio/mpeg",
          },
          body: JSON.stringify({
            text: attempt.input,
            model_id: attempt.model,
            voice_settings: {
              stability: 0.25,
              similarity_boost: 0.85,
              style: 0,
              use_speaker_boost: false,
              speed: clampedSpeed,
            },
          }),
        },
      );
      if (res.ok) break;
      const detail = await res.text();
      console.warn(
        `[tts] ElevenLabs ${attempt.model} failed`,
        res.status,
        detail.slice(0, 200),
      );
    } catch (err) {
      console.error("[tts] ElevenLabs fetch threw", err);
    }
  }

  if (!res || !res.ok) return null;

  try {
    const audio = await res.arrayBuffer();
    return new Response(audio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
        "Content-Length": String(audio.byteLength),
      },
    });
  } catch (err) {
    console.error("[tts] ElevenLabs response read threw", err);
    return null;
  }
}

async function tryOpenAI(
  text: string,
  voice: string,
  speed: number,
): Promise<Response | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1-hd",
        voice,
        input: text,
        speed,
        response_format: "mp3",
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[tts] OpenAI rejected", res.status, detail);
      return null;
    }

    const audio = await res.arrayBuffer();
    return new Response(audio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
        "Content-Length": String(audio.byteLength),
      },
    });
  } catch (err) {
    console.error("[tts] OpenAI threw", err);
    return null;
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Partial<Body>;
  const text = (body.text ?? "").trim();
  if (!text) {
    return NextResponse.json({ error: "Missing text." }, { status: 400 });
  }
  if (text.length > 4000) {
    return NextResponse.json(
      { error: "Text too long — split into shorter chunks." },
      { status: 400 },
    );
  }

  const voice = body.voice ?? "nova";
  const speed = typeof body.speed === "number" ? body.speed : 0.9;

  // Try ElevenLabs first — best quality.
  const eleven = await tryElevenLabs(text, speed);
  if (eleven) return eleven;

  // Fall back to OpenAI if configured.
  const openai = await tryOpenAI(text, voice, speed);
  if (openai) return openai;

  // Neither configured — tell the client to use browser fallback.
  return NextResponse.json(
    {
      error: "Premium voice not configured.",
      fallback: "browser",
    },
    { status: 503 },
  );
}
