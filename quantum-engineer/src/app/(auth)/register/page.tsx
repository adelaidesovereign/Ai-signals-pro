import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = { title: "Create Your Account" };

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { product?: string; email?: string };
}) {
  return (
    <Card className="sm:p-12">
      <div className="space-y-2 text-center">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-sage">
          Welcome in
        </p>
        <h1 className="font-serif text-4xl text-sage">
          Set up your private space.
        </h1>
        <p className="text-base text-sage-deep/85">
          Choose your own username and password. This is your account, tied
          only to you. Your progress and notes will live here.
        </p>
      </div>

      <div className="mt-10">
        <RegisterForm
          presetEmail={searchParams.email}
          product={searchParams.product}
        />
      </div>

      <p className="mt-8 text-center text-sm text-sage-deep/80">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-sage">
          Sign in.
        </Link>
      </p>
    </Card>
  );
}
