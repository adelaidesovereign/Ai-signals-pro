import { NextResponse } from "next/server";

// Premium text-to-speech endpoint.
//
// When OPENAI_API_KEY is configured, we call OpenAI's TTS-1-HD model
// with the "nova" voice — a soft, human-sounding, genuinely warm female
// voice. The audio is streamed back as MP3 so the browser can play it
// with a standard HTMLAudioElement.
//
// When the key is not set, the route returns 503 and the client falls
// back to the browser's built-in SpeechSynthesis API. The UX still
// works in every environment; premium just sounds better.

export const runtime = "nodejs";

type Body = {
  text: string;
  voice?: "nova" | "shimmer" | "alloy" | "echo" | "fable" | "onyx";
  speed?: number;
};

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

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json(
      {
        error: "Premium voice not configured.",
        fallback: "browser",
      },
      { status: 503 },
    );
  }

  const voice = body.voice ?? "nova";
  const speed = typeof body.speed === "number" ? body.speed : 0.9;

  try {
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
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

    if (!response.ok) {
      const detail = await response.text();
      console.error("[tts] OpenAI rejected request", response.status, detail);
      return NextResponse.json(
        { error: "Premium voice is not available right now." },
        { status: 503 },
      );
    }

    const audio = await response.arrayBuffer();
    return new Response(audio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600",
        "Content-Length": String(audio.byteLength),
      },
    });
  } catch (err) {
    console.error("[tts] request failed", err);
    return NextResponse.json(
      { error: "Premium voice is not available right now." },
      { status: 503 },
    );
  }
}
