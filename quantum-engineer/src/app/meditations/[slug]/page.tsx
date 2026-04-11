import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MEDITATIONS, findMeditation } from "@/content/meditations";
import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/ui/Container";
import { GuidedMeditationPlayer } from "@/components/meditation/GuidedMeditationPlayer";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = findMeditation(params.slug);
  return {
    title: m ? m.title : "Meditation",
    description: m ? m.intention : undefined,
  };
}

export async function generateStaticParams() {
  return MEDITATIONS.map((m) => ({ slug: m.slug }));
}

export default function MeditationPlayerPage({ params }: Props) {
  const meditation = findMeditation(params.slug);
  if (!meditation) notFound();

  const currentIndex = MEDITATIONS.findIndex((m) => m.slug === meditation.slug);
  const prev = currentIndex > 0 ? MEDITATIONS[currentIndex - 1] : null;
  const next =
    currentIndex < MEDITATIONS.length - 1 ? MEDITATIONS[currentIndex + 1] : null;

  return (
    <SiteShell>
      <Container size="narrow" className="py-16">
        <Link
          href="/meditations"
          className="font-sans text-xs uppercase tracking-[0.15em] text-sage-deep/70 hover:text-sage"
        >
          &larr; All meditations
        </Link>

        <div className="mt-10">
          <GuidedMeditationPlayer meditation={meditation} />
        </div>

        <div className="mt-10 flex items-stretch justify-between gap-4">
          {prev ? (
            <Link
              href={`/meditations/${prev.slug}`}
              className="flex-1 rounded-soft border border-sage/20 bg-cream-warm px-5 py-4 hover:border-sage/50"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/60">
                Previous
              </p>
              <p className="mt-1 font-serif text-lg text-sage">{prev.title}</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {next ? (
            <Link
              href={`/meditations/${next.slug}`}
              className="flex-1 rounded-soft border border-sage/20 bg-cream-warm px-5 py-4 text-right hover:border-sage/50"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/60">
                Next
              </p>
              <p className="mt-1 font-serif text-lg text-sage">{next.title}</p>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </Container>
    </SiteShell>
  );
}
