import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { subscribeToConvertKit } from "@/lib/convertkit";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_.-]+$/, "Letters, numbers, dot, underscore, hyphen."),
  firstName: z.string().min(1).max(60).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input." },
        { status: 400 },
      );
    }

    const email = parsed.data.email.toLowerCase();
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username: parsed.data.username }],
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "An account with that email or username already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await prisma.user.create({
      data: {
        email,
        username: parsed.data.username,
        firstName: parsed.data.firstName,
        passwordHash,
      },
      select: { id: true, email: true, username: true, firstName: true },
    });

    // Fire and forget — ConvertKit must not block account creation.
    subscribeToConvertKit({
      email: user.email,
      firstName: user.firstName ?? undefined,
      source: "register",
    }).catch(() => {});

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error("[register] failed", err);
    return NextResponse.json(
      { error: "Something did not connect. Try again in a moment." },
      { status: 500 },
    );
  }
}
