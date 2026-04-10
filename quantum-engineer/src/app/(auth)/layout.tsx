import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream-deep/50">
      <div className="border-b border-sage/10 bg-cream/85 backdrop-blur-md">
        <Container size="wide">
          <div className="flex items-center justify-between py-5">
            <Link href="/" className="font-serif text-2xl text-sage">
              Adelaide Taylor
            </Link>
            <Link
              href="/"
              className="font-sans text-xs uppercase tracking-[0.15em] text-sage-deep hover:text-sage"
            >
              Back to site
            </Link>
          </div>
        </Container>
      </div>

      <Container size="narrow" className="py-16 sm:py-24">
        {children}
      </Container>
    </div>
  );
}
