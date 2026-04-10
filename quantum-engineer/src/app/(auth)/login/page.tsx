import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Member Login" };

export default function LoginPage() {
  return (
    <Card className="sm:p-12">
      <div className="space-y-2 text-center">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
          Welcome back
        </p>
        <h1 className="font-serif text-4xl text-sage">Come back in.</h1>
        <p className="text-base text-sage-deep/85">
          Your place. Your work. Your private notes are right where you left
          them.
        </p>
      </div>

      <div className="mt-10">
        <LoginForm />
      </div>

      <div className="mt-8 space-y-2 text-center text-sm text-sage-deep/80">
        <p>
          <Link href="/reset" className="underline hover:text-sage">
            Forgot your password?
          </Link>
        </p>
        <p>
          New here?{" "}
          <Link href="/services" className="underline hover:text-sage">
            Begin with the Field Guide.
          </Link>
        </p>
      </div>
    </Card>
  );
}
