import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { FIELD_GUIDE_CHAPTERS } from "@/content/courses/field-guide";
import { flatLessons } from "@/content/courses/certification";

export const metadata: Metadata = {
  title: "Your Certificate",
};

export default async function CertificatePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?next=/certificate");

  const [user, progress] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.user.id } }),
    prisma.lessonProgress.findMany({ where: { userId: session.user.id } }),
  ]);

  const fgDone = progress.filter(
    (p) => p.courseSlug === "field-guide" && p.completed,
  ).length;
  const certDone = progress.filter(
    (p) => p.courseSlug === "certification" && p.completed,
  ).length;
  const totalFg = FIELD_GUIDE_CHAPTERS.length;
  const totalCert = flatLessons().length;

  const name = user?.firstName
    ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ""}`
    : user?.username ?? "Student";

  const completedFieldGuide = fgDone >= totalFg;
  const completedCertification = certDone >= totalCert;
  const today = new Date().toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Print styles hide everything except the certificate */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body { background: white !important; }
              .no-print { display: none !important; }
              .certificate { box-shadow: none !important; border: none !important; }
            }
          `,
        }}
      />

      <div className="no-print border-b border-sage/10 bg-cream/90 px-6 py-5 text-center">
        <p className="text-sm text-sage-deep/75">
          To save as PDF: press <strong>Cmd+P</strong> (Mac) or{" "}
          <strong>Ctrl+P</strong> (Windows), then select "Save as PDF" as
          the destination.
        </p>
      </div>

      <div className="flex min-h-[85vh] items-center justify-center p-8">
        <div className="certificate w-full max-w-2xl rounded-soft border border-gold/30 bg-cream-warm p-12 text-center shadow-card sm:p-16">
          {/* Top ornament */}
          <div className="mx-auto h-px w-20 bg-gold/60" />

          <p className="mt-8 font-sans text-[10px] uppercase tracking-[0.35em] text-gold">
            Certificate of Completion
          </p>

          <h1 className="mt-6 font-serif text-4xl text-sage sm:text-5xl">
            {name}
          </h1>

          <p className="mt-6 text-base text-sage-deep/85">
            has completed
          </p>

          {completedCertification && (
            <p className="mt-4 font-serif text-2xl text-sage">
              The Quantum Engineer Certification Program
            </p>
          )}
          {completedFieldGuide && !completedCertification && (
            <p className="mt-4 font-serif text-2xl text-sage">
              The Quantum Engineer Field Guide
            </p>
          )}
          {!completedFieldGuide && !completedCertification && (
            <p className="mt-4 font-serif text-xl text-sage-deep/75">
              You have not yet completed either program. Keep going —
              your certificate will be here when you finish.
            </p>
          )}

          {(completedFieldGuide || completedCertification) && (
            <>
              <p className="mt-6 max-w-md mx-auto text-sm text-sage-deep/75">
                Eight modules. Twenty-eight lessons. The full arc from
                safety to installation to living as the person you were
                before fear told you to be smaller. The work is now
                yours. The practice is daily. The return is the practice.
              </p>

              <div className="mx-auto mt-10 h-px w-20 bg-gold/60" />

              <div className="mt-8 flex items-center justify-center gap-12">
                <div>
                  <p className="font-serif text-xl italic text-sage">
                    Adelaide Taylor
                  </p>
                  <p className="mt-1 font-sans text-[9px] uppercase tracking-[0.2em] text-sage-deep/60">
                    The Quantum Engineer
                  </p>
                </div>
                <div>
                  <p className="font-serif text-base text-sage-deep/85">
                    {today}
                  </p>
                  <p className="mt-1 font-sans text-[9px] uppercase tracking-[0.2em] text-sage-deep/60">
                    Date of completion
                  </p>
                </div>
              </div>

              <p className="mt-10 font-sans text-[9px] uppercase tracking-[0.2em] text-sage-deep/50">
                ShesAdelaide.com
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
