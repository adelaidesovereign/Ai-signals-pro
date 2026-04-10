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
        chapter01,
        chapter02,
        chapter03a,
        chapter03b,
        chapter03c,
        chapter04,
        chapter05,
        chapter06,
        chapter07,
        chapter08,
        chapter09,
        chapter10,
        chapter11,
        chapter12,
        chapter13,
      ],
    },
  ],
};

export const FIELD_GUIDE_CHAPTERS = fieldGuide.modules[0].lessons;
