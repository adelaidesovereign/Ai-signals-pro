import Link from "next/link";
import type { Metadata } from "next";
import { MEDITATIONS } from "@/content/meditations";
import { SiteShell } from "@/components/site/SiteShell";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Guided Meditations",
  description:
    "A library of guided meditations — voice, theta audio, and the framework — that take you from settled to installed in one sitting.",
};

export default function MeditationsPage() {
  return (
    <SiteShell>
      <section className="pt-20 pb-14">
        <Container size="narrow">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
            Guided meditations
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight text-sage sm:text-6xl">
            A room you step into, held by her voice.
          </h1>
          <p className="mt-6 max-w-prose text-lg text-sage-deep/85">
            Each meditation is a full guided descent: the body settles, the
            breath drops you toward theta, and the specific rewiring work of
            the framework happens in a paced, spoken, somatic experience. The
            voice guides you. The theta audio holds the state. You do not
            have to remember the steps. You do not have to do anything
            except listen and feel.
          </p>
          <p className="mt-4 max-w-prose text-sm text-sage-deep/65">
            For the best experience, use headphones in a quiet room. Close
            your eyes. Let the practice become whatever it needs to become.
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container size="wide">
          <div className="grid gap-6 md:grid-cols-2">
            {MEDITATIONS.map((m) => (
              <Link key={m.slug} href={`/meditations/${m.slug}`}>
                <Card className="h-full transition-all hover:shadow-soft">
                  <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
                    {m.durationMinutes} minutes &middot; theta{" "}
                    {m.beatFrequency} Hz
                  </p>
                  <h2 className="mt-3 font-serif text-2xl leading-snug text-sage">
                    {m.title}
                  </h2>
                  <p className="mt-2 font-sans text-sm italic text-sage-deep/70">
                    {m.subtitle}
                  </p>
                  <p className="mt-4 text-sage-deep/85">{m.intention}</p>
                  <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.15em] text-sage">
                    Begin &rarr;
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
