import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

const EVIDENCE = [
  {
    year: "1983 · Declassified 2003",
    title: "The CIA Gateway Process Report",
    body: "The U.S. Army commissioned the CIA to investigate whether consciousness could alter physical reality. The classified finding: it can. The report documents specific brainwave protocols for accessing states where identity restructuring becomes possible. This is Layer 8 of the framework.",
  },
  {
    year: "2000 · Nader, Schafe, LeDoux",
    title: "Memory Reconsolidation",
    body: "Peer-reviewed research proving that consolidated memories can be permanently rewritten under specific, reproducible conditions. Not a metaphor for change — the exact neurobiological mechanism that makes identity-level rewiring possible.",
  },
  {
    year: "Quantum Biology",
    title: "Penrose-Hameroff Orch-OR Theory",
    body: "Consciousness arises from quantum computations in microtubules within neurons. Not metaphor. Measurable quantum processes occurring in your biology right now. This is the mechanism behind Layer 1.",
  },
  {
    year: "Neuroscience",
    title: "Karl Friston's Free Energy Principle",
    body: "Your brain is a prediction machine. It constructs reality based on prior beliefs and minimises surprise. Change the predictions, change the reality your brain constructs. This is the neuroscience underneath every layer.",
  },
  {
    year: "Peer-reviewed · HeartMath",
    title: "The Heart's Electromagnetic Field",
    body: "Decades of peer-reviewed findings on the heart's electromagnetic field and the measurable coherence effect between heart and brain. The signature you are broadcasting is not metaphorical — it is electromagnetic, and it can be measured several feet from the body.",
  },
  {
    year: "2025 · Peer-Reviewed",
    title: "Consciousness as a Foundational Field",
    body: "Published in AIP Advances. Evidence that consciousness is not a byproduct of brain activity but a foundational field that physical reality emerges from. The framework was built on this premise years before the paper confirmed it.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero — 2-column: photo left, text right */}
      <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-deep/50" />
        <Container size="wide" className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <div className="photo-frame order-1 aspect-[4/5] w-full max-w-md justify-self-center lg:order-none lg:max-w-none">
              <Image
                src="/images/addiepower.png"
                alt="Adelaide Taylor"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="order-2 text-center lg:order-none lg:text-left">
              <p className="font-sans text-xs uppercase tracking-[0.28em] text-sage">
                The Quantum Engineer
              </p>
              <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-sage sm:text-6xl lg:text-7xl">
                Reality is not fixed.
                <br />
                Your brain is running
                <br />
                <span className="italic text-sage-deep">a program.</span>
              </h1>
              <p className="mx-auto mt-8 max-w-xl text-xl text-sage-deep/85 lg:mx-0">
                I teach you how to rewrite it.
              </p>
              <p className="mx-auto mt-5 max-w-xl text-base italic text-sage-deep/70 lg:mx-0">
                Not manifestation. Mechanism. The science of coming home to
                who you actually are.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Button href="/begin" size="lg">
                  Come home to yourself
                </Button>
                <Button href="/quiz" variant="secondary" size="lg">
                  Where am I stuck?
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Positioning statement */}
      <section className="bg-cream-deep/60 py-20 sm:py-24">
        <Container size="narrow">
          <div className="text-center">
            <div className="gold-rule mx-auto mb-10 w-40" />
            <p className="font-serif text-2xl leading-relaxed text-sage-deep sm:text-3xl">
              Adelaide Taylor teaches the intersection of quantum physics,
              neuroscience, CIA-documented consciousness research, and Human
              Design as a precise system for engineering identity and reality.
            </p>
            <p className="mt-8 font-serif text-xl italic text-sage sm:text-2xl">
              Not manifestation. Mechanism.
            </p>
            <div className="gold-rule mx-auto mt-10 w-40" />
          </div>
        </Container>
      </section>

      {/* Meet Adelaide — photo + bio */}
      <section className="py-24 sm:py-32">
        <Container size="wide">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <div className="photo-frame aspect-[4/5] w-full max-w-md justify-self-center lg:max-w-none">
              <Image
                src="/images/addiechin.png"
                alt="Adelaide Taylor"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.28em] text-sage">
                Meet Adelaide
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-sage sm:text-5xl">
                Entrepreneur. Researcher.{" "}
                <span className="italic text-gold">Quantum Engineer.</span>
              </h2>
              <div className="gold-rule-left mt-6" />
              <div className="mt-8 space-y-5 text-lg leading-relaxed text-sage-deep/90">
                <p>
                  She built the thirteen-layer framework from thousands of
                  hours of peer-reviewed research in quantum physics,
                  neuroscience, and consciousness studies. Cross-referencing
                  classified government documents with measurable biological
                  processes.
                </p>
                <p>
                  The result is a system that maps precisely how consciousness
                  generates physical reality — and how to intervene at each
                  layer to engineer a different outcome.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.2em] text-sage hover:text-gold"
                >
                  Her full story
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
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
                <Button href="/field-guide" variant="secondary">
                  Open the Field Guide
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
                The Certification Program is eight modules of the real work.
                Root belief finding. EFT tapping. Reconsolidation. The daily
                protocol. The unhurried return to the person you were before
                fear told you to be smaller.
              </p>
              <div className="mt-8">
                <Button href="/certification">
                  Open the Certification
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
                <Button href="/inner-circle" variant="secondary">
                  Open the Inner Circle
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Evidence — alternating left-right */}
      <section className="bg-cream-deep/60 py-24 sm:py-32">
        <Container size="wide">
          <SectionHeading
            eyebrow="The Evidence"
            title="This is not theory. This is documented."
            align="center"
          >
            <p>
              Built on research that governments, physicists, and
              neuroscientists have documented for decades.
            </p>
          </SectionHeading>

          <div className="mt-20 space-y-16">
            {EVIDENCE.map((item, i) => (
              <div
                key={item.title}
                className={`grid gap-8 md:grid-cols-2 md:gap-16 ${
                  i % 2 !== 0 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="space-y-3">
                  <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold">
                    {item.year}
                  </p>
                  <h3 className="font-serif text-3xl leading-tight text-sage">
                    {item.title}
                  </h3>
                </div>
                <div>
                  <p className="text-lg leading-relaxed text-sage-deep/90">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-20 max-w-prose text-center text-sage-deep/70">
            Every source referenced here is public. None of this is secret. It
            has just not been put together in one place, in the right order,
            before.
          </p>
        </Container>
      </section>

      {/* Blockquote */}
      <section className="py-24 sm:py-32">
        <Container size="narrow">
          <div className="text-center">
            <div className="gold-rule mx-auto mb-12 w-32" />
            <blockquote className="font-serif text-4xl italic leading-tight text-sage sm:text-5xl">
              You do not need to believe harder. You need to reprogram the
              system.
            </blockquote>
            <div className="gold-rule mx-auto mt-12 w-32" />
          </div>
        </Container>
      </section>

      {/* Testimonials */}
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
                  &ldquo;A quote from a real student will live here as soon as
                  the first cohort completes the Certification Program.
                  Adelaide will only publish what&rsquo;s true.&rdquo;
                </p>
                <p className="mt-6 font-sans text-xs uppercase tracking-[0.15em] text-sage">
                  Student — Certification Program
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA with background image */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0">
          <Image
            src="/images/addiechill.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/85 to-cream" />
        </div>
        <Container size="narrow" className="relative">
          <div className="text-center">
            <p className="font-sans text-xs uppercase tracking-[0.28em] text-sage">
              Begin
            </p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-sage sm:text-5xl lg:text-6xl">
              You already know something has to change.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-sage-deep/85">
              The question is whether you keep running the old program or
              install a new one. Thirteen layers. Every mechanism documented.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/field-guide" size="lg">
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
