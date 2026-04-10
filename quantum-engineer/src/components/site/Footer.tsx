import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FooterCapture } from "./FooterCapture";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-sage/15 bg-cream-deep/60 py-16">
      <Container size="wide">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <p className="font-serif text-2xl text-sage">Adelaide Taylor</p>
            <p className="font-sans text-sm text-sage-deep/75">
              Consciousness engineering. The science of becoming who you
              actually are.
            </p>
          </div>

          <div className="space-y-4">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
              Explore
            </p>
            <ul className="space-y-2 text-sm text-sage-deep/85">
              <li>
                <Link href="/about" className="hover:text-sage">
                  About Adelaide
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-sage">
                  The Work
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-sage">
                  Which Layer Are You Stuck In
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-sage">
                  Member Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
              Letters from Adelaide
            </p>
            <p className="font-sans text-sm text-sage-deep/75">
              Occasional, unhurried writing. No noise.
            </p>
            <FooterCapture />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-sage/15 pt-8 text-xs text-sage-deep/60 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} Adelaide Taylor. All rights
            reserved.
          </p>
          <p className="font-sans tracking-[0.15em] uppercase">
            ShesAdelaide.com
          </p>
        </div>
      </Container>
    </footer>
  );
}
