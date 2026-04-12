import type { Course } from "../types";
import { module1 } from "./module-1";
import { module2 } from "./module-2";
import { module3 } from "./module-3";
import { module4 } from "./module-4";
import { module5 } from "./module-5";
import { module6 } from "./module-6";
import { module7 } from "./module-7";
import { module8 } from "./module-8";

export const certification: Course = {
  slug: "certification",
  product: "CERTIFICATION",
  title: "The Quantum Engineer Certification Program",
  tagline:
    "Eight modules, twenty-five lessons, the real work. The slow, deliberate coming home to who you actually are.",
  modules: [module1, module2, module3, module4, module5, module6, module7, module8],
};

export const CERTIFICATION_MODULES = certification.modules;

export function findCertificationLesson(
  moduleSlug: string,
  lessonSlug: string,
) {
  const mod = certification.modules.find((m) => m.slug === moduleSlug);
  if (!mod) return null;
  const lesson = mod.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return { module: mod, lesson };
}

export function flatLessons() {
  return certification.modules.flatMap((m) =>
    m.lessons.map((l) => ({ module: m, lesson: l })),
  );
}
