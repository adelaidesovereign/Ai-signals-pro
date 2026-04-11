import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LAYER_RESULTS } from "@/content/quiz";
import { FIELD_GUIDE_CHAPTERS } from "@/content/courses/field-guide";
import { flatLessons } from "@/content/courses/certification";
import { Container } from "@/components/ui/Container";
import { CoachChat } from "./CoachChat";

export const metadata: Metadata = {
  title: "Your Coach",
  description:
    "Adelaide's voice, trained on the full framework, reading what you write and replying in real time with one specific next move.",
};

export default async function CoachPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const [latestQuiz, progress] = userId
    ? await Promise.all([
        prisma.quizResult.findFirst({
          where: { userId },
          orderBy: { createdAt: "desc" },
        }),
        prisma.lessonProgress.findMany({ where: { userId } }),
      ])
    : [null, []];

  const fgDone = progress.filter(
    (p) => p.courseSlug === "field-guide" && p.completed,
  ).length;
  const certDone = progress.filter(
    (p) => p.courseSlug === "certification" && p.completed,
  ).length;
  const layerResult =
    latestQuiz && LAYER_RESULTS[latestQuiz.layer as 1 | 2 | 3 | 4 | 5 | 6 | 7];

  const firstName =
    session?.user?.firstName ?? session?.user?.username ?? null;

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-sage/10 bg-cream/90 backdrop-blur-md">
        <Container size="wide">
          <div className="flex items-center justify-between py-5">
            <Link
              href={userId ? "/dashboard" : "/"}
              className="font-sans text-xs uppercase tracking-[0.15em] text-sage-deep hover:text-sage"
            >
              &larr; {userId ? "Dashboard" : "Home"}
            </Link>
            <p className="hidden font-serif text-lg text-sage sm:block">
              Your coach
            </p>
            <span />
          </div>
        </Container>
      </header>

      <Container size="wide" className="py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Main chat column */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
              Your coach
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-tight text-sage sm:text-6xl">
              Talk to Adelaide.
            </h1>
            <p className="mt-4 max-w-prose text-lg text-sage-deep/85">
              This is not a form. This is Adelaide's voice trained on the full
              framework, reading what you write and responding with one
              specific next move. She already knows where you are in the
              program. Ask her anything.
            </p>

            <div className="mt-10">
              <CoachChat
                firstName={firstName}
                context={{
                  layerName: layerResult?.name ?? null,
                  fgDone,
                  certDone,
                }}
              />
            </div>
          </div>

          {/* Context sidebar */}
          <aside className="space-y-5 lg:pt-10">
            <div className="rounded-soft border border-sage/15 bg-cream-warm p-6 shadow-card">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                What she knows about you
              </p>
              <ul className="mt-4 space-y-3 text-sm text-sage-deep/85">
                {firstName ? (
                  <li>
                    <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/55">
                      Name
                    </span>
                    <p className="mt-0.5 font-serif text-lg text-sage">
                      {firstName}
                    </p>
                  </li>
                ) : (
                  <li className="text-sage-deep/70">
                    You are not signed in.{" "}
                    <Link href="/login" className="underline hover:text-sage">
                      Sign in
                    </Link>{" "}
                    so the coach can see your progress.
                  </li>
                )}

                {layerResult && (
                  <li>
                    <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/55">
                      Your layer
                    </span>
                    <p className="mt-0.5 font-serif text-base text-sage">
                      {layerResult.name}
                    </p>
                  </li>
                )}

                {userId && (
                  <>
                    <li>
                      <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/55">
                        Field Guide
                      </span>
                      <p className="mt-0.5 text-sage-deep">
                        {fgDone} of {FIELD_GUIDE_CHAPTERS.length} chapters
                      </p>
                    </li>
                    <li>
                      <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/55">
                        Certification Program
                      </span>
                      <p className="mt-0.5 text-sage-deep">
                        {certDone} of {flatLessons().length} lessons
                      </p>
                    </li>
                  </>
                )}
              </ul>
              <p className="mt-5 text-xs text-sage-deep/55">
                The coach also reads your most recent lesson notes and
                journal entries so she can respond to your specific work.
              </p>
            </div>

            <div className="rounded-soft border border-sage/15 bg-cream-warm p-6 shadow-card">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                Good things to ask
              </p>
              <ul className="mt-4 space-y-2 text-sm text-sage-deep/85">
                <li>"I just did the somatic find and this surfaced — what do you make of it?"</li>
                <li>"The old pattern is back today. How do I come back?"</li>
                <li>"I am stuck on the heart coherence practice. What am I missing?"</li>
                <li>"What should I focus on this week given where I am in the program?"</li>
                <li>"Talk to me about my parts work session from yesterday."</li>
              </ul>
            </div>

            <div className="rounded-soft border border-sage/15 bg-cream-warm p-6">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                A note on privacy
              </p>
              <p className="mt-3 text-xs leading-relaxed text-sage-deep/75">
                Your conversations are held in your browser. Nothing you
                write here is shared with other students. The coach is an
                AI trained on the framework, not a human reading over your
                shoulder.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
