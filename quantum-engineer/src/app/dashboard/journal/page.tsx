import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { JournalEditor } from "./JournalEditor";

export const metadata: Metadata = { title: "Journal" };

export default async function JournalPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?next=/dashboard/journal");
  }
  const entries = await prisma.journalEntry.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-sage/10 bg-cream/90 backdrop-blur-md">
        <Container size="wide">
          <div className="flex items-center justify-between py-5">
            <Link
              href="/dashboard"
              className="font-sans text-xs uppercase tracking-[0.15em] text-sage-deep hover:text-sage"
            >
              &larr; Dashboard
            </Link>
            <p className="font-serif text-lg text-sage">Your journal</p>
            <span />
          </div>
        </Container>
      </header>

      <Container size="narrow" className="py-16 sm:py-20">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
          Private to you
        </p>
        <h1 className="mt-4 font-serif text-5xl text-sage sm:text-6xl">
          Your journal.
        </h1>
        <p className="mt-4 max-w-prose text-lg text-sage-deep/85">
          A page for the sentences that do not belong to any single chapter.
          What shifted today. What the old version did. What the new version
          noticed. No one else sees this. Ever.
        </p>

        <div className="mt-12">
          <JournalEditor
            initialEntries={entries.map((e) => ({
              id: e.id,
              title: e.title ?? "",
              body: e.body,
              createdAt: e.createdAt.toISOString(),
            }))}
          />
        </div>
      </Container>
    </div>
  );
}
