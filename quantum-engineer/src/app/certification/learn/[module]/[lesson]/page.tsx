import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
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

export default async function CertificationLessonPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(
      `/login?next=/certification/learn/${params.module}/${params.lesson}`,
    );
  }

  const found = findCertificationLesson(params.module, params.lesson);
  if (!found) notFound();
  const { module: mod, lesson } = found;

  const [purchase, sub, progress, note] = await Promise.all([
    prisma.purchase.findFirst({
      where: { userId: session.user.id, product: "CERTIFICATION", status: "PAID" },
    }),
    prisma.subscription.findFirst({
      where: { userId: session.user.id, product: "CERTIFICATION", status: "ACTIVE" },
    }),
    prisma.lessonProgress.findUnique({
      where: {
        userId_courseSlug_lessonSlug: {
          userId: session.user.id,
          courseSlug: "certification",
          lessonSlug: lesson.slug,
        },
      },
    }),
    prisma.lessonNote.findFirst({
      where: {
        userId: session.user.id,
        courseSlug: "certification",
        lessonSlug: lesson.slug,
      },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const hasAccess = Boolean(purchase || sub);
  if (!hasAccess) {
    redirect("/services#certification");
  }

  // Find prev/next lesson across modules.
  const all = flatLessons();
  const idx = all.findIndex(
    (x) => x.module.slug === mod.slug && x.lesson.slug === lesson.slug,
  );
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <div className="min-h-screen bg-cream">
      <CourseNav
        backHref="/certification"
        backLabel="Back to the program"
        title={certification.title}
        userName={session.user.firstName ?? session.user.username}
      />

      <Container size="reading" className="py-16 sm:py-24">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
          {mod.eyebrow} &middot; {mod.title}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.1] text-sage sm:text-6xl">
          {lesson.title}
        </h1>
        <p className="mt-4 text-sm text-sage-deep/60">{lesson.reading}</p>

        <div className="mt-12">
          <CourseBlocks blocks={lesson.blocks} />
        </div>

        <div className="mt-16 space-y-6">
          <CompletionToggle
            courseSlug="certification"
            lessonSlug={lesson.slug}
            initialCompleted={Boolean(progress?.completed)}
          />

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

        <LessonNotes
          courseSlug="certification"
          lessonSlug={lesson.slug}
          initialBody={note?.body ?? ""}
        />
      </Container>
    </div>
  );
}
