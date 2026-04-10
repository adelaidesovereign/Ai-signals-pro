import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide" | "reading";
}) {
  const sizes: Record<string, string> = {
    default: "max-w-5xl",
    narrow: "max-w-3xl",
    wide: "max-w-6xl",
    reading: "max-w-reading",
  };
  return (
    <div className={cn("mx-auto w-full px-6 sm:px-8", sizes[size], className)}>
      {children}
    </div>
  );
}
