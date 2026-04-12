import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Body = {
  text: string;
  voice?: string;
  speed?: number;
};

// ElevenLabs default voice: Nicole — American female ASMR-style whisper.
const DEFAULT_ELEVENLABS_VOICE_ID = "piTKgcLEGmPE4e6mEKli";

async function tryElevenLabs(
  text: string,
  speed: number,
): Promise<Response | null> {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) return null;
  const voiceId =
    process.env.ELEVENLABS_VOICE_ID ?? DEFAULT_ELEVENLABS_VOICE_ID;
  const clampedSpeed = Math.max(0.7, Math.min(1.2, speed));

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
          // eleven_multilingual_v2 renders Nicole with more natural
          // breath and whisper characteristics than turbo. Higher
          // stability (0.5) makes the whisper consistent across every
          // phrase instead of appearing on some and disappearing on
          // others.
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.85,
            style: 0,
            use_speaker_boost: false,
            speed: clampedSpeed,
          },
        }),
      },
    );

    if (!res.ok) {
      const detail = await res.text();
      console.warn("[tts] ElevenLabs rejected", res.status, detail.slice(0, 200));
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

  const eleven = await tryElevenLabs(text, speed);
  if (eleven) return eleven;

  const openai = await tryOpenAI(text, voice, speed);
  if (openai) return openai;

  return NextResponse.json(
    { error: "Premium voice not configured.", fallback: "browser" },
    { status: 503 },
  );
}
