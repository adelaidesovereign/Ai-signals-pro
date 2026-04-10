import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { AccountForm } from "./AccountForm";

export const metadata: Metadata = { title: "Account Settings" };

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?next=/dashboard/account");
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-sage/10 bg-cream/90 backdrop-blur-md">
        <Container size="wide">
          <div className="flex items-center justify-between py-5">
            <Link
              href="/dashboard"
              className="font-sans text-xs uppercase tracking-[0.15em] text-sage-deep hover:text-sage"
            >
              &larr; Dashboard
            </Link>
            <p className="font-serif text-lg text-sage">Account</p>
            <span />
          </div>
        </Container>
      </header>

      <Container size="narrow" className="py-16 sm:py-20">
        <p className="font-sans text-xs uppercase tracking-[0.25em] text-sage">
          Your account
        </p>
        <h1 className="mt-4 font-serif text-5xl text-sage sm:text-6xl">
          Settings.
        </h1>
        <p className="mt-4 max-w-prose text-lg text-sage-deep/85">
          Update your name, your username, your email, and your password. You
          chose these yourself. You can change them whenever you want.
        </p>

        <Card className="mt-10 sm:p-10">
          <AccountForm
            initialFirstName={user.firstName ?? ""}
            initialLastName={user.lastName ?? ""}
            initialUsername={user.username}
            initialEmail={user.email}
          />
        </Card>
      </Container>
    </div>
  );
}
