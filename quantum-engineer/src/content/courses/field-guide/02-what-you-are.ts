import type { CourseLesson } from "../types";

export const chapter02: CourseLesson = {
  slug: "02-what-you-are",
  title: "What You Are",
  eyebrow: "Chapter 2 — The identity layer",
  reading: "10 minutes",
  blocks: [
    {
      type: "p",
      text: "If reality is a field that resolves through observation, the next question is obvious. Who is the one observing? Because the answer to that question is not what you have been told. You are not the voice in your head. You are not the story you carry about yourself. You are not even the body you walk around in, although the body is the instrument through which the observer is landing here.",
    },
    {
      type: "p",
      text: "You are the consciousness having this experience. Everything else is cargo. The cargo was handed to you. Some of it you packed later. Most of it you inherited before you had any say, and for most of your life you have been mistaken about which bag is actually you and which bag is just the bag you have been carrying.",
    },
    {
      type: "h",
      text: "The question that begins the whole thing",
    },
    {
      type: "p",
      text: "Put the guide down and answer this slowly, without editing. Who are you when no one is watching? Not the version you perform when you walk into a room. Not the version you present at work. Not the version you hold up in front of the people whose opinion matters to you. Who are you when you are completely alone, doing exactly what brings you peace, with no audience and no consequence?",
    },
    {
      type: "p",
      text: "Most people have never seriously asked themselves this. And the gap — between who you perform for the world and who you actually are — is where all the suffering lives.",
    },
    {
      type: "quote",
      text: "The gap between who you are performing and who you actually are is the exact location of everything that hurts.",
    },
    {
      type: "p",
      text: "The gap is not your fault. It was not a failure of effort. It is what happens when a child, wired to belong, reads the environment and decides that the version of them that gets loved is the version that has to stay. That decision happens before you have the capacity to question it. You did not choose the cargo. The cargo was what the room required.",
    },
    {
      type: "h",
      text: "The second question, which is harder",
    },
    {
      type: "p",
      text: "What do you love when no one is judging? What would you have, how would you walk, how would you talk, if fear did not exist? If the whole crowd of people whose opinions you are carrying around inside your head disappeared — if there were no consequences, no judgment, no one to disappoint — what would be true about you?",
    },
    {
      type: "p",
      text: "Most people start answering and immediately begin editing. The editor says: that is too much. That is unrealistic. That is not reasonable. That is selfish. Who do you think you are. And then the answer gets small, and tidy, and safe, and the thing that would actually tell you something true gets lost.",
    },
    {
      type: "p",
      text: "That editor is not you. That editor is old trauma masquerading as wisdom. The editor is a part of you that once decided, for a good reason at the time, that wanting the full thing was dangerous. The first thing that came before the editor started cutting — that is who you actually are.",
    },
    {
      type: "h",
      text: "This is not fantasy. This is recognition.",
    },
    {
      type: "p",
      text: "I want to be specific about what I am not asking. I am not asking you to dream up a better version of yourself. I am not asking you to design a goal. I am not asking you to aspire. All of those are still operations from inside the old program — the program that says you are not enough right now and you have to work to become enough. That is the program. That is not the truth.",
    },
    {
      type: "p",
      text: "What I am asking you to do is remember. Because the person you are being asked to locate in this chapter is not someone you have to become. She already exists. She is already here. She has been waiting inside you for a very long time, and the work of this guide — from the first page to the last — is learning how to stop obstructing her.",
    },
    {
      type: "p",
      text: "You are not broken. You have never been broken. You have been asleep to yourself. The entire system in your hands is the process of waking up.",
    },
    {
      type: "h",
      text: "What to do before Chapter 3",
    },
    {
      type: "p",
      text: "Open a note, or the journal inside your dashboard, or a clean page in the book on your nightstand. Write the unedited answer to the second question. What would you have, how would you walk, how would you talk, if fear did not exist. Do not be reasonable. Do not make it deliverable. Do not make it small. Whatever comes first is what is true. Write it down. Keep it.",
    },
    {
      type: "note",
      text: "You will come back to this page. In Chapter 11, the daily protocol will ask you to hold this exact image in your body at a very specific time of day, and the work of the rest of your life will be collapsing the distance between where you are now and what is written there.",
    },
    {
      type: "tool",
      tool: "writing-prompt",
      title: "The unedited answer",
      prompt:
        "Who are you when no one is watching? What do you love when no one is judging? Write the first thing that comes, before the editor starts cutting.",
      placeholder: "I am the one who…",
      minRows: 8,
      storageKey: "fg-02-unedited-answer",
    },
    {
      type: "tool",
      tool: "identity-builder",
      title: "Who you are without fear",
      description:
        "Specific, sensory, present tense. She already exists — you are describing her, not inventing her. Come back tomorrow and add more.",
      fields: [
        {
          key: "walk",
          label: "How she walks into a room",
          placeholder: "She walks in like…",
        },
        {
          key: "voice",
          label: "What her voice sounds like",
          placeholder: "Her voice is…",
        },
        {
          key: "home",
          label: "What her home looks like",
          placeholder: "Her home is…",
        },
        {
          key: "tolerate",
          label: "What she will not tolerate",
          placeholder: "She does not tolerate…",
        },
        {
          key: "peace",
          label: "What brings her peace that cannot be disturbed",
          placeholder: "She is peaceful when…",
        },
        {
          key: "morning",
          label: "What her morning looks like",
          placeholder: "Her morning is…",
        },
      ],
      storageKey: "fg-02-identity",
    },
  ],
};
