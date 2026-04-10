import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { subscribeToConvertKit } from "@/lib/convertkit";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(60),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_.-]+$/),
  password: z.string().min(8),
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

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { error: "No account found for that email." },
      { status: 404 },
    );
  }

  // Make sure the chosen username is not in use elsewhere.
  const usernameOwner = await prisma.user.findUnique({
    where: { username: parsed.data.username },
  });
  if (usernameOwner && usernameOwner.id !== user.id) {
    return NextResponse.json(
      { error: "That username is taken. Choose another." },
      { status: 409 },
    );
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      firstName: parsed.data.firstName,
      username: parsed.data.username,
      passwordHash,
    },
  });

  subscribeToConvertKit({
    email,
    firstName: parsed.data.firstName,
    source: "welcome-setup",
  }).catch(() => {});

  return NextResponse.json({ ok: true });
}
