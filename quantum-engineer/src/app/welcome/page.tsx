import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { WelcomeSetupForm } from "./WelcomeSetupForm";

export const metadata: Metadata = { title: "Welcome In" };

export default async function WelcomePage({
  searchParams,
}: {
  searchParams: { session_id?: string; product?: string };
}) {
  const sessionId = searchParams.session_id;
  const product = searchParams.product ?? "field-guide";

  if (!sessionId) redirect("/services");

  let email: string | null = null;
  let firstName: string | null = null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    email =
      session.customer_details?.email ??
      (session.customer_email as string | null) ??
      null;
    firstName = session.customer_details?.name?.split(" ")[0] ?? null;
  } catch {
    // fall through
  }

  if (!email) {
    return (
      <Container size="narrow" className="py-24">
        <Card className="sm:p-12 text-center">
          <h1 className="font-serif text-4xl text-sage">
            Your order is in.
          </h1>
          <p className="mt-4 text-sage-deep/85">
            Check the email you used at checkout. Your setup link is on its
            way.
          </p>
        </Card>
      </Container>
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
  const needsSetup =
    !existing || existing.passwordHash.startsWith("$2a$12$placeholder");

  return (
    <Container size="narrow" className="py-24">
      <Card className="sm:p-12">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
          Welcome in, {firstName ?? "friend"}
        </p>
        <h1 className="mt-3 font-serif text-4xl text-sage sm:text-5xl">
          Your order is complete.
        </h1>
        <p className="mt-4 text-base text-sage-deep/90">
          Thank you for being here. Before you start, set your private
          username and password. This is your account. Nothing in it is
          visible to anyone else.
        </p>

        {needsSetup ? (
          <div className="mt-10">
            <WelcomeSetupForm
              email={email}
              firstName={firstName ?? undefined}
              product={product}
            />
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            <p className="text-sage-deep/85">
              Your account already exists. Sign in and your new purchase will
              be waiting for you.
            </p>
            <Button href="/login" size="lg">
              Sign in
            </Button>
          </div>
        )}

        {/* Upsell: $27 buyer sees the $497 offer */}
        {product === "field-guide" && (
          <div className="mt-12 rounded-soft border border-sage/20 bg-cream-deep/60 p-8">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
              One invitation, only here
            </p>
            <h2 className="mt-2 font-serif text-2xl text-sage">
              Ready to do the work, not just read about it?
            </h2>
            <p className="mt-3 text-sage-deep/85">
              The Field Guide gives you the complete model. The Certification
              Program is where the installation happens. If you add it now,
              you can begin Module 1 the same day you finish the Field Guide.
            </p>
            <div className="mt-6">
              <Link
                href="/services#certification"
                className="font-sans text-xs uppercase tracking-[0.15em] text-sage underline underline-offset-4 hover:text-sage-deep"
              >
                See the Certification Program — $497
              </Link>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}
