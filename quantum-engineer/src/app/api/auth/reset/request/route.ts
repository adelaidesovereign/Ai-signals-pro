import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  // Always respond 200 — do not leak which emails exist.
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  const token = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: token, resetExpires: expires },
  });

  // In production, this link would be sent via ConvertKit transactional or
  // a dedicated transactional provider. For now, log in dev so Adelaide can
  // hand-deliver the link while the transactional provider is chosen.
  if (process.env.NODE_ENV !== "production") {
    console.info(
      `[reset] Password reset link: ${process.env.NEXTAUTH_URL}/reset/${token}`,
    );
  }

  return NextResponse.json({ ok: true });
}
