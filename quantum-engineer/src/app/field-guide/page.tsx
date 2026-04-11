import Link from "next/link";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { fieldGuide, FIELD_GUIDE_CHAPTERS } from "@/content/courses/field-guide";
import { CourseNav } from "@/components/courses/CourseNav";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "The Field Guide",
  description:
    "The Quantum Engineer Field Guide — the whole map, in order, in your own private reader.",
};

async function userHasAccess(userId: string) {
  const purchase = await prisma.purchase.findFirst({
    where: { userId, product: "FIELD_GUIDE", status: "PAID" },
  });
  if (purchase) return true;
  const certPurchase = await prisma.purchase.findFirst({
    where: { userId, product: "CERTIFICATION", status: "PAID" },
  });
  if (certPurchase) return true;
  const certSub = await prisma.subscription.findFirst({
    where: { userId, product: "CERTIFICATION", status: "ACTIVE" },
  });
  return Boolean(certSub);
}

export default async function FieldGuideIndex() {
  const session = await auth();

  // Anyone can browse the table of contents and the first chapter. Only
  // signed-in users with a paid purchase get chapters 2+ and saved progress.
  const hasAccess = session?.user?.id
    ? await userHasAccess(session.user.id)
    : false;
  const progress = session?.user?.id
    ? await prisma.lessonProgress.findMany({
        where: { userId: session.user.id, courseSlug: "field-guide" },
      })
    : [];
  const completedBySlug = new Map(
    progress.filter((p) => p.completed).map((p) => [p.lessonSlug, true]),
  );
  const completedCount = completedBySlug.size;
  const totalChapters = FIELD_GUIDE_CHAPTERS.length;

  return (
    <div className="min-h-screen bg-cream">
      <CourseNav
        backHref={session?.user?.id ? "/dashboard" : "/"}
        backLabel={session?.user?.id ? "Dashboard" : "Home"}
        title={fieldGuide.title}
        userName={session?.user?.firstName ?? session?.user?.username ?? null}
      />

      <Container size="narrow" className="py-16 sm:py-24">
        {!hasAccess && (
          <div className="mb-10 rounded-soft border border-gold/40 bg-cream-warm px-6 py-5 text-sm text-sage-deep/85">
            You are previewing the Field Guide. To read every chapter and
            save your notes,{" "}
            <Link
              href="/services#field-guide"
              className="underline hover:text-sage"
            >
              open your account to it here
            </Link>
            . The first chapter stays open either way.
          </div>
        )}

        <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
          The Field Guide
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-tight text-sage sm:text-6xl">
          {fieldGuide.title}
        </h1>
        <p className="mt-5 max-w-prose text-lg text-sage-deep/85">
          {fieldGuide.tagline}
        </p>
        <p className="mt-4 text-sm text-sage-deep/65">
          {completedCount} of {totalChapters} chapters read. Your place holds
          itself between sessions.
        </p>

        <div className="mt-8">
          <div className="h-1 w-full rounded-full bg-cream-deep">
            <div
              className="h-full rounded-full bg-sage transition-all duration-500"
              style={{
                width: `${(completedCount / totalChapters) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="mt-16 space-y-3">
          {FIELD_GUIDE_CHAPTERS.map((chapter, i) => {
            const locked = !hasAccess && i > 0;
            const done = completedBySlug.has(chapter.slug);
            return (
              <Link
                key={chapter.slug}
                href={`/field-guide/read/${chapter.slug}`}
                className="group block rounded-soft border border-sage/15 bg-cream-warm px-6 py-5 transition-all hover:border-sage/40 hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                      {chapter.eyebrow}
                    </p>
                    <h2 className="mt-2 font-serif text-2xl text-sage">
                      {chapter.title}
                    </h2>
                    <p className="mt-2 text-sm text-sage-deep/70">
                      {chapter.reading}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {locked ? (
                      <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/60">
                        Preview
                      </span>
                    ) : done ? (
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage text-cream-warm">
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12l5 5L20 7" />
                        </svg>
                      </span>
                    ) : (
                      <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/60 transition-colors group-hover:text-sage">
                        Read
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
