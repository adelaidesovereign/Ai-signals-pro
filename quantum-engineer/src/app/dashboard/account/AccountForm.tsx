"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Props = {
  initialFirstName: string;
  initialLastName: string;
  initialUsername: string;
  initialEmail: string;
};

export function AccountForm({
  initialFirstName,
  initialLastName,
  initialUsername,
  initialEmail,
}: Props) {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setMessage(null);
    const res = await fetch("/api/account", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        username,
        email,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setStatus("error");
      setMessage(data.error ?? "Something did not connect. Try again.");
      return;
    }
    setStatus("saved");
    setMessage("Saved. Your account is up to date.");
    setCurrentPassword("");
    setNewPassword("");
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="first-name"
          label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          id="last-name"
          label="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <Input
        id="username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        pattern="[a-zA-Z0-9_.-]{3,30}"
        required
      />
      <Input
        id="email"
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className="border-t border-sage/15 pt-6">
        <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
          Change password (optional)
        </p>
        <div className="mt-4 space-y-4">
          <Input
            id="current-password"
            type="password"
            label="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Input
            id="new-password"
            type="password"
            label="New password (at least 8 characters)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
            minLength={8}
          />
        </div>
      </div>

      {message && (
        <p
          className={
            status === "error"
              ? "text-sm text-sage-deep"
              : "text-sm text-sage"
          }
        >
          {message}
        </p>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={status === "saving"}>
          {status === "saving" ? "Saving" : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
