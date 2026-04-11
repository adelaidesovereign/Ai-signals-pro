"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ReminderOptIn() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const tz =
        typeof Intl !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : undefined;
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, timezone: tz }),
      });
      if (!res.ok) throw new Error();
      setStatus("ok");
      setMessage("You are on the list. Tomorrow morning, check your inbox.");
      setEmail("");
      setFirstName("");
    } catch {
      setStatus("error");
      setMessage("Something did not connect. Try again in a moment.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          id="reminder-name"
          label="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Adelaide"
        />
        <Input
          id="reminder-email"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
        />
      </div>
      <Button
        type="submit"
        size="sm"
        disabled={status === "loading" || !email}
      >
        {status === "loading" ? "Setting it up" : "Remind me each morning"}
      </Button>
      {message && (
        <p
          className={
            status === "ok"
              ? "text-xs text-sage"
              : "text-xs text-sage-deep/80"
          }
        >
          {message}
        </p>
      )}
      <p className="text-xs text-sage-deep/60">
        One short letter at the top of each morning with your protocol. No
        noise. Stop any time with one click.
      </p>
    </form>
  );
}
