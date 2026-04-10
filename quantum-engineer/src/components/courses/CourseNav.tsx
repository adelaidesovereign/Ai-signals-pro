import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function CourseNav({
  backHref,
  backLabel,
  title,
  userName,
}: {
  backHref: string;
  backLabel: string;
  title: string;
  userName?: string | null;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-sage/10 bg-cream/90 backdrop-blur-md">
      <Container size="wide">
        <div className="flex items-center justify-between py-4">
          <Link
            href={backHref}
            className="font-sans text-xs uppercase tracking-[0.15em] text-sage-deep hover:text-sage"
          >
            &larr; {backLabel}
          </Link>
          <p className="hidden font-serif text-lg text-sage sm:block">
            {title}
          </p>
          <Link
            href="/dashboard"
            className="font-sans text-xs uppercase tracking-[0.15em] text-sage-deep hover:text-sage"
          >
            {userName ? `Hi, ${userName}` : "Your dashboard"}
          </Link>
        </div>
      </Container>
    </header>
  );
}
