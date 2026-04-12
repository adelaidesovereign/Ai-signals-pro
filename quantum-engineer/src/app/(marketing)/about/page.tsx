import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Adelaide",
  description:
    "Adelaide Taylor — entrepreneur, researcher, Quantum Engineer. The story behind the thirteen-layer framework, in her own words.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero — photo left, bio right */}
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
                About
              </p>
              <h1 className="mt-6 font-serif text-5xl leading-[1.05] text-sage sm:text-6xl lg:text-7xl">
                Adelaide{" "}
                <span className="italic text-gold">Taylor</span>
              </h1>
              <div className="gold-rule-left mx-auto mt-8 lg:mx-0" />
              <div className="mt-8 space-y-2 font-sans text-sm uppercase tracking-[0.22em] text-sage-deep/60">
                <p>Entrepreneur. Researcher. 5/1 Splenic Projector.</p>
                <p>Aquarius Sun, Virgo Rising, Capricorn stellium.</p>
                <p>Cross of Expansion.</p>
              </div>
              <p className="mt-10 max-w-xl text-lg italic leading-relaxed text-sage-deep/80">
                This is the story of how I built the framework, why I had to
                build it, and who I had to become to do it. In my own words.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* The Origin */}
      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <p className="font-sans text-xs uppercase tracking-[0.28em] text-sage">
            The Origin
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-sage sm:text-5xl">
            How I built the framework
          </h2>
          <div className="gold-rule-left mt-6" />
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-sage-deep/90">
            <p>
              The Quantum Engineer framework did not come from a spiritual
              awakening or an epiphany on a mountaintop. It came from a
              question I could not stop asking: if consciousness is
              measurable, if the brain operates on quantum principles, if your
              senses are sending eleven million bits of data to your brain
              every second while your conscious mind filters only forty to
              fifty of them into awareness — then why is every personal
              development system built for the fifty?
            </p>
            <p>
              That question led me into thousands of hours inside
              peer-reviewed journals. Quantum field theory. Computational
              neuroscience. The declassified archives of the CIA and the U.S.
              Army&apos;s consciousness research programs. The HeartMath
              Institute&apos;s electromagnetic field studies. Karl Friston&apos;s free
              energy principle. Penrose and Hameroff&apos;s orchestrated objective
              reduction model. Human Design as a system architecture, not a
              personality quiz.
            </p>
            <p>
              I cross-referenced every source against measurable biological
              processes. I mapped Human Design gates to specific neural
              pathways and quantum field interactions. I traced the pathway
              from a thought to a brainwave state to a subconscious pattern
              to a nervous system response to a physical outcome — and
              documented every mechanism along the way.
            </p>
            <p>
              The result is a thirteen-layer system. Each layer corresponds
              to a specific level of consciousness infrastructure — from the
              quantum field interactions that generate perception to the heart
              coherence patterns that broadcast your electromagnetic signature
              into your environment. No layer is metaphorical. Every layer is
              traceable to documented research. Every protocol has a
              mechanism.
            </p>
          </div>
        </Container>
      </section>

      {/* Full-width photo break */}
      <section className="relative h-[55vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="/images/addiechin.png"
          alt="Adelaide Taylor"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-cream to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      </section>

      {/* The Person — the full origin story */}
      <section className="py-20 sm:py-28">
        <Container size="narrow">
          <p className="font-sans text-xs uppercase tracking-[0.28em] text-sage">
            The Person
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-sage sm:text-5xl">
            Before I was this
          </h2>
          <div className="gold-rule-left mt-6" />
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-sage-deep/90">
            <p>
              I was not someone who looked like she had it figured out. I was
              someone working double shifts and overtime to keep from falling
              behind on bills.
            </p>
            <p>
              Scarcity was the water I swam in. The promise I had been sold
              was simple: work harder, pick up the extra hours, say yes to
              every shift, and eventually the math would catch up with you. So
              I did. And the harder I worked, the more the math stayed in
              exactly the same place — paycheck to paycheck, month after
              month, no matter what I put in. The ceiling was not my effort.
              It was something underneath the effort that kept pulling me back
              to the same altitude, no matter how much I gave.
            </p>
            <p>
              The program underneath had been installed in a childhood I did
              not choose. I knew struggle in my body before I had a word for
              it. By the time I was old enough to try to outwork it, the
              pattern was already running on its own — and every strategy I
              had for surviving the world was also the thing keeping me locked
              inside it.
            </p>
            <p>
              I tried everything I could get my hands on. I ran. I journalled.
              I made art. I sat in therapy for years and collected every coping
              skill and grounding technique and reframe I was offered. None of
              it was a waste. The running kept me in my body. The art kept me
              honest. The journal held what I could not yet say out loud. The
              therapy gave me language for things that had lived underneath
              language my whole life. But underneath all of it, the loop was
              still running. The same mornings. The same tightness in my chest
              looking at the bills. The same exhausted question I kept waving
              away so I could get through the shift.
            </p>
            <p>
              Until one night at two in the morning, the question would not
              let itself be waved away anymore. I was awake in the dark and it
              arrived whole.
            </p>
            <p className="border-l-2 border-gold/60 pl-6 font-serif text-2xl italic leading-snug text-sage sm:text-3xl">
              Who am I? Not who does society want me to be. Not who does the
              paycheck want me to be. Not who my family, my survival, my
              trauma, my coping needs me to be. Who am I{" "}
              <span className="underline decoration-gold/60 underline-offset-4">
                to me
              </span>
              . What do I want. Who would I be if you took every limitation
              society had ever stacked on me and removed it.
            </p>
            <p className="font-serif text-3xl italic text-sage sm:text-4xl">
              Who the fuck am I?
            </p>
            <p>
              That question broke something open. Not in the cinematic way —
              in the quiet way, where the whole architecture of how I had been
              living suddenly looked like a rental unit I had been sleeping in
              my entire life, decorated by other people, built on a lease I
              had never read. For the first time I understood that the answer
              was not going to come from another book, another shift, another
              coping skill. The answer was underneath all of that, at the
              layer where the program was actually running.
            </p>
            <p>
              That question is what this entire framework was built to answer.
            </p>
          </div>
        </Container>
      </section>

      {/* The Design — Human Design */}
      <section className="bg-cream-deep/60 py-20 sm:py-28">
        <Container size="wide">
          <div className="mx-auto max-w-5xl">
            <p className="font-sans text-xs uppercase tracking-[0.28em] text-sage">
              The Design
            </p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-sage sm:text-5xl">
              5/1 Splenic Projector.{" "}
              <span className="italic text-gold">Cross of Expansion.</span>
            </h2>
            <div className="gold-rule-left mt-6" />
            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
              <div className="space-y-5 text-lg leading-relaxed text-sage-deep/90">
                <p>
                  In Human Design, I carry the 5/1 profile — the Heretic
                  Investigator. The one who goes deep into the research,
                  builds the framework from first principles, and then
                  delivers it in a way that restructures how people see the
                  entire system. The 5 line is projected upon. People see in
                  me what they need to see. The 1 line is what keeps the
                  foundation underneath the projection honest — every
                  protocol tested, every source traced, nothing published
                  that cannot be verified.
                </p>
                <p>
                  Splenic authority means my decisions are instantaneous. A
                  hit of knowing that arrives in the body before the mind has
                  time to rationalise. It is the most primal form of
                  intelligence I have access to — survival-level clarity
                  operating at the speed of instinct — and it is the reason I
                  trust the body as a research instrument long before I trust
                  the thinking mind.
                </p>
              </div>
              <div className="space-y-5 text-lg leading-relaxed text-sage-deep/90">
                <p>
                  The Cross of Expansion is my life&apos;s geometry — the specific
                  electromagnetic imprint I carry. A cross designed to expand
                  what is possible for every system it contacts. Not through
                  force. Through the introduction of new information that
                  makes the old operating parameters obsolete.
                </p>
                <p>
                  Aquarius Sun brings the architecture — the capacity to see
                  systems from above, to identify where the code is broken,
                  to design the upgrade. Virgo Rising brings the precision —
                  every protocol tested, every mechanism documented. The
                  Capricorn stellium brings the structure to turn all of it
                  into something you can actually use.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA with background photo */}
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
              The framework is built. This is how it works.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-sage-deep/85">
              If you want the science and the mechanism — how frequency,
              belief, and identity actually reshape each other — start with
              the Field Guide.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/field-guide" size="lg">
                Open the Field Guide
              </Button>
              <Link
                href="/services#field-guide"
                className="font-sans text-sm underline underline-offset-4 hover:text-sage"
              >
                Or see all three doorways
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
