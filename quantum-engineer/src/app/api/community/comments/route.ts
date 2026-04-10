import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  postId: z.string().min(1),
  body: z.string().min(1).max(2000),
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const sub = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
      product: "INNER_CIRCLE",
      status: "ACTIVE",
    },
  });
  if (!sub) {
    return NextResponse.json({ error: "Members only." }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid comment." }, { status: 400 });
  }

  const comment = await prisma.communityComment.create({
    data: {
      userId: session.user.id,
      postId: parsed.data.postId,
      body: parsed.data.body,
    },
  });
  return NextResponse.json({ comment });
}
