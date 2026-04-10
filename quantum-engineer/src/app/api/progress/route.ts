import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  courseSlug: z.string().min(1),
  lessonSlug: z.string().min(1),
  completed: z.boolean().optional(),
  secondsIn: z.number().int().min(0).max(60 * 60 * 6).optional(),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const { courseSlug, lessonSlug, completed, secondsIn } = parsed.data;
  const record = await prisma.lessonProgress.upsert({
    where: {
      userId_courseSlug_lessonSlug: {
        userId: session.user.id,
        courseSlug,
        lessonSlug,
      },
    },
    update: {
      ...(completed !== undefined ? { completed } : {}),
      ...(secondsIn !== undefined ? { secondsIn } : {}),
    },
    create: {
      userId: session.user.id,
      courseSlug,
      lessonSlug,
      completed: completed ?? false,
      secondsIn: secondsIn ?? 0,
    },
  });

  return NextResponse.json({ progress: record });
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const courseSlug = searchParams.get("courseSlug");
  if (!courseSlug) {
    return NextResponse.json(
      { error: "courseSlug required." },
      { status: 400 },
    );
  }
  const rows = await prisma.lessonProgress.findMany({
    where: { userId: session.user.id, courseSlug },
  });
  return NextResponse.json({ progress: rows });
}
