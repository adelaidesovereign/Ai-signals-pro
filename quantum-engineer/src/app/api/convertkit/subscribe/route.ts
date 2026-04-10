import { NextResponse } from "next/server";
import { z } from "zod";
import { subscribeToConvertKit } from "@/lib/convertkit";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  await subscribeToConvertKit(parsed.data);
  return NextResponse.json({ ok: true });
}
