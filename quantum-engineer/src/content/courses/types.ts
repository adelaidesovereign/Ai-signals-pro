export type CourseProduct = "FIELD_GUIDE" | "CERTIFICATION" | "INNER_CIRCLE";

export type CourseParagraph = { type: "p"; text: string };
export type CoursePullQuote = {
  type: "quote";
  text: string;
  attribution?: string;
};
export type CourseList = { type: "list"; items: string[] };
export type CourseHeading = { type: "h"; text: string };
export type CourseNote = { type: "note"; text: string };
export type CourseVideo = {
  type: "video";
  title: string;
  duration: string;
};
export type CourseScript = {
  type: "script";
  text: string;
};

// ---------- Interactive tools ----------
// Each interactive block is rendered as a client component with a stable
// storage key so state persists per user, per lesson, across sessions.

export type CourseWritingPrompt = {
  type: "tool";
  tool: "writing-prompt";
  title: string;
  prompt: string;
  placeholder?: string;
  minRows?: number;
  storageKey: string;
};

export type CourseBreathwork = {
  type: "tool";
  tool: "breathwork";
  title: string;
  description: string;
  inhale: number; // seconds
  hold?: number;
  exhale: number;
  cycles: number;
  storageKey: string;
};

export type CourseIdentityBuilder = {
  type: "tool";
  tool: "identity-builder";
  title: string;
  description: string;
  fields: { key: string; label: string; placeholder: string }[];
  storageKey: string;
};

export type CourseDailyChecklist = {
  type: "tool";
  tool: "daily-checklist";
  title: string;
  description: string;
  items: { key: string; label: string; detail?: string }[];
  storageKey: string;
};

export type CourseSomaticFind = {
  type: "tool";
  tool: "somatic-find";
  title: string;
  description: string;
  storageKey: string;
};

export type CourseHeartCoherence = {
  type: "tool";
  tool: "heart-coherence";
  title: string;
  description: string;
  durationSeconds: number;
  storageKey: string;
};

export type CoursePartsWork = {
  type: "tool";
  tool: "parts-work";
  title: string;
  description: string;
  storageKey: string;
};

export type CourseReconsolidation = {
  type: "tool";
  tool: "reconsolidation";
  title: string;
  description: string;
  storageKey: string;
};

export type CourseMantraInstaller = {
  type: "tool";
  tool: "mantra-installer";
  title: string;
  description: string;
  repeats?: number;
  storageKey: string;
};

export type CoursePresentMomentAnchor = {
  type: "tool";
  tool: "present-moment-anchor";
  title: string;
  description: string;
  storageKey: string;
};

export type CourseVisionLetter = {
  type: "tool";
  tool: "vision-letter";
  title: string;
  description: string;
  timeframe?: string;
  storageKey: string;
};

export type CourseWeeklyReview = {
  type: "tool";
  tool: "weekly-review";
  title: string;
  description: string;
  storageKey: string;
};

export type CourseEFTTapping = {
  type: "tool";
  tool: "eft-tapping";
  title: string;
  description: string;
  storageKey: string;
};

export type CoursePrePostAssessment = {
  type: "tool";
  tool: "pre-post-assessment";
  title: string;
  description: string;
  snapshotLabel?: string;
  storageKey: string;
};

export type CourseSelfCompassionBreak = {
  type: "tool";
  tool: "self-compassion-break";
  title: string;
  description: string;
  storageKey: string;
};

export type CoursePolyvagalLadder = {
  type: "tool";
  tool: "polyvagal-ladder";
  title: string;
  description: string;
  storageKey: string;
};

export type CourseDecoherenceCatcher = {
  type: "tool";
  tool: "decoherence-catcher";
  title: string;
  description: string;
  storageKey: string;
};

export type CourseCommitmentScroll = {
  type: "tool";
  tool: "commitment-scroll";
  title: string;
  description: string;
  storageKey: string;
};

export type CourseInteractive =
  | CourseWritingPrompt
  | CourseBreathwork
  | CourseIdentityBuilder
  | CourseDailyChecklist
  | CourseSomaticFind
  | CourseHeartCoherence
  | CoursePartsWork
  | CourseReconsolidation
  | CourseMantraInstaller
  | CoursePresentMomentAnchor
  | CourseVisionLetter
  | CourseWeeklyReview
  | CourseEFTTapping
  | CoursePrePostAssessment
  | CourseSelfCompassionBreak
  | CoursePolyvagalLadder
  | CourseDecoherenceCatcher
  | CourseCommitmentScroll;

export type CourseBlock =
  | CourseParagraph
  | CoursePullQuote
  | CourseList
  | CourseHeading
  | CourseNote
  | CourseVideo
  | CourseScript
  | CourseInteractive;

export type CourseLesson = {
  slug: string;
  title: string;
  eyebrow?: string;
  reading?: string;
  blocks: CourseBlock[];
};

export type CourseModule = {
  slug: string;
  title: string;
  eyebrow?: string;
  summary?: string;
  lessons: CourseLesson[];
};

export type Course = {
  slug: string;
  product: CourseProduct;
  title: string;
  tagline: string;
  modules: CourseModule[];
};
