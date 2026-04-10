import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { QuizClient } from "./QuizClient";

export const metadata: Metadata = {
  title: "Which Layer Are You Stuck In?",
  description:
    "The Quantum Engineer framework has 13 layers. Most people are blocked in one specific place. This tells you exactly where — and what to do about it.",
};

export default function QuizPage() {
  return (
    <>
      <section className="pt-24 pb-10 sm:pt-32">
        <Container size="narrow" className="text-center">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
            Diagnostic
          </p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-sage sm:text-6xl">
            Which layer are you stuck in?
          </h1>
          <p className="mt-6 text-lg text-sage-deep/85">
            The Quantum Engineer framework has thirteen layers. Most people
            are blocked in one specific place. This tells you exactly where
            &mdash; and what to do about it.
          </p>
          <p className="mt-3 text-sm text-sage-deep/65">
            Seven questions. Two minutes. Honest answers only.
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container size="narrow">
          <QuizClient />
        </Container>
      </section>
    </>
  );
}
