"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function FooterCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/convertkit/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setStatus("ok");
      setMessage("You're on the list. Check your inbox.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something did not connect. Try again in a moment.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input
        id="footer-email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        aria-label="Email address"
      />
      <Button
        type="submit"
        variant="secondary"
        size="sm"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending" : "Subscribe"}
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
    </form>
  );
}
