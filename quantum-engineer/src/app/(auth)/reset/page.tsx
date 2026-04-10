import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { ResetRequestForm } from "./ResetRequestForm";

export const metadata: Metadata = { title: "Reset Your Password" };

export default function ResetPage() {
  return (
    <Card className="sm:p-12">
      <div className="space-y-2 text-center">
        <h1 className="font-serif text-4xl text-sage">Reset your password.</h1>
        <p className="text-base text-sage-deep/85">
          Enter the email you use for your account. If we have a record of it,
          a reset link will be on its way.
        </p>
      </div>
      <div className="mt-10">
        <ResetRequestForm />
      </div>
      <p className="mt-8 text-center text-sm text-sage-deep/80">
        <Link href="/login" className="underline hover:text-sage">
          Back to sign in
        </Link>
      </p>
    </Card>
  );
}
