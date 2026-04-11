import Link from "next/link";
import { notFound } from "next/navigation";
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

async function userHasAccess(userId: string) {
  const [purchase, certPurchase, certSub] = await Promise.all([
    prisma.purchase.findFirst({
      where: { userId, product: "FIELD_GUIDE", status: "PAID" },
    }),
    prisma.purchase.findFirst({
      where: { userId, product: "CERTIFICATION", status: "PAID" },
    }),
    prisma.subscription.findFirst({
      where: { userId, product: "CERTIFICATION", status: "ACTIVE" },
    }),
  ]);
  return Boolean(purchase || certPurchase || certSub);
}

export default async function FieldGuideChapterPage({ params }: Props) {
  const session = await auth();
  const userId = session?.user?.id;

  const chapterIndex = FIELD_GUIDE_CHAPTERS.findIndex(
    (c) => c.slug === params.slug,
  );
  if (chapterIndex === -1) notFound();
  const chapter = FIELD_GUIDE_CHAPTERS[chapterIndex];
  const prev = FIELD_GUIDE_CHAPTERS[chapterIndex - 1];
  const next = FIELD_GUIDE_CHAPTERS[chapterIndex + 1];

  const hasAccess = userId ? await userHasAccess(userId) : false;

  const [progress, note] = userId
    ? await Promise.all([
        prisma.lessonProgress.findUnique({
          where: {
            userId_courseSlug_lessonSlug: {
              userId,
              courseSlug: "field-guide",
              lessonSlug: chapter.slug,
            },
          },
        }),
        prisma.lessonNote.findFirst({
          where: {
            userId,
            courseSlug: "field-guide",
            lessonSlug: chapter.slug,
          },
          orderBy: { updatedAt: "desc" },
        }),
      ])
    : [null, null];

  // Anyone can read Chapter 1 (index 0). Everything else needs paid access.
  const isFirstChapter = chapterIndex === 0;
  const locked = !hasAccess && !isFirstChapter;

  return (
    <div className="min-h-screen bg-cream">
      <CourseNav
        backHref="/field-guide"
        backLabel="Back to the guide"
        title={fieldGuide.title}
        userName={session?.user?.firstName ?? session?.user?.username ?? null}
      />

      <Container size="reading" className="py-16 sm:py-24">
        {!hasAccess && isFirstChapter && (
          <div className="mb-10 rounded-soft border border-gold/40 bg-cream-warm px-6 py-5 text-sm text-sage-deep/85">
            You are reading Chapter 1 as a preview. The rest of the chapters,
            your private notes, and your saved progress are inside the full
            Field Guide —{" "}
            <Link
              href="/services#field-guide"
              className="underline hover:text-sage"
            >
              open the whole thing for $27
            </Link>
            .
          </div>
        )}

        <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
          {chapter.eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.1] text-sage sm:text-6xl">
          {chapter.title}
        </h1>
        <p className="mt-4 text-sm text-sage-deep/60">{chapter.reading}</p>

        {locked ? (
          <div className="mt-14 rounded-soft border border-sage/20 bg-cream-warm p-8 text-center shadow-card">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
              Chapter locked
            </p>
            <h2 className="mt-3 font-serif text-3xl text-sage">
              This chapter opens with the full Field Guide.
            </h2>
            <p className="mt-4 text-sage-deep/85">
              The first chapter is open to everyone. The remaining fourteen
              are inside the Field Guide, along with your private notes and
              progress.
            </p>
            <div className="mt-8">
              <Link
                href="/services#field-guide"
                className="inline-flex items-center justify-center rounded-soft bg-sage px-8 py-4 font-sans text-sm uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep"
              >
                Open the Field Guide — $27
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-14">
            <CourseBlocks blocks={chapter.blocks} />
          </div>
        )}

        <div className="mt-16 space-y-6">
          {hasAccess && userId && (
            <CompletionToggle
              courseSlug="field-guide"
              lessonSlug={chapter.slug}
              initialCompleted={Boolean(progress?.completed)}
            />
          )}

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

        {hasAccess && userId && (
          <LessonNotes
            courseSlug="field-guide"
            lessonSlug={chapter.slug}
            initialBody={note?.body ?? ""}
          />
        )}
      </Container>
    </div>
  );
}
