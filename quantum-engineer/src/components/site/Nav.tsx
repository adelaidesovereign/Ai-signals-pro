import Link from "next/link";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "The Work" },
  { href: "/meditations", label: "Meditations" },
  { href: "/quiz", label: "Quiz" },
  { href: "/login", label: "Member Login" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-sage/10 bg-cream/85 backdrop-blur-md">
      <Container size="wide">
        <nav className="flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-serif text-2xl text-sage transition-colors hover:text-sage-deep"
          >
            Adelaide Taylor
            <span className="ml-2 hidden text-xs uppercase tracking-[0.2em] text-sage-light sm:inline">
              The Quantum Engineer
            </span>
          </Link>
          <ul className="flex items-center gap-7 font-sans text-sm text-sage-deep">
            {links.map((link) => (
              <li key={link.href} className="hidden sm:block">
                <Link
                  href={link.href}
                  className="transition-colors hover:text-sage"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className="rounded-soft border border-sage/30 px-4 py-2 text-xs uppercase tracking-[0.15em] text-sage transition-colors hover:border-sage hover:bg-cream-warm"
              >
                Begin
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
