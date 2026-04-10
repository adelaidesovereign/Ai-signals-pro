import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({ body: z.string().min(1).max(4000) });

async function requireMember(userId: string) {
  const sub = await prisma.subscription.findFirst({
    where: { userId, product: "INNER_CIRCLE", status: "ACTIVE" },
  });
  return Boolean(sub);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const member = await requireMember(session.user.id);
  if (!member) {
    return NextResponse.json({ error: "Members only." }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid post." }, { status: 400 });
  }
  const post = await prisma.communityPost.create({
    data: { userId: session.user.id, body: parsed.data.body },
  });
  return NextResponse.json({ post });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  const member = await requireMember(session.user.id);
  if (!member) {
    return NextResponse.json({ posts: [] });
  }
  const posts = await prisma.communityPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 40,
    include: {
      user: { select: { username: true, firstName: true } },
      comments: {
        orderBy: { createdAt: "asc" },
        include: {
          user: { select: { username: true, firstName: true } },
        },
      },
    },
  });
  return NextResponse.json({ posts });
}
