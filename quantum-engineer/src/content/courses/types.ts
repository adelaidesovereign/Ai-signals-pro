export type CourseProduct = "FIELD_GUIDE" | "CERTIFICATION" | "INNER_CIRCLE";

export type CourseParagraph = { type: "p"; text: string };
export type CoursePullQuote = { type: "quote"; text: string; attribution?: string };
export type CourseList = { type: "list"; items: string[] };
export type CourseHeading = { type: "h"; text: string };
export type CourseVideo = {
  type: "video";
  title: string;
  duration: string;
};
export type CourseScript = {
  type: "script";
  text: string;
};

export type CourseBlock =
  | CourseParagraph
  | CoursePullQuote
  | CourseList
  | CourseHeading
  | CourseVideo
  | CourseScript;

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
