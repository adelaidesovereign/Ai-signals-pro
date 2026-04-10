import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FIELD_GUIDE_CHAPTERS } from "@/content/courses/field-guide";
import { flatLessons } from "@/content/courses/certification";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Your Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?next=/dashboard");
  }

  const userId = session.user.id;

  const [user, purchases, subs, progress, latestNotes, latestJournal] =
    await Promise.all([
      prisma.user.findUnique({ where: { id: userId } }),
      prisma.purchase.findMany({
        where: { userId, status: "PAID" },
        orderBy: { createdAt: "desc" },
      }),
      prisma.subscription.findMany({
        where: { userId, status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
      }),
      prisma.lessonProgress.findMany({ where: { userId } }),
      prisma.lessonNote.findMany({
        where: { userId },
        orderBy: { updatedAt: "desc" },
        take: 5,
      }),
      prisma.journalEntry.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ]);

  const fgCompleted = progress.filter(
    (p) => p.courseSlug === "field-guide" && p.completed,
  ).length;
  const certCompleted = progress.filter(
    (p) => p.courseSlug === "certification" && p.completed,
  ).length;

  const hasFieldGuide =
    purchases.some((p) => p.product === "FIELD_GUIDE") ||
    purchases.some((p) => p.product === "CERTIFICATION") ||
    subs.some((s) => s.product === "CERTIFICATION");
  const hasCertification =
    purchases.some((p) => p.product === "CERTIFICATION") ||
    subs.some((s) => s.product === "CERTIFICATION");
  const hasInnerCircle = subs.some((s) => s.product === "INNER_CIRCLE");

  const totalFgChapters = FIELD_GUIDE_CHAPTERS.length;
  const totalCertLessons = flatLessons().length;
  const firstName = user?.firstName ?? session.user.firstName ?? "friend";

  return (
    <div className="min-h-screen bg-cream">
      {/* Minimal header */}
      <header className="border-b border-sage/10 bg-cream/90 backdrop-blur-md">
        <Container size="wide">
          <div className="flex items-center justify-between py-5">
            <Link href="/" className="font-serif text-xl text-sage">
              Adelaide Taylor
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button
                type="submit"
                className="font-sans text-xs uppercase tracking-[0.15em] text-sage-deep hover:text-sage"
              >
                Sign out
              </button>
            </form>
          </div>
        </Container>
      </header>

      <Container size="wide" className="py-16 sm:py-24">
        {/* Welcome */}
        <section>
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
            Welcome back
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight text-sage sm:text-6xl">
            Hi, {firstName}.
          </h1>
          <p className="mt-4 max-w-prose text-lg text-sage-deep/85">
            Your place. Your work. Your notes are right where you left them.
            There is no catching up required. The practice is waiting quietly,
            and so am I.
          </p>
        </section>

        {/* Progress */}
        <section className="mt-14">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
            What is open in your account
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {hasFieldGuide && (
              <Link href="/field-guide">
                <Card className="h-full transition-shadow hover:shadow-soft">
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                    The Field Guide
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-sage">
                    Keep reading
                  </h3>
                  <p className="mt-3 text-sm text-sage-deep/70">
                    {fgCompleted} of {totalFgChapters} chapters read
                  </p>
                  <div className="mt-4 h-1 rounded-full bg-cream-deep">
                    <div
                      className="h-full rounded-full bg-sage"
                      style={{
                        width: `${(fgCompleted / totalFgChapters) * 100}%`,
                      }}
                    />
                  </div>
                </Card>
              </Link>
            )}

            {hasCertification && (
              <Link href="/certification">
                <Card className="h-full transition-shadow hover:shadow-soft">
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                    Certification Program
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-sage">
                    Return to the work
                  </h3>
                  <p className="mt-3 text-sm text-sage-deep/70">
                    {certCompleted} of {totalCertLessons} lessons complete
                  </p>
                  <div className="mt-4 h-1 rounded-full bg-cream-deep">
                    <div
                      className="h-full rounded-full bg-sage"
                      style={{
                        width: `${(certCompleted / totalCertLessons) * 100}%`,
                      }}
                    />
                  </div>
                </Card>
              </Link>
            )}

            {hasInnerCircle && (
              <Link href="/inner-circle">
                <Card className="h-full transition-shadow hover:shadow-soft">
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                    The Inner Circle
                  </p>
                  <h3 className="mt-3 font-serif text-2xl text-sage">
                    Open the room
                  </h3>
                  <p className="mt-3 text-sm text-sage-deep/70">
                    Live calls, the private feed, the Subliminals library
                  </p>
                </Card>
              </Link>
            )}

            {!hasFieldGuide && !hasCertification && !hasInnerCircle && (
              <Card className="md:col-span-3">
                <h3 className="font-serif text-2xl text-sage">
                  Nothing is open in your account yet.
                </h3>
                <p className="mt-3 text-sage-deep/85">
                  If you have not bought the Field Guide yet, that is the
                  shortest way into the framework. Whatever you choose, your
                  account will be here when you do.
                </p>
                <div className="mt-6">
                  <Button href="/services" variant="secondary">
                    See the three doorways
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </section>

        {/* Latest notes */}
        {latestNotes.length > 0 && (
          <section className="mt-16">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
              Your most recent notes
            </p>
            <div className="mt-5 space-y-3">
              {latestNotes.map((note) => (
                <Card key={note.id}>
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/60">
                        {note.courseSlug === "field-guide"
                          ? "Field Guide"
                          : "Certification"}
                      </p>
                      <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm text-sage-deep/85">
                        {note.body.slice(0, 400)}
                        {note.body.length > 400 ? "…" : ""}
                      </p>
                    </div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/50">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Journal preview */}
        <section className="mt-16">
          <div className="flex items-baseline justify-between">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
              Your journal
            </p>
            <Link
              href="/dashboard/journal"
              className="font-sans text-xs uppercase tracking-[0.15em] text-sage hover:text-sage-deep"
            >
              Open the journal
            </Link>
          </div>
          {latestJournal.length === 0 ? (
            <Card className="mt-5">
              <p className="text-sage-deep/85">
                Nothing written yet. The journal is for the things that do not
                belong to any single chapter or lesson — the observations, the
                shifts, the sentences you want to remember.
              </p>
              <div className="mt-5">
                <Button href="/dashboard/journal" variant="secondary" size="sm">
                  Write the first entry
                </Button>
              </div>
            </Card>
          ) : (
            <div className="mt-5 space-y-3">
              {latestJournal.map((entry) => (
                <Card key={entry.id}>
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      {entry.title && (
                        <p className="font-serif text-xl text-sage">
                          {entry.title}
                        </p>
                      )}
                      <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm text-sage-deep/85">
                        {entry.body.slice(0, 400)}
                      </p>
                    </div>
                    <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-sage-deep/50">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Account settings link */}
        <section className="mt-16">
          <Card>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                  Account
                </p>
                <h3 className="mt-2 font-serif text-2xl text-sage">
                  Settings, username, password
                </h3>
                <p className="mt-2 text-sm text-sage-deep/70">
                  {user?.email}
                </p>
              </div>
              <Button href="/dashboard/account" variant="secondary">
                Open settings
              </Button>
            </div>
          </Card>
        </section>
      </Container>
    </div>
  );
}
