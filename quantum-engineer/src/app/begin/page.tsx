import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FIELD_GUIDE_CHAPTERS } from "@/content/courses/field-guide";
import { flatLessons } from "@/content/courses/certification";
import { LAYER_RESULTS } from "@/content/quiz";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SiteShell } from "@/components/site/SiteShell";
import { ReminderOptIn } from "@/components/site/ReminderOptIn";

export const metadata: Metadata = {
  title: "Begin",
  description:
    "The personal path — where you are in the framework, and the exact next move.",
};

export default async function BeginPage() {
  const session = await auth();
  const userId = session?.user?.id;

  // Pull the latest quiz result if any (by email, since quizzes fire before
  // registration), plus progress.
  const [user, latestQuiz, progress] = userId
    ? await Promise.all([
        prisma.user.findUnique({ where: { id: userId } }),
        prisma.quizResult.findFirst({
          where: { userId },
          orderBy: { createdAt: "desc" },
        }),
        prisma.lessonProgress.findMany({
          where: { userId },
        }),
      ])
    : [null, null, []];

  const fgDone = progress.filter(
    (p) => p.courseSlug === "field-guide" && p.completed,
  );
  const certDone = progress.filter(
    (p) => p.courseSlug === "certification" && p.completed,
  );

  // Find the first Field Guide chapter that hasn't been completed.
  const nextFieldGuide = FIELD_GUIDE_CHAPTERS.find(
    (c) => !fgDone.some((p) => p.lessonSlug === c.slug),
  );
  const allFgDone = !nextFieldGuide;

  // Find the first Certification lesson that hasn't been completed.
  const allCert = flatLessons();
  const nextCertPair = allCert.find(
    ({ lesson }) => !certDone.some((p) => p.lessonSlug === lesson.slug),
  );
  const allCertDone = !nextCertPair;

  // Layer result → recommendation.
  const layerResult = latestQuiz
    ? LAYER_RESULTS[latestQuiz.layer as 1 | 2 | 3 | 4 | 5 | 6 | 7]
    : null;

  const firstName =
    user?.firstName ?? session?.user?.firstName ?? session?.user?.username ?? null;

  return (
    <SiteShell>
      <section className="pt-20 pb-12">
        <Container size="narrow">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
            {userId ? "Your specific path" : "Where to begin"}
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight text-sage sm:text-6xl">
            {userId && firstName ? `Hi, ${firstName}.` : "Start where you are."}
          </h1>
          <p className="mt-5 max-w-prose text-lg text-sage-deep/85">
            This page reads what you have done so far and gives you one
            specific next move. No menus. No choices. Just the next thing.
          </p>
        </Container>
      </section>

      {/* Layer result */}
      {layerResult && (
        <section className="pb-10">
          <Container size="narrow">
            <Card className="sm:p-10">
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                Your layer result
              </p>
              <h2 className="mt-3 font-serif text-3xl text-sage sm:text-4xl">
                {layerResult.name}
              </h2>
              <p className="mt-4 text-base text-sage-deep/90">
                {layerResult.diagnosis}
              </p>
              <p className="mt-5 text-sm text-sage-deep/75">
                {layerResult.whatToDo}
              </p>
            </Card>
          </Container>
        </section>
      )}

      {!layerResult && !userId && (
        <section className="pb-10">
          <Container size="narrow">
            <Card>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                First move
              </p>
              <h2 className="mt-3 font-serif text-3xl text-sage">
                Take the seven-question quiz.
              </h2>
              <p className="mt-4 text-sage-deep/85">
                This tells you exactly which layer is blocking you right now,
                and lets the rest of this page start personalising.
              </p>
              <div className="mt-6">
                <Button href="/quiz">Take the quiz</Button>
              </div>
            </Card>
          </Container>
        </section>
      )}

      {/* Next move in the work */}
      <section className="pb-10">
        <Container size="narrow">
          <Card className="sm:p-10">
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
              Your next practice
            </p>
            {!allFgDone && nextFieldGuide && (
              <div className="mt-4">
                <h2 className="font-serif text-3xl text-sage">
                  {nextFieldGuide.title}
                </h2>
                <p className="mt-2 text-sm text-sage-deep/70">
                  {nextFieldGuide.eyebrow} &middot; {nextFieldGuide.reading}
                </p>
                <p className="mt-4 text-sage-deep/85">
                  This is the next chapter in your Field Guide. It picks up
                  exactly where you left off. Your previous notes are still
                  there.
                </p>
                <div className="mt-6">
                  <Button
                    href={`/field-guide/read/${nextFieldGuide.slug}`}
                    size="lg"
                  >
                    Open this chapter
                  </Button>
                </div>
              </div>
            )}

            {allFgDone && !allCertDone && nextCertPair && (
              <div className="mt-4">
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                  {nextCertPair.module.eyebrow} — {nextCertPair.module.title}
                </p>
                <h2 className="mt-3 font-serif text-3xl text-sage">
                  {nextCertPair.lesson.title}
                </h2>
                <p className="mt-2 text-sm text-sage-deep/70">
                  {nextCertPair.lesson.reading}
                </p>
                <p className="mt-4 text-sage-deep/85">
                  You have finished the Field Guide. This is the next lesson
                  in the Certification Program. The installation work starts
                  here.
                </p>
                <div className="mt-6">
                  <Button
                    href={`/certification/learn/${nextCertPair.module.slug}/${nextCertPair.lesson.slug}`}
                    size="lg"
                  >
                    Open this lesson
                  </Button>
                </div>
              </div>
            )}

            {allFgDone && allCertDone && (
              <div className="mt-4">
                <h2 className="font-serif text-3xl text-sage">
                  You have walked the whole map.
                </h2>
                <p className="mt-4 text-sage-deep/85">
                  The work is not over — it is daily now. The Inner Circle is
                  where the practice continues in the company of others, and
                  the daily protocol is where you hold the new default.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/inner-circle">The Inner Circle</Button>
                  <Button
                    href="/field-guide/read/11-the-daily-protocol"
                    variant="secondary"
                  >
                    Today's protocol
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </Container>
      </section>

      {/* Daily reminder opt-in */}
      <section className="pb-20">
        <Container size="narrow">
          <Card>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
              A quiet morning letter
            </p>
            <h2 className="mt-3 font-serif text-3xl text-sage">
              One reminder, first thing tomorrow.
            </h2>
            <p className="mt-4 text-sage-deep/85">
              The daily protocol only works if you actually do it. A short
              morning letter from Adelaide with the exact thirteen minutes,
              waiting in your inbox when you wake up. No noise, no scroll.
            </p>
            <div className="mt-6">
              <ReminderOptIn />
            </div>
          </Card>
        </Container>
      </section>
    </SiteShell>
  );
}
