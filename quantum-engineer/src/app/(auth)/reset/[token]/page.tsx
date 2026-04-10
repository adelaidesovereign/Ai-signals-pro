import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { ResetConfirmForm } from "./ResetConfirmForm";

export const metadata: Metadata = { title: "Choose a New Password" };

export default function ResetConfirmPage({
  params,
}: {
  params: { token: string };
}) {
  return (
    <Card className="sm:p-12">
      <div className="space-y-2 text-center">
        <h1 className="font-serif text-4xl text-sage">Choose a new password.</h1>
        <p className="text-base text-sage-deep/85">
          At least 8 characters. Make it something you can actually remember.
        </p>
      </div>
      <div className="mt-10">
        <ResetConfirmForm token={params.token} />
      </div>
    </Card>
  );
}
