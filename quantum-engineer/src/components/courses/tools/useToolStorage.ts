"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Per-tool state hook. Persists to localStorage under a stable key so the
 * user's work holds across refreshes and between visits. When the user is
 * logged in and has API access, the same data can also sync to the server
 * — but localStorage is the always-on floor so nothing is ever lost.
 */
export function useToolStorage<T>(
  storageKey: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, { status: "idle" | "saving" | "saved" }] {
  const fullKey = `qe:tool:${storageKey}`;
  const [value, setValue] = useState<T>(initialValue);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const hydratedRef = useRef(false);

  // Hydrate from localStorage once on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(fullKey);
      if (raw != null) {
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      /* ignore corrupted localStorage */
    }
    hydratedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist changes after hydration.
  useEffect(() => {
    if (!hydratedRef.current) return;
    if (typeof window === "undefined") return;
    setStatus("saving");
    try {
      window.localStorage.setItem(fullKey, JSON.stringify(value));
      const t = setTimeout(() => setStatus("saved"), 250);
      return () => clearTimeout(t);
    } catch {
      setStatus("idle");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue, { status }];
}
