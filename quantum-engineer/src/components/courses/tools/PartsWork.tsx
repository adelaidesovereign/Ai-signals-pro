"use client";

import { useState } from "react";
import { ToolShell } from "./ToolShell";
import { useToolStorage } from "./useToolStorage";
import { AskAdelaide } from "./AskAdelaide";

type PartConversation = {
  partName: string;
  location: string;
  age: string;
  protecting: string;
  whatItNeeds: string;
  conversations: number;
};

type Step = 0 | 1 | 2 | 3 | 4 | 5;

export function PartsWork({
  title,
  description,
  storageKey,
}: {
  title: string;
  description: string;
  storageKey: string;
}) {
  const [state, setState, { status }] = useToolStorage<PartConversation>(
    storageKey,
    {
      partName: "",
      location: "",
      age: "",
      protecting: "",
      whatItNeeds: "",
      conversations: 0,
    },
  );
  const [step, setStep] = useState<Step>(0);

  const steps: Array<{
    label: string;
    question: string;
    hint: string;
    field: keyof Omit<PartConversation, "conversations">;
    placeholder: string;
  }> = [
    {
      label: "1 / 5",
      question: "Which part of you is in the way right now?",
      hint: "The one that procrastinates. The one that criticizes. The one that forgets. Name it the way a small part of you would want to be called.",
      field: "partName",
      placeholder: "The part that…",
    },
    {
      label: "2 / 5",
      question: "Where does this part live in your body?",
      hint: "Close your eyes. Invite the part forward. Where in your body do you feel it?",
      field: "location",
      placeholder: "It lives in…",
    },
    {
      label: "3 / 5",
      question: "How old does this part feel?",
      hint: "Not how old you are. How old does the part feel? Trust the first number.",
      field: "age",
      placeholder: "Roughly…",
    },
    {
      label: "4 / 5",
      question: "Ask gently: what are you protecting?",
      hint: "Wait for the answer. It will come as a sentence, an image, or a felt sense. Do not argue. Write exactly what it gives you.",
      field: "protecting",
      placeholder: "It is protecting…",
    },
    {
      label: "5 / 5",
      question: "What does this part need from you to feel safer?",
      hint: "This is the offering. It may be simpler than you expect. Acknowledgement. Patience. Slowness. Listen.",
      field: "whatItNeeds",
      placeholder: "It needs…",
    },
  ];

  const current = steps[step];

  function next() {
    if (step < 4) {
      setStep((step + 1) as Step);
    } else {
      setState({ ...state, conversations: state.conversations + 1 });
      setStep(5);
    }
  }

  function restart() {
    setStep(0);
  }

  if (step === 5) {
    return (
      <ToolShell title={title} description={description} status={status}>
        <div className="text-center">
          <p className="font-serif text-2xl text-sage">
            Thank the part. Stay with it for a breath.
          </p>
          <p className="mt-4 max-w-prose text-sage-deep/85">
            You do not have to change anything. The relationship is the work.
            Come back tomorrow. Parts open the more they feel understood.
          </p>
          <p className="mt-6 text-sm text-sage-deep/60">
            You have held {state.conversations}{" "}
            {state.conversations === 1 ? "conversation" : "conversations"}{" "}
            like this.
          </p>
          <button
            onClick={restart}
            className="mt-5 rounded-soft border border-sage/40 bg-cream-warm px-6 py-3 font-sans text-xs uppercase tracking-quiet text-sage-deep hover:border-sage"
          >
            Begin a new conversation
          </button>
        </div>

        <AskAdelaide
          toolName={title}
          toolPrompt={description}
          userWriting={`Part: ${state.partName}\nLocation in body: ${state.location}\nAge it feels: ${state.age}\nWhat it is protecting: ${state.protecting}\nWhat it needs: ${state.whatItNeeds}`}
        />
      </ToolShell>
    );
  }

  return (
    <ToolShell title={title} description={description} status={status}>
      <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
        {current.label}
      </p>
      <p className="mt-3 font-serif text-2xl text-sage">{current.question}</p>
      <p className="mt-3 text-sm text-sage-deep/75">{current.hint}</p>
      <textarea
        value={state[current.field]}
        onChange={(e) =>
          setState({ ...state, [current.field]: e.target.value })
        }
        rows={3}
        placeholder={current.placeholder}
        className="mt-4 w-full rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
      />
      <div className="mt-4 flex justify-between">
        {step > 0 ? (
          <button
            onClick={() => setStep((step - 1) as Step)}
            className="font-sans text-xs uppercase tracking-quiet text-sage-deep/70 hover:text-sage"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          onClick={next}
          disabled={!state[current.field].trim()}
          className="rounded-soft bg-sage px-6 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
        >
          {step < 4 ? "Next" : "Close the conversation"}
        </button>
      </div>
    </ToolShell>
  );
}
