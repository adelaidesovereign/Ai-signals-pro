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

// ElevenLabs default voice: Charlotte — warm, low register, naturally
// soothing with a slower delivery. Described as a "seductive English
// female" in the voice library, which in practice means the calmest,
// most intimate-sounding of the common presets.
// Override by setting ELEVENLABS_VOICE_ID in your env to any voice from
// https://elevenlabs.io/app/voice-library
const DEFAULT_ELEVENLABS_VOICE_ID = "XB0fDUnXU5powFXDhCwa";

async function tryElevenLabs(text: string): Promise<Response | null> {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return null;
  const voiceId =
    process.env.ELEVENLABS_VOICE_ID ?? DEFAULT_ELEVENLABS_VOICE_ID;

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": key,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_turbo_v2_5",
          voice_settings: {
            stability: 0.78,
            similarity_boost: 0.88,
            style: 0.15,
            use_speaker_boost: false,
          },
        }),
      },
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("[tts] ElevenLabs rejected", res.status, detail);
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
    console.error("[tts] ElevenLabs threw", err);
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
  const eleven = await tryElevenLabs(text);
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
