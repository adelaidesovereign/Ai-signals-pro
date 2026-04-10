import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { certification, flatLessons } from "@/content/courses/certification";
import { CourseNav } from "@/components/courses/CourseNav";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "The Certification Program",
  description:
    "The Quantum Engineer Certification Program — six modules, eighteen lessons, the full installation work.",
};

async function userHasAccess(userId: string) {
  const purchase = await prisma.purchase.findFirst({
    where: { userId, product: "CERTIFICATION", status: "PAID" },
  });
  if (purchase) return true;
  const sub = await prisma.subscription.findFirst({
    where: { userId, product: "CERTIFICATION", status: "ACTIVE" },
  });
  return Boolean(sub);
}

export default async function CertificationIndex() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?next=/certification");
  }

  const hasAccess = await userHasAccess(session.user.id);
  const progress = await prisma.lessonProgress.findMany({
    where: { userId: session.user.id, courseSlug: "certification" },
  });
  const completed = new Set(
    progress.filter((p) => p.completed).map((p) => p.lessonSlug),
  );
  const total = flatLessons().length;

  return (
    <div className="min-h-screen bg-cream">
      <CourseNav
        backHref="/dashboard"
        backLabel="Dashboard"
        title={certification.title}
        userName={session.user.firstName ?? session.user.username}
      />

      <Container size="wide" className="py-16 sm:py-24">
        {!hasAccess && (
          <div className="mb-10 rounded-soft border border-gold/40 bg-cream-warm px-6 py-5 text-sm text-sage-deep/85">
            The Certification Program is not yet open in your account.{" "}
            <Link
              href="/services#certification"
              className="underline hover:text-sage"
            >
              Open the door to the full program
            </Link>{" "}
            and every lesson unlocks the same day.
          </div>
        )}

        <div className="max-w-3xl">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
            Certification Program
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight text-sage sm:text-6xl">
            {certification.title}
          </h1>
          <p className="mt-5 text-lg text-sage-deep/85">
            {certification.tagline}
          </p>
          <p className="mt-4 text-sm text-sage-deep/60">
            {completed.size} of {total} lessons complete
          </p>
          <div className="mt-6 h-1 w-full max-w-md rounded-full bg-cream-deep">
            <div
              className="h-full rounded-full bg-sage transition-all duration-500"
              style={{ width: `${(completed.size / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="mt-20 space-y-14">
          {certification.modules.map((mod, i) => (
            <section key={mod.slug}>
              <div className="flex items-baseline gap-6">
                <p className="font-serif text-5xl text-sage/40">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div className="flex-1">
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                    {mod.eyebrow}
                  </p>
                  <h2 className="mt-2 font-serif text-3xl text-sage sm:text-4xl">
                    {mod.title}
                  </h2>
                  <p className="mt-3 max-w-prose text-sage-deep/85">
                    {mod.summary}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {mod.lessons.map((lesson) => {
                  const done = completed.has(lesson.slug);
                  const href = hasAccess
                    ? `/certification/learn/${mod.slug}/${lesson.slug}`
                    : "/services#certification";
                  return (
                    <Link
                      key={lesson.slug}
                      href={href}
                      className="group rounded-soft border border-sage/15 bg-cream-warm p-5 transition-all hover:border-sage/40 hover:shadow-card"
                    >
                      <div className="flex items-start justify-between">
                        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage">
                          {lesson.eyebrow}
                        </p>
                        {done && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage text-cream-warm">
                            <svg
                              className="h-3 w-3"
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
                        )}
                      </div>
                      <p className="mt-3 font-serif text-xl leading-snug text-sage">
                        {lesson.title}
                      </p>
                      <p className="mt-3 font-sans text-xs text-sage-deep/60">
                        {lesson.reading}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
