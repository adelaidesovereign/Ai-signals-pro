import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-deep/60" />
        <Container size="wide" className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
              Adelaide Taylor
            </p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-sage sm:text-6xl lg:text-7xl">
              Reality is not fixed.
              <br />
              Your brain is running a program.
              <br />
              <span className="text-sage-deep">
                I teach you how to rewrite it.
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-sage-deep/85 sm:text-xl">
              Not manifestation. Mechanism. The science of coming home to who
              you actually are.
            </p>
            <p className="mx-auto mt-5 max-w-xl text-base italic text-sage-deep/70">
              This is not a program you complete. It is a remembering. You are
              not broken. You were never broken. You have been asleep to
              yourself, and this is the way back.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/services" size="lg">
                Come home to yourself
              </Button>
              <Button href="/quiz" variant="secondary" size="lg">
                Where am I stuck?
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <div className="hairline mx-auto max-w-4xl" />

      {/* Three doorways */}
      <section className="py-24 sm:py-32">
        <Container size="wide">
          <SectionHeading
            eyebrow="Three doorways home"
            title="Whichever one you walk through, you are walking toward yourself."
            align="center"
          >
            <p>
              These are not products. They are three rooms, at three depths,
              for three different points in the same remembering. Choose the
              one that meets you where you actually are right now. If none of
              them feels true, none of them is for you yet.
            </p>
          </SectionHeading>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Card>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
                The first doorway
              </p>
              <h3 className="mt-3 font-serif text-2xl text-sage">
                I want to understand the system.
              </h3>
              <p className="mt-4 text-sage-deep/85">
                The Field Guide is the whole map — thirteen layers, in order,
                written to read in a few quiet hours. By the end, you will
                not have a new technique. You will have seen yourself.
              </p>
              <div className="mt-8">
                <Button href="/services#field-guide" variant="secondary">
                  Field Guide — $27
                </Button>
              </div>
            </Card>

            <Card className="border-sage/30">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
                The deeper doorway
              </p>
              <h3 className="mt-3 font-serif text-2xl text-sage">
                I am ready to come home to who I actually am.
              </h3>
              <p className="mt-4 text-sage-deep/85">
                The Certification Program is six modules of the real work.
                Root belief finding. Theta installation. The daily protocol.
                The unhurried return to the person you were before fear told
                you to be smaller.
              </p>
              <div className="mt-8">
                <Button href="/services#certification">
                  Certification — $497
                </Button>
              </div>
            </Card>

            <Card>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
                The ongoing doorway
              </p>
              <h3 className="mt-3 font-serif text-2xl text-sage">
                I want people for the long walk home.
              </h3>
              <p className="mt-4 text-sage-deep/85">
                The Inner Circle is a small, private room of people practising
                the same return. Monthly live calls. A feed for the questions
                that do not belong anywhere else. A soft place to be exactly
                who you are.
              </p>
              <div className="mt-8">
                <Button href="/services#inner-circle" variant="secondary">
                  Inner Circle — $97/mo
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Origin story */}
      <section className="bg-cream-deep/60 py-24 sm:py-32">
        <Container size="narrow">
          <div className="space-y-8">
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
              The reason this exists
            </p>
            <h2 className="font-serif text-4xl leading-tight text-sage sm:text-5xl">
              Seventeen years of therapy gave me coping mechanisms. The
              breakdowns kept coming.
            </h2>
            <div className="space-y-5 text-lg text-sage-deep/90">
              <p>
                Because coping never touches the root. The root is always
                identity. I was running a program that was never mine.
              </p>
              <p>
                I had brilliant therapists. I did real work. I built a
                catalogue of tools for managing the crisis of the moment. And
                the same crisis kept returning in a new costume.
              </p>
              <p>
                The framework in the Field Guide is what actually changed
                things. Not because it's clever. Because it works at the layer
                the pattern was built on.
              </p>
            </div>
            <div className="pt-4">
              <Button href="/about" variant="secondary">
                Read the full story
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What makes this different */}
      <section className="py-24 sm:py-32">
        <Container size="wide">
          <SectionHeading
            eyebrow="What this is not"
            title="Not coping. Not positive thinking."
          >
            <p>
              This is the mechanism of subconscious reprogramming, backed by
              documented science. Every claim is traceable. Every practice is
              built on something you can read the paper on.
            </p>
          </SectionHeading>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "The CIA Gateway Process",
                body: "The 1983 classified report, declassified in 2003, documenting how specific brainwave states grant access to subconscious reprogramming at a fundamental level.",
              },
              {
                title: "Memory Reconsolidation",
                body: "The Nader, Schafe, LeDoux (2000) research proving that consolidated memories can be permanently rewritten under specific, reproducible conditions.",
              },
              {
                title: "HeartMath research",
                body: "Peer-reviewed findings on the heart's electromagnetic field and the measurable coherence effect between heart and brain.",
              },
              {
                title: "Penrose-Hameroff Orch-OR",
                body: "A theory of consciousness grounded in quantum processes within the brain's microtubules — not mystical, physical.",
              },
              {
                title: "Free Energy Principle",
                body: "Karl Friston's unifying theory of how the brain generates experience by minimising prediction error — the mathematical backbone of why the RAS filters the way it does.",
              },
              {
                title: "AIP Advances 2025",
                body: "The recent peer-reviewed paper proposing consciousness as a foundational field — the physics catching up to what the practice has shown for decades.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <h3 className="font-serif text-2xl text-sage">{item.title}</h3>
                <p className="mt-3 text-sage-deep/85">{item.body}</p>
              </Card>
            ))}
          </div>

          <p className="mx-auto mt-14 max-w-prose text-center text-sage-deep/70">
            Every source referenced here is public. None of this is secret. It
            just has not been put together in one place, in the right order,
            before.
          </p>
        </Container>
      </section>

      {/* Testimonials placeholder */}
      <section className="bg-cream-deep/60 py-24">
        <Container size="narrow">
          <SectionHeading
            eyebrow="In their own words"
            title="From students doing the work"
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Card key={i}>
                <p className="font-serif text-xl leading-relaxed text-sage-deep/90">
                  "A quote from a real student will live here as soon as the
                  first cohort completes the Certification Program. Adelaide
                  will only publish what's true."
                </p>
                <p className="mt-6 font-sans text-xs uppercase tracking-[0.15em] text-sage">
                  Student — Certification Program
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <Container size="narrow">
          <div className="rounded-soft bg-cream-warm p-10 text-center shadow-card sm:p-16">
            <h2 className="font-serif text-4xl text-sage sm:text-5xl">
              Who are you when no one is watching?
            </h2>
            <p className="mx-auto mt-6 max-w-prose text-lg text-sage-deep/85">
              That person is not a fantasy. She is who you were before fear
              told you to be smaller. The Field Guide is the first step back to
              her.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/services#field-guide" size="lg">
                Begin the Field Guide — $27
              </Button>
              <Link
                href="/quiz"
                className="font-sans text-sm underline underline-offset-4 hover:text-sage"
              >
                Or find your specific layer first
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
