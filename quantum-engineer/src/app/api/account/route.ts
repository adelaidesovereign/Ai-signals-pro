import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  firstName: z.string().max(60).optional(),
  lastName: z.string().max(60).optional(),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_.-]+$/),
  email: z.string().email(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8).optional(),
});

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  // Uniqueness check on username and email if they changed.
  if (parsed.data.username !== user.username) {
    const clash = await prisma.user.findUnique({
      where: { username: parsed.data.username },
    });
    if (clash && clash.id !== user.id) {
      return NextResponse.json(
        { error: "That username is taken." },
        { status: 409 },
      );
    }
  }
  if (parsed.data.email.toLowerCase() !== user.email) {
    const clash = await prisma.user.findUnique({
      where: { email: parsed.data.email.toLowerCase() },
    });
    if (clash && clash.id !== user.id) {
      return NextResponse.json(
        { error: "That email is already in use." },
        { status: 409 },
      );
    }
  }

  let passwordHash: string | undefined;
  if (parsed.data.newPassword) {
    if (!parsed.data.currentPassword) {
      return NextResponse.json(
        { error: "Enter your current password to change it." },
        { status: 400 },
      );
    }
    const ok = await bcrypt.compare(
      parsed.data.currentPassword,
      user.passwordHash,
    );
    if (!ok) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 400 },
      );
    }
    passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      username: parsed.data.username,
      email: parsed.data.email.toLowerCase(),
      ...(passwordHash ? { passwordHash } : {}),
    },
  });

  return NextResponse.json({ ok: true });
}
