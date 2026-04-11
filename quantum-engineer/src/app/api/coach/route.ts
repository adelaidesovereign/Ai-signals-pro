import { NextResponse } from "next/server";
import { z } from "zod";
import { anthropic, COACHING_SYSTEM_PROMPT } from "@/lib/ai-coach";

export const runtime = "nodejs";

const schema = z.object({
  toolName: z.string().min(1).max(80),
  toolPrompt: z.string().min(1).max(1000),
  userWriting: z.string().min(1).max(8000),
  courseContext: z.string().max(200).optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input." },
      { status: 400 },
    );
  }

  // No API key configured — return a warm fallback so the UX still works.
  if (!anthropic) {
    return NextResponse.json({
      reply:
        "Your AI coach is not yet configured on this deploy. When ANTHROPIC_API_KEY is set in the environment, this is where Adelaide's voice reads what you just wrote and reflects back one specific next move. For now, come back to your writing in twenty-four hours and read it again. The thing your body was trying to say is usually clearer the second time.",
      fallback: true,
    });
  }

  const { toolName, toolPrompt, userWriting, courseContext } = parsed.data;

  const userMessage = [
    courseContext ? `Course context: ${courseContext}` : null,
    `Tool: ${toolName}`,
    `The prompt the student was responding to:`,
    toolPrompt,
    "",
    `What the student wrote:`,
    userWriting,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 800,
      system: COACHING_SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("\n\n")
      .trim();

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("[coach] request failed", err);
    return NextResponse.json(
      {
        error:
          "The coaching connection is not available right now. Your writing is saved — try again in a moment.",
      },
      { status: 503 },
    );
  }
}
