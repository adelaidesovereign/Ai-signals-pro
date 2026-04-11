import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { anthropic, COACHING_SYSTEM_PROMPT } from "@/lib/ai-coach";
import { LAYER_RESULTS } from "@/content/quiz";
import { FIELD_GUIDE_CHAPTERS } from "@/content/courses/field-guide";
import { flatLessons } from "@/content/courses/certification";

export const runtime = "nodejs";

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(8000),
});

const schema = z.object({
  messages: z.array(messageSchema).min(1).max(40),
});

// Pulls a short, personalized context block the coach can reference so it
// knows where the student is in the framework before it replies.
async function buildContext(userId: string | undefined): Promise<string> {
  if (!userId) {
    return "The student is not signed in. Keep the reply warm and general but still give one specific next move.";
  }

  const [user, latestQuiz, progress, latestNotes, latestJournal] =
    await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.quizResult.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
      }),
      prisma.lessonProgress.findMany({ where: { userId } }),
      prisma.lessonNote.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
        take: 3,
      }),
      prisma.journalEntry.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 2,
      }),
    ]);

  const parts: string[] = [];

  if (user?.firstName) {
    parts.push(`Student's first name: ${user.firstName}`);
  }

  if (latestQuiz) {
    const layer =
      LAYER_RESULTS[latestQuiz.layer as 1 | 2 | 3 | 4 | 5 | 6 | 7];
    if (layer) {
      parts.push(
        `Their quiz result says they are currently stuck at ${layer.name}. Short diagnosis: ${layer.diagnosis}`,
      );
    }
  }

  const fgCompleted = progress.filter(
    (p) => p.courseSlug === "field-guide" && p.completed,
  ).length;
  const totalFg = FIELD_GUIDE_CHAPTERS.length;
  const certCompleted = progress.filter(
    (p) => p.courseSlug === "certification" && p.completed,
  ).length;
  const totalCert = flatLessons().length;
  parts.push(
    `Field Guide progress: ${fgCompleted} of ${totalFg} chapters complete.`,
  );
  parts.push(
    `Certification Program progress: ${certCompleted} of ${totalCert} lessons complete.`,
  );

  if (latestNotes.length > 0) {
    parts.push(
      `Their three most recent lesson notes (excerpts, in order of most recent first):\n` +
        latestNotes
          .map(
            (n, i) =>
              `${i + 1}. [${n.courseSlug}/${n.lessonSlug}] ${n.body.slice(0, 300)}`,
          )
          .join("\n"),
    );
  }

  if (latestJournal.length > 0) {
    parts.push(
      `Their recent journal entries (excerpts):\n` +
        latestJournal
          .map(
            (e, i) =>
              `${i + 1}. ${e.title ? `${e.title}: ` : ""}${e.body.slice(0, 300)}`,
          )
          .join("\n"),
    );
  }

  return parts.join("\n\n");
}

function mockReply(userMessage: string, firstName?: string): string {
  const name = firstName ? `${firstName}, ` : "";
  // Template-based reply that still sounds like Adelaide and gives a
  // specific next move. Used when ANTHROPIC_API_KEY is not configured
  // so the UX still works end to end in dev and on cold deploys.
  const trimmed = userMessage.trim();
  const firstLine = trimmed.split(/[.!?\n]/)[0]?.slice(0, 200) ?? "";

  return [
    `${name}I read what you wrote. "${firstLine}${firstLine.length >= 200 ? "…" : ""}"`,
    "",
    "The part of you that said this out loud is the part that is ready to be heard. Stay with it for a breath before you move on.",
    "",
    "Your next move: go to Field Guide Chapter 4 — the nervous system layer. Do the long-exhale breathwork at the bottom of the page. Four in, eight out, five cycles. Then come back here and tell me what shifted.",
    "",
    "(This is a template response. Set ANTHROPIC_API_KEY in your .env.local to hear the real coach respond in Adelaide's actual voice.)",
  ].join("\n");
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const session = await auth();
  const userId = session?.user?.id;
  const firstName =
    session?.user?.firstName ?? session?.user?.username ?? undefined;

  const context = await buildContext(userId);
  const systemWithContext = `${COACHING_SYSTEM_PROMPT}\n\n## What you know about this student right now\n\n${context}`;

  // Mock reply path — still works end to end without an API key.
  if (!anthropic) {
    const last = parsed.data.messages[parsed.data.messages.length - 1];
    return NextResponse.json({
      reply: mockReply(last.content, firstName ?? undefined),
      fallback: true,
    });
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1200,
      system: systemWithContext,
      messages: parsed.data.messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("\n\n")
      .trim();

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("[coach/chat] request failed", err);
    return NextResponse.json(
      { error: "The coach is not reachable right now. Try again in a moment." },
      { status: 503 },
    );
  }
}
