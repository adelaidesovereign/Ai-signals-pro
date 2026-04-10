import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const createSchema = z.object({
  title: z.string().max(120).optional(),
  body: z.string().min(1).max(40_000),
});

const updateSchema = createSchema.extend({ id: z.string().min(1) });

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const entries = await prisma.journalEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return NextResponse.json({ entries });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }
  const entry = await prisma.journalEntry.create({
    data: {
      userId: session.user.id,
      title: parsed.data.title,
      body: parsed.data.body,
    },
  });
  return NextResponse.json({ entry });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }
  const entry = await prisma.journalEntry.findUnique({
    where: { id: parsed.data.id },
  });
  if (!entry || entry.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  const updated = await prisma.journalEntry.update({
    where: { id: entry.id },
    data: { title: parsed.data.title, body: parsed.data.body },
  });
  return NextResponse.json({ entry: updated });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required." }, { status: 400 });
  }
  const entry = await prisma.journalEntry.findUnique({ where: { id } });
  if (!entry || entry.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  await prisma.journalEntry.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
