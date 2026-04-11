import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Checkout coming soon",
};

const PRODUCT_LABELS: Record<
  string,
  { name: string; preview: string; price: string }
> = {
  "field-guide": {
    name: "The Quantum Engineer Field Guide",
    preview: "/field-guide",
    price: "$27",
  },
  certification: {
    name: "The Certification Program",
    preview: "/certification",
    price: "$497",
  },
  "certification-plan": {
    name: "The Certification Program (payment plan)",
    preview: "/certification",
    price: "3 × $167",
  },
  "inner-circle": {
    name: "The Inner Circle",
    preview: "/inner-circle",
    price: "$97 / month",
  },
};

export default function CheckoutUnavailablePage({
  searchParams,
}: {
  searchParams: { product?: string };
}) {
  const product = searchParams.product ?? "field-guide";
  const info = PRODUCT_LABELS[product] ?? PRODUCT_LABELS["field-guide"];

  return (
    <div className="min-h-screen bg-cream">
      <Container size="narrow" className="py-24">
        <Card className="sm:p-12 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
            One step away
          </p>
          <h1 className="mt-4 font-serif text-4xl text-sage sm:text-5xl">
            Checkout is not live yet.
          </h1>
          <p className="mt-6 text-base text-sage-deep/85">
            You were trying to buy <strong>{info.name}</strong> ({info.price}).
            The Stripe side of this is not configured on this deploy yet, so
            the real checkout page is not ready for you right now.
          </p>
          <p className="mt-4 text-sm text-sage-deep/75">
            While that is being set up, you can still walk through the product
            and read the first chapter or lesson as a preview.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={info.preview} size="lg">
              Preview {info.name}
            </Button>
            <Link
              href="/services"
              className="font-sans text-sm underline underline-offset-4 hover:text-sage"
            >
              Back to the three doorways
            </Link>
          </div>

          <p className="mt-10 text-xs text-sage-deep/55">
            Developer note: set <code>STRIPE_SECRET_KEY</code> and the
            matching <code>STRIPE_PRICE_*</code> variables in your
            environment to bring this checkout online.
          </p>
        </Card>
      </Container>
    </div>
  );
}
