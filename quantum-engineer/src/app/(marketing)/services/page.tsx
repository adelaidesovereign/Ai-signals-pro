import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "The Work",
  description:
    "The Field Guide, the Certification Program, the Inner Circle. Choose the one that matches where you actually are.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-24 pb-10 sm:pt-32">
        <Container size="narrow" className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
            The Work
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-sage sm:text-6xl">
            Three ways to begin.
          </h1>
          <p className="mt-6 text-lg text-sage-deep/85">
            Whichever one you choose, you are starting at the same place: the
            framework. The rest is how deep you want to go and how much
            company you want for the work.
          </p>
        </Container>
      </section>

      {/* Field Guide */}
      <section id="field-guide" className="py-20 sm:py-28">
        <Container size="wide">
          <Card className="sm:p-14">
            <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
                  Layer one — $27
                </p>
                <h2 className="mt-4 font-serif text-4xl text-sage">
                  The Quantum Engineer Field Guide
                </h2>
                <p className="mt-6 text-sage-deep/90">
                  Not a PDF download. A complete interactive reading
                  experience inside your private account. Thirteen chapters.
                  The full framework in sequence. Highlight and save notes as
                  you go. Progress holds across your devices.
                </p>
                <div className="mt-8 space-y-3">
                  <Button
                    href="/api/stripe/checkout?product=field-guide"
                    size="lg"
                  >
                    Buy the Field Guide — $27
                  </Button>
                  <p className="text-xs text-sage-deep/60">
                    Immediate access. Your account is created at checkout.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
                  What's inside
                </p>
                <ul className="space-y-3 text-sage-deep/90">
                  {[
                    "What reality actually is — the physics layer",
                    "What you are — the identity layer",
                    "The RAS, the subconscious, and how to hijack the filter",
                    "Nervous system as the prerequisite for everything",
                    "The heart as a broadcast system",
                    "How change gets wired permanently",
                    "The quantum physics of deliberate collapse",
                    "The CIA Gateway Process",
                    "The 12 Laws",
                    "The complete toolkit",
                    "The daily protocol",
                    "Your specific Human Design layer",
                    "What this is not — the glossary",
                  ].map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sage" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-4 text-sm italic text-sage-deep/70">
                  For: someone who wants the complete model before they
                  decide how deep to go.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Certification */}
      <section
        id="certification"
        className="bg-cream-deep/60 py-20 sm:py-28"
      >
        <Container size="wide">
          <Card className="border-sage/30 sm:p-14">
            <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
                  The main work — $497
                </p>
                <h2 className="mt-4 font-serif text-4xl text-sage">
                  The Quantum Engineer Certification Program
                </h2>
                <p className="mt-6 text-sage-deep/90">
                  Six modules. Eighteen lessons. Every piece filmed by
                  Adelaide, every script written to be read slowly. This is
                  where the work actually happens — root belief finding,
                  theta installation, nervous system regulation, the daily
                  protocol that wires the new identity in permanently.
                </p>
                <div className="mt-8 space-y-4">
                  <Button
                    href="/api/stripe/checkout?product=certification"
                    size="lg"
                  >
                    Enrol — $497
                  </Button>
                  <Button
                    href="/api/stripe/checkout?product=certification-plan"
                    variant="secondary"
                    size="lg"
                  >
                    Payment plan — 3 &times; $167
                  </Button>
                  <p className="text-xs text-sage-deep/60">
                    Lifetime access. Future updates included at no extra cost.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
                  The six modules
                </p>
                <ol className="space-y-4 text-sage-deep/90">
                  {[
                    [
                      "Module 1",
                      "Who You Actually Are — the identity question that begins the whole thing",
                    ],
                    [
                      "Module 2",
                      "The Science of Why You Are Stuck — the RAS, the subconscious, why coping does not work",
                    ],
                    [
                      "Module 3",
                      "Finding Your Root Program — somatic markers, the question that reveals the belief, Internal Family Systems parts work",
                    ],
                    [
                      "Module 4",
                      "Rewriting the Code — theta state access, memory reconsolidation, the installation protocol",
                    ],
                    [
                      "Module 5",
                      "Installing Your True Identity — the daily protocol and the Quantum Zeno Effect",
                    ],
                    [
                      "Module 6",
                      "Living as the Quantum Engineer — maintenance, expansion, teaching others",
                    ],
                  ].map(([label, body]) => (
                    <li key={label}>
                      <p className="font-sans text-xs uppercase tracking-[0.15em] text-sage">
                        {label}
                      </p>
                      <p className="mt-1">{body}</p>
                    </li>
                  ))}
                </ol>
                <p className="pt-4 text-sm italic text-sage-deep/70">
                  For: someone who has tried enough tools to know they want
                  the mechanism itself.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Inner Circle */}
      <section id="inner-circle" className="py-20 sm:py-28">
        <Container size="wide">
          <Card className="sm:p-14">
            <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
                  Ongoing — $97 per month
                </p>
                <h2 className="mt-4 font-serif text-4xl text-sage">
                  The Inner Circle
                </h2>
                <p className="mt-6 text-sage-deep/90">
                  A small room of people doing the work alongside you. Monthly
                  live calls with Adelaide. A private feed for the kind of
                  questions that do not belong on the internet. New Sacred
                  Sovereign Subliminals in your library every month.
                </p>
                <div className="mt-8 space-y-3">
                  <Button
                    href="/api/stripe/checkout?product=inner-circle"
                    size="lg"
                  >
                    Join — $97/month
                  </Button>
                  <p className="text-xs text-sage-deep/60">
                    Cancel any time. You keep what you have written.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
                  What's included
                </p>
                <ul className="space-y-3 text-sage-deep/90">
                  {[
                    "A monthly live call with Adelaide — Q&A and focused teaching",
                    "A private member feed for posts, responses, and questions",
                    "New Sacred Sovereign Subliminals added to the library every month",
                    "A monthly content drop on one specific layer",
                    "Your member dashboard tracking progress across everything you have bought",
                  ].map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sage" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-4 text-sm italic text-sage-deep/70">
                  For: the person who has done the reading and the
                  installation and wants people for the long walk.
                </p>
              </div>
            </div>
          </Card>
        </Container>
      </section>

      {/* Subliminals coming soon */}
      <section className="pb-28">
        <Container size="narrow">
          <div className="rounded-soft border border-sage/20 bg-cream-warm p-10 text-center">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
              Coming soon
            </p>
            <h2 className="mt-3 font-serif text-3xl text-sage">
              Sacred Sovereign Subliminals
            </h2>
            <p className="mt-4 text-sage-deep/85">
              Audio made for the hypnagogic threshold — the window before
              sleep where the subconscious is open. Each track is written to
              one specific identity line and recorded to Adelaide's voice. A
              new drop every month inside the Inner Circle.
            </p>
          </div>
        </Container>
      </section>

      <SectionHeading
        align="center"
        eyebrow="Still deciding"
        title="Not sure which one is for you?"
      >
        <p>
          The quiz tells you exactly which layer is currently blocking you and
          which product matches that layer.
        </p>
      </SectionHeading>
      <div className="pb-24 pt-10 text-center">
        <Button href="/quiz" variant="secondary" size="lg">
          Take the 7-question quiz
        </Button>
      </div>
    </>
  );
}
