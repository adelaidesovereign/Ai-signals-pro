import type { CourseBlock, CourseInteractive } from "@/content/courses/types";
import { cn } from "@/lib/cn";
import { WritingPrompt } from "./tools/WritingPrompt";
import { Breathwork } from "./tools/Breathwork";
import { IdentityBuilder } from "./tools/IdentityBuilder";
import { DailyChecklist } from "./tools/DailyChecklist";
import { SomaticFind } from "./tools/SomaticFind";
import { HeartCoherence } from "./tools/HeartCoherence";
import { PartsWork } from "./tools/PartsWork";
import { ReconsolidationHold } from "./tools/ReconsolidationHold";
import { MantraInstaller } from "./tools/MantraInstaller";
import { PresentMomentAnchor } from "./tools/PresentMomentAnchor";
import { VisionLetter } from "./tools/VisionLetter";
import { WeeklyReview } from "./tools/WeeklyReview";
import { EFTTapping } from "./tools/EFTTapping";
import { PrePostAssessment } from "./tools/PrePostAssessment";
import { SelfCompassionBreak } from "./tools/SelfCompassionBreak";
import { PolyvagalLadder } from "./tools/PolyvagalLadder";
import { DecoherenceCatcher } from "./tools/DecoherenceCatcher";
import { CommitmentScroll } from "./tools/CommitmentScroll";

export function CourseBlocks({ blocks }: { blocks: CourseBlock[] }) {
  return (
    <div className="space-y-7">
      {blocks.map((block, i) => (
        <RenderBlock key={i} block={block} />
      ))}
    </div>
  );
}

function RenderBlock({ block }: { block: CourseBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-lg leading-[1.85] text-sage-deep/90">{block.text}</p>
      );
    case "h":
      return (
        <h3 className="pt-6 font-serif text-3xl text-sage sm:text-[2rem]">
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <figure className="my-6 border-l-2 border-sage/40 pl-6">
          <blockquote className="font-serif text-2xl italic leading-snug text-sage sm:text-[1.75rem]">
            {block.text}
          </blockquote>
          {block.attribution && (
            <figcaption className="mt-3 font-sans text-xs uppercase tracking-[0.2em] text-sage-deep/60">
              &mdash; {block.attribution}
            </figcaption>
          )}
        </figure>
      );
    case "list":
      return (
        <ul className="space-y-3 text-lg leading-[1.8] text-sage-deep/90">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sage" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "note":
      return (
        <aside
          className={cn(
            "my-4 rounded-soft border border-sage/20 bg-cream-deep/60 px-6 py-5",
            "text-base italic leading-relaxed text-sage-deep/90",
          )}
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] not-italic text-sage">
            A small pause
          </p>
          <p className="mt-2">{block.text}</p>
        </aside>
      );
    case "video":
      // Video blocks are retained in the type union for backward
      // compatibility but are no longer rendered. The program is
      // text + interactive practice + live calls only. No recorded
      // media is required, and the restraint is a feature, not a gap.
      return null;
    case "script":
      return (
        <div className="my-10 rounded-soft border-l-2 border-sage/40 bg-cream-warm px-8 py-7 shadow-card">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
            From Adelaide
          </p>
          <div className="mt-4 space-y-5 font-serif text-[1.35rem] leading-[1.65] text-sage-deep/95">
            {block.text.split(/\n\n+/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      );
    case "tool":
      return <RenderInteractive block={block} />;
    default:
      return null;
  }
}

function RenderInteractive({ block }: { block: CourseInteractive }) {
  switch (block.tool) {
    case "writing-prompt":
      return (
        <WritingPrompt
          title={block.title}
          prompt={block.prompt}
          placeholder={block.placeholder}
          minRows={block.minRows}
          storageKey={block.storageKey}
        />
      );
    case "breathwork":
      return (
        <Breathwork
          title={block.title}
          description={block.description}
          inhale={block.inhale}
          hold={block.hold}
          exhale={block.exhale}
          cycles={block.cycles}
          storageKey={block.storageKey}
        />
      );
    case "identity-builder":
      return (
        <IdentityBuilder
          title={block.title}
          description={block.description}
          fields={block.fields}
          storageKey={block.storageKey}
        />
      );
    case "daily-checklist":
      return (
        <DailyChecklist
          title={block.title}
          description={block.description}
          items={block.items}
          storageKey={block.storageKey}
        />
      );
    case "somatic-find":
      return (
        <SomaticFind
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
        />
      );
    case "heart-coherence":
      return (
        <HeartCoherence
          title={block.title}
          description={block.description}
          durationSeconds={block.durationSeconds}
          storageKey={block.storageKey}
        />
      );
    case "parts-work":
      return (
        <PartsWork
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
        />
      );
    case "reconsolidation":
      return (
        <ReconsolidationHold
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
        />
      );
    case "mantra-installer":
      return (
        <MantraInstaller
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
          repeats={block.repeats}
        />
      );
    case "present-moment-anchor":
      return (
        <PresentMomentAnchor
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
        />
      );
    case "vision-letter":
      return (
        <VisionLetter
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
          timeframe={block.timeframe}
        />
      );
    case "weekly-review":
      return (
        <WeeklyReview
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
        />
      );
    case "eft-tapping":
      return (
        <EFTTapping
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
        />
      );
    case "pre-post-assessment":
      return (
        <PrePostAssessment
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
          snapshotLabel={block.snapshotLabel}
        />
      );
    case "self-compassion-break":
      return (
        <SelfCompassionBreak
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
        />
      );
    case "polyvagal-ladder":
      return (
        <PolyvagalLadder
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
        />
      );
    case "decoherence-catcher":
      return (
        <DecoherenceCatcher
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
        />
      );
    case "commitment-scroll":
      return (
        <CommitmentScroll
          title={block.title}
          description={block.description}
          storageKey={block.storageKey}
        />
      );
    default:
      return null;
  }
}
