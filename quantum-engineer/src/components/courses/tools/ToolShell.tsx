import { cn } from "@/lib/cn";

export function ToolShell({
  title,
  description,
  status,
  children,
  className,
}: {
  title: string;
  description?: string;
  status?: "idle" | "saving" | "saved";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "my-10 rounded-soft border border-sage/15 bg-cream-warm p-8 shadow-card sm:p-10",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
            Practice
          </p>
          <h3 className="mt-2 font-serif text-2xl text-sage sm:text-3xl">
            {title}
          </h3>
          {description && (
            <p className="mt-3 max-w-prose text-base text-sage-deep/85">
              {description}
            </p>
          )}
        </div>
        {status && (
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sage-deep/50">
            {status === "saving"
              ? "Saving"
              : status === "saved"
                ? "Saved"
                : ""}
          </p>
        )}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
