import type { CourseBlock } from "@/content/courses/types";
import { cn } from "@/lib/cn";

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
      return (
        <div className="my-6 overflow-hidden rounded-soft border border-sage/20 bg-cream-warm shadow-card">
          <div className="relative aspect-video bg-cream-deep">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/90 text-sage-deep shadow-soft transition-transform hover:scale-105">
                <svg
                  className="ml-1 h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="font-sans text-[11px] uppercase tracking-[0.25em] text-sage-deep/60">
                Video placeholder
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-sage/10 px-5 py-3 text-sm">
            <p className="font-serif text-lg text-sage">{block.title}</p>
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-sage-deep/60">
              {block.duration}
            </p>
          </div>
        </div>
      );
    case "script":
      return (
        <div className="my-6 rounded-soft border border-sage/15 bg-cream-warm px-6 py-5">
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
            Full script
          </p>
          <p className="mt-3 whitespace-pre-wrap font-serif text-xl leading-relaxed text-sage-deep/90">
            {block.text}
          </p>
        </div>
      );
    default:
      return null;
  }
}
