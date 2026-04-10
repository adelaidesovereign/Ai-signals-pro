import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  return (
    <Tag
      className={cn(
        "rounded-soft border border-sage/10 bg-cream-warm p-8 shadow-card transition-shadow duration-300 hover:shadow-soft",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
