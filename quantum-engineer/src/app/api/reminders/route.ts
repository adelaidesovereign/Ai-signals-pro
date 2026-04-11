import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribeToConvertKit } from "@/lib/convertkit";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(60).optional(),
  timezone: z.string().max(60).optional(),
});

// Opts the visitor into Adelaide's daily morning protocol reminder sequence.
// The actual scheduling is handled by ConvertKit automations — this route
// only subscribes the email with the right tag so the sequence fires.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input." },
      { status: 400 },
    );
  }

  await subscribeToConvertKit({
    email: parsed.data.email,
    firstName: parsed.data.firstName,
    source: "daily-reminder",
    tagIds: [process.env.CONVERTKIT_TAG_DAILY_REMINDER ?? ""].filter(Boolean),
  });

  return NextResponse.json({ ok: true });
}
