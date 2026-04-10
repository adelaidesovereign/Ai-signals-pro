"use client";

import { useState } from "react";
import Link from "next/link";
import { QUIZ_QUESTIONS, type LayerResult } from "@/content/quiz";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Step = "questions" | "capture" | "result" | "loading";

export function QuizClient() {
  const [step, setStep] = useState<Step>("questions");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [result, setResult] = useState<LayerResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const question = QUIZ_QUESTIONS[current];
  const totalQuestions = QUIZ_QUESTIONS.length;

  function answerAndAdvance(value: string) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    if (current < totalQuestions - 1) {
      setCurrent(current + 1);
    } else {
      setStep("capture");
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStep("loading");
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, answers }),
      });
      if (!res.ok) throw new Error();
      const data = (await res.json()) as { result: LayerResult };
      setResult(data.result);
      setStep("result");
    } catch {
      setError("Something did not connect. Try once more.");
      setStep("capture");
    }
  }

  if (step === "questions") {
    return (
      <Card className="sm:p-12">
        <div className="flex items-center justify-between">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
            Question {current + 1} of {totalQuestions}
          </p>
          <div className="h-1 flex-1 ml-6 rounded-full bg-cream-deep">
            <div
              className="h-full rounded-full bg-sage transition-all duration-500"
              style={{
                width: `${((current + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>

        <h2 className="mt-10 font-serif text-3xl leading-snug text-sage sm:text-4xl">
          {question.prompt}
        </h2>

        <div className="mt-8 space-y-3">
          {question.options.map((option) => (
            <button
              key={option.value}
              onClick={() => answerAndAdvance(option.value)}
              className="group flex w-full items-start gap-4 rounded-soft border border-sage/15 bg-cream-warm px-5 py-4 text-left text-base text-sage-deep transition-all duration-200 hover:border-sage hover:bg-cream-deep"
            >
              <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sage/40 transition-colors group-hover:bg-sage" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        {current > 0 && (
          <div className="mt-8">
            <button
              onClick={() => setCurrent(current - 1)}
              className="font-sans text-xs uppercase tracking-[0.15em] text-sage-deep/70 hover:text-sage"
            >
              Back
            </button>
          </div>
        )}
      </Card>
    );
  }

  if (step === "capture" || step === "loading") {
    return (
      <Card className="sm:p-12">
        <h2 className="font-serif text-3xl text-sage sm:text-4xl">
          Where should your result live?
        </h2>
        <p className="mt-3 text-sage-deep/85">
          Your result is tied to your layer. I will send it straight to your
          inbox along with the first letter that explains what to do with it.
          No noise.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <Input
            id="quiz-first-name"
            label="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="given-name"
          />
          <Input
            id="quiz-email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          {error && <p className="text-sm text-sage-deep">{error}</p>}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={step === "loading"}
          >
            {step === "loading" ? "Reading your answers" : "See my layer"}
          </Button>
          <p className="text-center text-xs text-sage-deep/55">
            I will not share your email with anyone. Ever.
          </p>
        </form>
      </Card>
    );
  }

  if (step === "result" && result) {
    const productLink =
      result.recommendation === "certification"
        ? "/services#certification"
        : "/services#field-guide";
    const productLabel =
      result.recommendation === "certification"
        ? "The Certification Program — $497"
        : "The Field Guide — $27";

    return (
      <Card className="sm:p-12">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
          Your result
        </p>
        <h2 className="mt-3 font-serif text-4xl text-sage sm:text-5xl">
          {result.name}
        </h2>
        <p className="mt-4 text-lg text-sage-deep/90">{result.diagnosis}</p>

        <div className="mt-10 space-y-6 text-base leading-relaxed text-sage-deep/90">
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-sage">
              What is happening
            </p>
            <p className="mt-2">{result.whatIsHappening}</p>
          </div>
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-sage">
              What to do about it
            </p>
            <p className="mt-2">{result.whatToDo}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href={productLink} size="lg">
            {productLabel}
          </Button>
          <Link
            href="/services"
            className="flex items-center justify-center font-sans text-sm underline underline-offset-4 hover:text-sage"
          >
            See all three options
          </Link>
        </div>

        <p className="mt-10 text-center text-xs text-sage-deep/55">
          A copy of this has been sent to {email}.
        </p>
      </Card>
    );
  }

  return null;
}
