import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { scoreQuiz } from "@/content/quiz";
import { subscribeQuizResult } from "@/lib/convertkit";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(60),
  answers: z.record(z.string(), z.string()),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please fill in every field." },
      { status: 400 },
    );
  }

  const result = scoreQuiz(parsed.data.answers);

  // Store the result. This is the record of quiz activity independent of
  // whether the visitor has an account yet.
  await prisma.quizResult
    .create({
      data: {
        email: parsed.data.email.toLowerCase(),
        firstName: parsed.data.firstName,
        layer: result.layer,
        answers: parsed.data.answers,
      },
    })
    .catch((err) => console.error("[quiz] store failed", err));

  // Pipe into ConvertKit with the right tag — fire and forget.
  subscribeQuizResult({
    email: parsed.data.email,
    firstName: parsed.data.firstName,
    layer: result.layer,
  }).catch(() => {});

  return NextResponse.json({ result });
}
