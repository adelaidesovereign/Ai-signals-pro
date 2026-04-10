// Quiz content — "Which Layer Are You Stuck In?"
// The Quantum Engineer framework has 13 layers, but most people block in one
// of seven common places. Each answer carries a weighting toward one layer.
// After 7 questions we pick the highest-scoring layer.

export type Layer = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: {
    value: string;
    label: string;
    weight: Layer;
  }[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    prompt:
      "When something good is within reach, what tends to happen in your body first?",
    options: [
      {
        value: "a",
        label: "A quiet suspicion that it will not actually work out.",
        weight: 2,
      },
      {
        value: "b",
        label: "An urge to do more, faster, harder to make sure of it.",
        weight: 4,
      },
      { value: "c", label: "A small thrill, then a wave of fear.", weight: 1 },
      {
        value: "d",
        label: "Numbness. The feeling is hard to even locate.",
        weight: 3,
      },
    ],
  },
  {
    id: "q2",
    prompt: "Which sentence sounds most like the voice inside your head?",
    options: [
      { value: "a", label: "Who do you think you are.", weight: 1 },
      { value: "b", label: "You always end up here.", weight: 2 },
      { value: "c", label: "If you relax, everything falls apart.", weight: 4 },
      {
        value: "d",
        label: "You should know this by now.",
        weight: 5,
      },
    ],
  },
  {
    id: "q3",
    prompt: "The pattern you keep repeating — where do you feel it most?",
    options: [
      { value: "a", label: "In your throat or chest.", weight: 5 },
      { value: "b", label: "In the pit of your stomach.", weight: 2 },
      { value: "c", label: "In your shoulders, jaw, or back.", weight: 4 },
      { value: "d", label: "Nowhere specific. Just a low hum.", weight: 3 },
    ],
  },
  {
    id: "q4",
    prompt:
      "You try a new practice — meditation, journaling, breathwork. What usually happens?",
    options: [
      {
        value: "a",
        label: "It works for a few days, then I forget it exists.",
        weight: 6,
      },
      {
        value: "b",
        label: "I feel worse before I feel better, and I stop.",
        weight: 4,
      },
      {
        value: "c",
        label: "It feels silly and I cannot take it seriously.",
        weight: 1,
      },
      {
        value: "d",
        label: "I do it, nothing shifts, I conclude it does not work.",
        weight: 7,
      },
    ],
  },
  {
    id: "q5",
    prompt: "When you picture the version of you with no fear, what happens?",
    options: [
      {
        value: "a",
        label: "Nothing comes. The image is blank.",
        weight: 1,
      },
      {
        value: "b",
        label: "I see her, and then the editor starts editing.",
        weight: 2,
      },
      {
        value: "c",
        label: "I feel her, and then I feel grief.",
        weight: 5,
      },
      {
        value: "d",
        label: "I have written her down. I just cannot live as her.",
        weight: 6,
      },
    ],
  },
  {
    id: "q6",
    prompt: "What have you tried, and what has not worked for you?",
    options: [
      {
        value: "a",
        label:
          "Years of therapy, many tools, still the same pattern underneath.",
        weight: 2,
      },
      {
        value: "b",
        label: "Mindset work, affirmations, vision boards. Surface only.",
        weight: 7,
      },
      {
        value: "c",
        label: "I read everything but never finish anything.",
        weight: 6,
      },
      {
        value: "d",
        label: "I have been in survival mode for so long I cannot tell.",
        weight: 3,
      },
    ],
  },
  {
    id: "q7",
    prompt: "What would you want if you believed it were possible?",
    options: [
      { value: "a", label: "Peace inside my own body.", weight: 3 },
      { value: "b", label: "To stop abandoning myself.", weight: 2 },
      { value: "c", label: "To live as who I actually am.", weight: 1 },
      { value: "d", label: "A life that belongs to me.", weight: 5 },
    ],
  },
];

export type LayerResult = {
  layer: Layer;
  name: string;
  diagnosis: string;
  whatIsHappening: string;
  whatToDo: string;
  recommendation: string;
};

export const LAYER_RESULTS: Record<Layer, LayerResult> = {
  1: {
    layer: 1,
    name: "Identity — Layer 1",
    diagnosis:
      "You are stuck at the identity layer. You know something is off, but you cannot name who you would be without the fear.",
    whatIsHappening:
      "The program running inside you does not match who you actually are. You are performing a version of yourself that was installed before you had a choice in the matter. Every effort to change the outside stalls because the inside has not been allowed to update.",
    whatToDo:
      "Your work is not more productivity. It is naming the specific person you are without the fear, in concrete sensory detail, and teaching your nervous system that she is safe. This is the exact first move inside the Field Guide.",
    recommendation: "field-guide",
  },
  2: {
    layer: 2,
    name: "The Root Belief — Layer 2",
    diagnosis:
      "You are stuck at the root belief layer. You can see the pattern. You cannot find what is generating it.",
    whatIsHappening:
      "Your symptoms are not the problem. They are the output of a belief that lives beneath your conscious mind — something your younger self decided was true for good reason at the time. Until the belief is named and felt in the body, the pattern will keep returning.",
    whatToDo:
      "Your work is somatic belief-finding. Not talking about the story. Finding the exact sentence your body is still operating as though it were true. The Certification Program's Module 3 walks you through this line by line.",
    recommendation: "certification",
  },
  3: {
    layer: 3,
    name: "Nervous System — Layer 3",
    diagnosis:
      "You are stuck at the nervous system layer. Your body has been in threat state for so long it has forgotten any other setting.",
    whatIsHappening:
      "Nothing new can be installed while the body is bracing. The subconscious refuses incoming code when the nervous system reads the environment as unsafe. This is why insight after insight has not produced change.",
    whatToDo:
      "Before anything else, the nervous system has to come down. Short, daily, specific practices — not more information. The Field Guide's Layer 4 is written exactly for this.",
    recommendation: "field-guide",
  },
  4: {
    layer: 4,
    name: "The RAS and Subconscious — Layer 4",
    diagnosis:
      "You are stuck at the filter layer. Your Reticular Activating System is screening reality through an old program and you cannot see past it.",
    whatIsHappening:
      "Your brain processes eleven million bits of sensory information every second. You experience roughly forty of them. The forty you see are the ones your dominant subconscious program tells the RAS to look for. That is why your life keeps confirming what you already believe.",
    whatToDo:
      "Your work is RAS hijacking — deliberate installation of new reference points until the filter shifts. The Certification Program's Module 2 explains the neuroscience and Module 4 teaches the installation protocol.",
    recommendation: "certification",
  },
  5: {
    layer: 5,
    name: "The Heart Field — Layer 5",
    diagnosis:
      "You are stuck at the heart coherence layer. Your thoughts and your body are broadcasting opposite signals.",
    whatIsHappening:
      "HeartMath Institute research has documented an electromagnetic field generated by the heart that is measurable several feet from the body. When the mind says one thing and the heart broadcasts another, the nervous system cannot commit, and the outer world mirrors the contradiction.",
    whatToDo:
      "Your work is heart-brain coherence practice. Not affirmations. A specific breath and feeling pattern that brings the two signals into alignment. Field Guide Layer 5 is where this lives.",
    recommendation: "field-guide",
  },
  6: {
    layer: 6,
    name: "Consistency and Wiring — Layer 6",
    diagnosis:
      "You are stuck at the wiring layer. You know what to do. You do not do it long enough for the circuit to hold.",
    whatIsHappening:
      "Permanent change requires memory reconsolidation — a neurobiological process that only occurs under specific conditions, repeated across enough sessions for the new circuit to become the default. You are giving up at the point the old program starts flinching, which is the point where the work actually begins.",
    whatToDo:
      "Your work is the daily protocol. Short, repeated, in sequence, without negotiation. The Certification Program's Module 5 lays out the exact sequence.",
    recommendation: "certification",
  },
  7: {
    layer: 7,
    name: "The Mechanism Itself — Layer 7",
    diagnosis:
      "You are stuck because you have been working with tools that were never built to touch the root.",
    whatIsHappening:
      "Mindset work, affirmations, vision boards — these are instructions to the conscious mind. The conscious mind is not where the problem lives. The program runs underneath it, and it does not respond to instructions. It responds to repeated, felt experience in theta brain state.",
    whatToDo:
      "You need the actual mechanism, not another strategy. The Field Guide is the shortest path in — it gives you the full model in a few hours. From there, the Certification Program is where the installation work happens.",
    recommendation: "field-guide",
  },
};

export function scoreQuiz(
  answers: Record<string, string>,
): LayerResult {
  const counts: Record<Layer, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  };

  for (const question of QUIZ_QUESTIONS) {
    const answer = answers[question.id];
    const option = question.options.find((o) => o.value === answer);
    if (option) counts[option.weight] += 1;
  }

  let topLayer: Layer = 1;
  let topCount = -1;
  (Object.keys(counts) as unknown as Layer[]).forEach((layer) => {
    const layerNum = Number(layer) as Layer;
    if (counts[layerNum] > topCount) {
      topCount = counts[layerNum];
      topLayer = layerNum;
    }
  });

  return LAYER_RESULTS[topLayer];
}
