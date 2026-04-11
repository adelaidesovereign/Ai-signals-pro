import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  MONTHLY_DROPS,
  UPCOMING_CALLS,
  SUBLIMINALS_LIBRARY,
} from "@/content/inner-circle";
import { CourseNav } from "@/components/courses/CourseNav";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { CommunityFeed } from "./CommunityFeed";

export const metadata: Metadata = {
  title: "The Inner Circle",
  description:
    "The Inner Circle — monthly live calls, a small private room of people doing the work, and the Sacred Sovereign Subliminals library.",
};

export default async function InnerCirclePage() {
  const session = await auth();
  const userId = session?.user?.id;

  const activeSub = userId
    ? await prisma.subscription.findFirst({
        where: { userId, product: "INNER_CIRCLE", status: "ACTIVE" },
      })
    : null;
  const hasAccess = Boolean(activeSub);

  const [posts, progress] = await Promise.all([
    hasAccess
      ? prisma.communityPost.findMany({
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
        })
      : Promise.resolve([]),
    userId
      ? prisma.lessonProgress.findMany({ where: { userId } })
      : Promise.resolve([]),
  ]);

  const fieldGuideDone = progress.filter(
    (p) => p.courseSlug === "field-guide" && p.completed,
  ).length;
  const certDone = progress.filter(
    (p) => p.courseSlug === "certification" && p.completed,
  ).length;

  return (
    <div className="min-h-screen bg-cream">
      <CourseNav
        backHref={userId ? "/dashboard" : "/"}
        backLabel={userId ? "Dashboard" : "Home"}
        title="The Inner Circle"
        userName={session?.user?.firstName ?? session?.user?.username ?? null}
      />

      <Container size="wide" className="py-16 sm:py-24">
        {!hasAccess && (
          <div className="mb-10 rounded-soft border border-gold/40 bg-cream-warm px-6 py-5 text-sm text-sage-deep/85">
            The Inner Circle is not yet open in your account.{" "}
            <Link
              href="/services#inner-circle"
              className="underline hover:text-sage"
            >
              Join the room for $97 per month
            </Link>{" "}
            and everything below becomes yours.
          </div>
        )}

        <div className="max-w-3xl">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
            Inner Circle
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight text-sage sm:text-6xl">
            A small room of people coming home at the same time.
          </h1>
          <p className="mt-5 text-lg text-sage-deep/85">
            Monthly live calls with Adelaide, a private feed for the questions
            that do not belong anywhere else, the Sacred Sovereign Subliminals
            library, and a place your practice has somewhere soft to land.
          </p>
        </div>

        {/* Your own progress surface */}
        <section className="mt-16">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
            Your work so far
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Card>
              <p className="font-serif text-xl text-sage">The Field Guide</p>
              <p className="mt-2 text-sm text-sage-deep/70">
                {fieldGuideDone} of 15 chapters complete
              </p>
              <div className="mt-4 h-1 rounded-full bg-cream-deep">
                <div
                  className="h-full rounded-full bg-sage"
                  style={{ width: `${(fieldGuideDone / 15) * 100}%` }}
                />
              </div>
            </Card>
            <Card>
              <p className="font-serif text-xl text-sage">The Certification</p>
              <p className="mt-2 text-sm text-sage-deep/70">
                {certDone} of 18 lessons complete
              </p>
              <div className="mt-4 h-1 rounded-full bg-cream-deep">
                <div
                  className="h-full rounded-full bg-sage"
                  style={{ width: `${(certDone / 18) * 100}%` }}
                />
              </div>
            </Card>
          </div>
        </section>

        {/* Monthly drops */}
        <section className="mt-20">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-3xl text-sage sm:text-4xl">
              Monthly teaching
            </h2>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage-deep/60">
              One drop, first of the month
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {MONTHLY_DROPS.map((drop) => (
              <Card key={drop.slug}>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                  {drop.month} &middot; {drop.focus}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-sage">
                  {drop.title}
                </h3>
                <p className="mt-3 text-sage-deep/85">{drop.summary}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Live calls */}
        <section className="mt-20">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-3xl text-sage sm:text-4xl">
              Live calls with Adelaide
            </h2>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage-deep/60">
              Twice a month
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {UPCOMING_CALLS.map((call) => (
              <Card key={call.slug}>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                  {call.date}
                </p>
                <h3 className="mt-3 font-serif text-2xl text-sage">
                  {call.title}
                </h3>
                <p className="mt-3 text-sage-deep/85">{call.description}</p>
                <p className="mt-4 font-sans text-xs uppercase tracking-[0.15em] text-sage-deep/50">
                  {hasAccess ? "Join link posted the morning of" : "Members only"}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Subliminals */}
        <section className="mt-20">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-3xl text-sage sm:text-4xl">
              Sacred Sovereign Subliminals
            </h2>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage-deep/60">
              New track each month
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {SUBLIMINALS_LIBRARY.map((track) => (
              <Card key={track.slug}>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage-deep/60">
                  {track.duration}
                </p>
                <h3 className="mt-2 font-serif text-xl text-sage">
                  {track.title}
                </h3>
                <p className="mt-3 text-sm text-sage-deep/85">
                  {track.description}
                </p>
                <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.15em] text-sage">
                  {hasAccess ? "Available in your library" : "Members only"}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Community */}
        <section className="mt-20">
          <div className="flex items-baseline justify-between">
            <h2 className="font-serif text-3xl text-sage sm:text-4xl">
              The private feed
            </h2>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage-deep/60">
              Members only, moderated by Adelaide
            </p>
          </div>
          <p className="mt-3 max-w-prose text-sage-deep/85">
            A room for the questions that do not belong on the internet. Keep it
            slow. Keep it specific. Keep it honest. If you have nothing to say,
            read. That is also the practice.
          </p>
          <div className="mt-8">
            <CommunityFeed
              canPost={hasAccess}
              currentUserName={
                session?.user?.firstName ?? session?.user?.username ?? ""
              }
              initialPosts={posts.map((p) => ({
                id: p.id,
                body: p.body,
                createdAt: p.createdAt.toISOString(),
                author:
                  p.user.firstName ?? p.user.username ?? "A member",
                comments: p.comments.map((c) => ({
                  id: c.id,
                  body: c.body,
                  createdAt: c.createdAt.toISOString(),
                  author:
                    c.user.firstName ?? c.user.username ?? "A member",
                })),
              }))}
            />
          </div>
        </section>
      </Container>
    </div>
  );
}
