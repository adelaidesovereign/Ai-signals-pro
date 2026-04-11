import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { grantsFullCourseAccess } from "@/lib/access";
import {
  certification,
  findCertificationLesson,
  flatLessons,
} from "@/content/courses/certification";
import { CourseNav } from "@/components/courses/CourseNav";
import { CourseBlocks } from "@/components/courses/CourseBlocks";
import { LessonNotes } from "@/components/courses/LessonNotes";
import { CompletionToggle } from "@/components/courses/CompletionToggle";
import { Container } from "@/components/ui/Container";

type Props = { params: { module: string; lesson: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = findCertificationLesson(params.module, params.lesson);
  return { title: found?.lesson.title ?? "Certification Program" };
}

export async function generateStaticParams() {
  return flatLessons().map(({ module, lesson }) => ({
    module: module.slug,
    lesson: lesson.slug,
  }));
}

async function userHasAccess(userId: string) {
  const [purchase, sub] = await Promise.all([
    prisma.purchase.findFirst({
      where: { userId, product: "CERTIFICATION", status: "PAID" },
    }),
    prisma.subscription.findFirst({
      where: { userId, product: "CERTIFICATION", status: "ACTIVE" },
    }),
  ]);
  return Boolean(purchase || sub);
}

export default async function CertificationLessonPage({ params }: Props) {
  const session = await auth();
  const userId = session?.user?.id;

  const found = findCertificationLesson(params.module, params.lesson);
  if (!found) notFound();
  const { module: mod, lesson } = found;

  const hasPaidRecord = userId ? await userHasAccess(userId) : false;
  const hasAccess = grantsFullCourseAccess({ hasPaidRecord });

  const [progress, note] = userId
    ? await Promise.all([
        prisma.lessonProgress.findUnique({
          where: {
            userId_courseSlug_lessonSlug: {
              userId,
              courseSlug: "certification",
              lessonSlug: lesson.slug,
            },
          },
        }),
        prisma.lessonNote.findFirst({
          where: {
            userId,
            courseSlug: "certification",
            lessonSlug: lesson.slug,
          },
          orderBy: { updatedAt: "desc" },
        }),
      ])
    : [null, null];

  // Find prev/next lesson across modules.
  const all = flatLessons();
  const idx = all.findIndex(
    (x) => x.module.slug === mod.slug && x.lesson.slug === lesson.slug,
  );
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  // The first lesson of Module 1 is open to anyone. The rest need access.
  const isFirstLesson = idx === 0;
  const locked = !hasAccess && !isFirstLesson;

  return (
    <div className="min-h-screen bg-cream">
      <CourseNav
        backHref="/certification"
        backLabel="Back to the program"
        title={certification.title}
        userName={session?.user?.firstName ?? session?.user?.username ?? null}
      />

      <Container size="reading" className="py-16 sm:py-24">
        {!hasAccess && isFirstLesson && (
          <div className="mb-10 rounded-soft border border-gold/40 bg-cream-warm px-6 py-5 text-sm text-sage-deep/85">
            You are previewing Lesson 1.1. The remaining seventeen lessons,
            your notes, and your saved progress are inside the full
            Certification Program —{" "}
            <Link
              href="/services#certification"
              className="underline hover:text-sage"
            >
              enrol for $497
            </Link>
            .
          </div>
        )}

        <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
          {mod.eyebrow} &middot; {mod.title}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.1] text-sage sm:text-6xl">
          {lesson.title}
        </h1>
        <p className="mt-4 text-sm text-sage-deep/60">{lesson.reading}</p>

        {locked ? (
          <div className="mt-14 rounded-soft border border-sage/20 bg-cream-warm p-8 text-center shadow-card">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
              Lesson locked
            </p>
            <h2 className="mt-3 font-serif text-3xl text-sage">
              This lesson opens with the full program.
            </h2>
            <p className="mt-4 text-sage-deep/85">
              Lesson 1.1 is open to everyone as a preview. The remaining
              seventeen lessons, the video recordings, the guided sessions,
              and your saved notes are inside the Certification Program.
            </p>
            <div className="mt-8">
              <Link
                href="/services#certification"
                className="inline-flex items-center justify-center rounded-soft bg-sage px-8 py-4 font-sans text-sm uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
              >
                Enrol — $497
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-12">
            <CourseBlocks blocks={lesson.blocks} />
          </div>
        )}

        <div className="mt-16 space-y-6">
          {hasAccess && userId && (
            <CompletionToggle
              courseSlug="certification"
              lessonSlug={lesson.slug}
              initialCompleted={Boolean(progress?.completed)}
            />
          )}

          <div className="flex items-stretch justify-between gap-4 pt-6">
            {prev ? (
              <Link
                href={`/certification/learn/${prev.module.slug}/${prev.lesson.slug}`}
                className="flex-1 rounded-soft border border-sage/20 bg-cream-warm px-5 py-4 hover:border-sage/50"
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/60">
                  Previous
                </p>
                <p className="mt-1 font-serif text-lg text-sage">
                  {prev.lesson.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {next ? (
              <Link
                href={`/certification/learn/${next.module.slug}/${next.lesson.slug}`}
                className="flex-1 rounded-soft border border-sage/20 bg-cream-warm px-5 py-4 text-right hover:border-sage/50"
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/60">
                  Next
                </p>
                <p className="mt-1 font-serif text-lg text-sage">
                  {next.lesson.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>

        {hasAccess && userId && (
          <LessonNotes
            courseSlug="certification"
            lessonSlug={lesson.slug}
            initialBody={note?.body ?? ""}
          />
        )}
      </Container>
    </div>
  );
}
