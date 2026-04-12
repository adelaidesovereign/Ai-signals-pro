import type { Course } from "../types";
import { chapter01 } from "./01-what-reality-is";
import { chapter02 } from "./02-what-you-are";
import { chapter03a } from "./03a-the-ras";
import { chapter03b } from "./03b-the-subconscious";
import { chapter03c } from "./03c-hijacking-the-ras";
import { chapter04 } from "./04-nervous-system";
import { chapter05 } from "./05-the-heart";
import { chapter06 } from "./06-wiring-change";
import { chapter07 } from "./07-quantum-collapse";
import { chapter08 } from "./08-gateway-process";
import { chapter09 } from "./09-the-twelve-laws";
import { chapter10 } from "./10-the-toolkit";
import { chapter11 } from "./11-the-daily-protocol";
import { chapter12 } from "./12-your-design";
import { chapter13 } from "./13-what-this-is-not";

// Reading order is deliberately different from the file numbering.
// The student needs immediate nervous system relief before any
// intellectual framework can land. Physics comes later — once the
// body has already felt something shift. Content in each chapter
// file is unchanged; only the reading sequence is reordered.
//
// New order and why:
//   1. Nervous system (immediate relief — the body comes down)
//   2. What you are (the identity question — who are you without fear)
//   3. The heart (coherence as the gate)
//   4. The RAS (the filter explained)
//   5. The subconscious (where the code lives)
//   6. Hijacking the RAS (how to change the filter)
//   7. How change gets wired (memory reconsolidation)
//   8. What reality is (the physics — lands NOW because the body has felt it)
//   9. Quantum collapse (the observer decides)
//  10. The CIA Gateway Process (the credibility layer)
//  11. The twelve laws
//  12. The complete toolkit
//  13. The daily protocol
//  14. Your specific design (Human Design)
//  15. What this is not + glossary

export const fieldGuide: Course = {
  slug: "field-guide",
  product: "FIELD_GUIDE",
  title: "The Quantum Engineer Field Guide",
  tagline:
    "The whole map, in order, for the person coming home to who they actually are.",
  modules: [
    {
      slug: "the-guide",
      title: "The Field Guide",
      lessons: [
        chapter04,   // 1. Nervous system — immediate relief
        chapter02,   // 2. What you are — the identity question
        chapter05,   // 3. The heart as broadcast system
        chapter03a,  // 4. The RAS — the doorman
        chapter03b,  // 5. The subconscious — where the code lives
        chapter03c,  // 6. How to hijack the RAS
        chapter06,   // 7. How change gets wired permanently
        chapter01,   // 8. What reality actually is — the physics
        chapter07,   // 9. Quantum collapse
        chapter08,   // 10. The CIA Gateway Process
        chapter09,   // 11. The twelve laws
        chapter10,   // 12. The complete toolkit
        chapter11,   // 13. The daily protocol
        chapter12,   // 14. Your specific design
        chapter13,   // 15. What this is not + glossary
      ],
    },
  ],
};

export const FIELD_GUIDE_CHAPTERS = fieldGuide.modules[0].lessons;
