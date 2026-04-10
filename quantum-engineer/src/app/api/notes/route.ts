import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const upsertSchema = z.object({
  courseSlug: z.string().min(1),
  lessonSlug: z.string().min(1),
  body: z.string().max(40_000),
});

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const courseSlug = searchParams.get("courseSlug");
  const lessonSlug = searchParams.get("lessonSlug");

  if (courseSlug && lessonSlug) {
    const note = await prisma.lessonNote.findFirst({
      where: { userId: session.user.id, courseSlug, lessonSlug },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ note });
  }

  if (courseSlug) {
    const notes = await prisma.lessonNote.findMany({
      where: { userId: session.user.id, courseSlug },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ notes });
  }

  const notes = await prisma.lessonNote.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json({ notes });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const parsed = upsertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const { courseSlug, lessonSlug, body: noteBody } = parsed.data;
  const existing = await prisma.lessonNote.findFirst({
    where: { userId: session.user.id, courseSlug, lessonSlug },
  });

  const saved = existing
    ? await prisma.lessonNote.update({
        where: { id: existing.id },
        data: { body: noteBody },
      })
    : await prisma.lessonNote.create({
        data: {
          userId: session.user.id,
          courseSlug,
          lessonSlug,
          body: noteBody,
        },
      });

  return NextResponse.json({ note: saved });
}
