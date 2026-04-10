"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function WelcomeSetupForm({
  email,
  firstName,
  product,
}: {
  email: string;
  firstName?: string;
  product: string;
}) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(firstName ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch("/api/auth/welcome-setup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, firstName: name, username, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something did not connect. Try again.");
      setLoading(false);
      return;
    }

    const signed = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (signed?.error) {
      router.push("/login");
      return;
    }

    const dest =
      product === "certification"
        ? "/certification"
        : product === "inner-circle"
          ? "/inner-circle"
          : "/field-guide";
    router.push(dest);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <Input
        id="welcome-name"
        label="First name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        id="welcome-username"
        label="Choose a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        pattern="[a-zA-Z0-9_.-]{3,30}"
        title="3–30 characters: letters, numbers, dot, underscore, hyphen"
      />
      <Input
        id="welcome-password"
        type="password"
        label="Choose a password (at least 8 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
        autoComplete="new-password"
      />
      {error && <p className="text-sm text-sage-deep">{error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? "Setting up your account" : "Open my account"}
      </Button>
    </form>
  );
}
