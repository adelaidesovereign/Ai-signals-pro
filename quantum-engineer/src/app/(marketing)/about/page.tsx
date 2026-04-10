import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Adelaide",
  description:
    "Adelaide Taylor — nurse, researcher, entrepreneur. The Quantum Engineer.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20">
        <Container size="narrow">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
            About
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-sage sm:text-6xl">
            Adelaide Taylor
          </h1>
          <p className="mt-4 font-sans text-sm uppercase tracking-[0.2em] text-sage-light">
            Nurse. Researcher. Entrepreneur. 5/1 Splenic Projector.
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container size="narrow">
          <div className="space-y-8 text-lg leading-relaxed text-sage-deep/90">
            <p>
              I spent seventeen years in therapy. I am not saying that to
              dismiss the work or the people who did it with me. The
              therapists were brilliant. The tools were real. The breakdowns
              kept coming anyway.
            </p>
            <p>
              Because coping never touches the root. And the root is always
              identity. I was running a program that was installed before I
              had a say in it, and I was trying to succeed at being someone I
              had never agreed to become.
            </p>
            <p>
              The cruelest part was how good I was at it. I could hold a room.
              I could hit a goal. I could look like someone who had it
              together. And inside, the same three sentences were playing on
              loop, year after year, no matter what the outside looked like.
            </p>
            <p>
              At some point I stopped asking how to cope better and started
              asking a different question. Not "what is wrong with me" but
              "what is actually running the show." That question took me into
              neuroscience, quantum physics, Human Design, the declassified
              CIA Gateway Process report from 1983, HeartMath research, Karl
              Friston's work on prediction, Richard Schwartz's parts work,
              Nader and LeDoux's work on memory reconsolidation.
            </p>
            <p>
              None of it was new. All of it had been separated into silos.
              What was missing was a map — a single, sequential model that
              showed how the layers fit together, in what order, and what you
              had to do at each one.
            </p>
            <p>That map is what I built. That map is what you are here for.</p>
          </div>
        </Container>
      </section>

      <section className="bg-cream-deep/60 py-24">
        <Container size="narrow">
          <SectionHeading
            eyebrow="The question that changed everything"
            title="Who are you when no one is watching?"
          >
            <p>
              What do you love when no one is judging? What would you have,
              how would you walk, how would you talk, if fear did not exist?
            </p>
          </SectionHeading>

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-sage-deep/90">
            <p>
              That person is who you actually are. The fear is old trauma.
              This framework removes it.
            </p>
            <p>
              I do not teach manifestation. I am not selling a mindset. This
              is a consciousness engineering brand, and the word engineering
              is deliberate. An engineer works with a mechanism. A mechanism
              is predictable. If you know how the system behaves, you can
              work with it on purpose.
            </p>
            <p>
              Your brain is a mechanism. Your nervous system is a mechanism.
              Your subconscious programming was installed by a mechanism and
              it can be updated by the same one. Nothing in this work is
              mystical. Everything in it is teachable.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container size="narrow">
          <SectionHeading
            eyebrow="A note on what this is not"
            title="Not a manifestation brand."
          />
          <div className="mt-10 space-y-5 text-lg leading-relaxed text-sage-deep/90">
            <p>
              I will never tell you to think positive. Positive thinking on
              top of a contradicting subconscious is why you feel like a liar
              when you say the affirmation.
            </p>
            <p>
              I will never tell you to raise your vibration without telling
              you what that means and how to actually do it at the level of
              the nervous system.
            </p>
            <p>
              I will not pretend this is fast or easy. It is neither. It is
              also not hard in the way you are expecting. Most of the work is
              quiet, daily, and extremely specific.
            </p>
          </div>

          <div className="mt-14 text-center">
            <Button href="/services" size="lg">
              Begin the Work
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
