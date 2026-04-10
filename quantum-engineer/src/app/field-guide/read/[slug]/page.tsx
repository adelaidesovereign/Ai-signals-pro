import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FIELD_GUIDE_CHAPTERS, fieldGuide } from "@/content/courses/field-guide";
import { CourseNav } from "@/components/courses/CourseNav";
import { CourseBlocks } from "@/components/courses/CourseBlocks";
import { LessonNotes } from "@/components/courses/LessonNotes";
import { CompletionToggle } from "@/components/courses/CompletionToggle";
import { Container } from "@/components/ui/Container";

type Props = { params: { slug: string } };

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const chapter = FIELD_GUIDE_CHAPTERS.find((c) => c.slug === params.slug);
  return {
    title: chapter ? chapter.title : "Field Guide",
  };
}

export async function generateStaticParams() {
  return FIELD_GUIDE_CHAPTERS.map((c) => ({ slug: c.slug }));
}

export default async function FieldGuideChapterPage({ params }: Props) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/login?next=/field-guide/read/${params.slug}`);
  }

  const chapterIndex = FIELD_GUIDE_CHAPTERS.findIndex(
    (c) => c.slug === params.slug,
  );
  if (chapterIndex === -1) notFound();
  const chapter = FIELD_GUIDE_CHAPTERS[chapterIndex];
  const prev = FIELD_GUIDE_CHAPTERS[chapterIndex - 1];
  const next = FIELD_GUIDE_CHAPTERS[chapterIndex + 1];

  const [purchase, certPurchase, certSub, progress, note] = await Promise.all([
    prisma.purchase.findFirst({
      where: { userId: session.user.id, product: "FIELD_GUIDE", status: "PAID" },
    }),
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
          courseSlug: "field-guide",
          lessonSlug: chapter.slug,
        },
      },
    }),
    prisma.lessonNote.findFirst({
      where: {
        userId: session.user.id,
        courseSlug: "field-guide",
        lessonSlug: chapter.slug,
      },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  const hasAccess = Boolean(purchase || certPurchase || certSub);
  if (!hasAccess && chapterIndex > 0) {
    redirect("/services#field-guide");
  }

  return (
    <div className="min-h-screen bg-cream">
      <CourseNav
        backHref="/field-guide"
        backLabel="Back to the guide"
        title={fieldGuide.title}
        userName={session.user.firstName ?? session.user.username}
      />

      <Container size="reading" className="py-16 sm:py-24">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
          {chapter.eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.1] text-sage sm:text-6xl">
          {chapter.title}
        </h1>
        <p className="mt-4 text-sm text-sage-deep/60">{chapter.reading}</p>

        <div className="mt-14">
          <CourseBlocks blocks={chapter.blocks} />
        </div>

        <div className="mt-16 space-y-6">
          <CompletionToggle
            courseSlug="field-guide"
            lessonSlug={chapter.slug}
            initialCompleted={Boolean(progress?.completed)}
          />

          <div className="flex items-center justify-between gap-4 pt-6">
            {prev ? (
              <Link
                href={`/field-guide/read/${prev.slug}`}
                className="flex-1 rounded-soft border border-sage/20 bg-cream-warm px-5 py-4 text-left hover:border-sage/50"
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/60">
                  Previous
                </p>
                <p className="mt-1 font-serif text-lg text-sage">
                  {prev.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {next ? (
              <Link
                href={`/field-guide/read/${next.slug}`}
                className="flex-1 rounded-soft border border-sage/20 bg-cream-warm px-5 py-4 text-right hover:border-sage/50"
              >
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/60">
                  Next
                </p>
                <p className="mt-1 font-serif text-lg text-sage">
                  {next.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>

        <LessonNotes
          courseSlug="field-guide"
          lessonSlug={chapter.slug}
          initialBody={note?.body ?? ""}
        />
      </Container>
    </div>
  );
}
