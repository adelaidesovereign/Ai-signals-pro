import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-4xl leading-tight text-sage sm:text-5xl">
        {title}
      </h2>
      {children && (
        <div className="mx-auto max-w-prose text-base text-sage-deep/85">
          {children}
        </div>
      )}
    </div>
  );
}
