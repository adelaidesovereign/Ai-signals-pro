"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "qe:coach:messages";
const MAX_STORED = 40;

export function CoachChat({
  firstName,
  context,
}: {
  firstName: string | null;
  context: {
    layerName: string | null;
    fgDone: number;
    certDone: number;
  };
}) {
  const openingMessage: Message = {
    role: "assistant",
    content: openingLine(firstName, context),
  };
  const [messages, setMessages] = useState<Message[]>([openingMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallbackActive, setFallbackActive] = useState(false);
  const hydratedRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      /* ignore corrupted local state */
    }
    hydratedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(messages.slice(-MAX_STORED)),
      );
    } catch {
      /* ignore quota */
    }
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const next: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/coach/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next
            .filter(
              (m, i) =>
                !(i === 0 && m.role === "assistant" && m.content === openingMessage.content),
            )
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "The coach did not reach back this time.");
        setLoading(false);
        return;
      }
      setFallbackActive(Boolean(data.fallback));
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setError("Connection dropped. Try once more.");
    } finally {
      setLoading(false);
    }
  }

  function clearConversation() {
    setMessages([openingMessage]);
    setError(null);
    setFallbackActive(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  return (
    <div className="rounded-soft border border-sage/15 bg-cream-warm shadow-card">
      {fallbackActive && (
        <div className="border-b border-sage/15 bg-cream-deep/50 px-6 py-3">
          <p className="text-xs text-sage-deep/75">
            Adelaide's coach is in template mode on this deploy. Set{" "}
            <code className="rounded bg-sage/10 px-1 py-0.5 text-[0.8em]">
              ANTHROPIC_API_KEY
            </code>{" "}
            in your environment to hear the real voice.
          </p>
        </div>
      )}

      <div
        ref={scrollRef}
        className="max-h-[60vh] min-h-[320px] overflow-y-auto px-6 py-6 sm:px-8"
      >
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} content={m.content} />
        ))}
        {loading && (
          <div className="mt-4 flex items-center gap-3 text-sm text-sage-deep/60">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sage" />
            <span className="font-serif italic">
              Adelaide is reading what you wrote…
            </span>
          </div>
        )}
        {error && (
          <p className="mt-4 text-sm text-sage-deep/80">{error}</p>
        )}
      </div>

      <form
        onSubmit={send}
        className="flex gap-3 border-t border-sage/15 px-6 py-4 sm:px-8"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write what is alive for you right now…"
          rows={2}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          className="flex-1 resize-none rounded-soft border border-sage/20 bg-cream px-4 py-3 font-serif text-base text-sage-deep outline-none focus:border-sage focus:ring-2 focus:ring-sage/15"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="self-end rounded-soft bg-sage px-5 py-3 font-sans text-xs uppercase tracking-quiet text-cream-warm shadow-soft transition-all hover:bg-sage-deep disabled:opacity-50"
        >
          Send
        </button>
      </form>

      <div className="flex items-center justify-between border-t border-sage/10 px-6 py-3 text-[10px] uppercase tracking-[0.15em] text-sage-deep/55 sm:px-8">
        <span>Conversations hold on this device</span>
        <button
          onClick={clearConversation}
          className="hover:text-sage"
        >
          Clear conversation
        </button>
      </div>
    </div>
  );
}

function ChatBubble({ role, content }: { role: "user" | "assistant"; content: string }) {
  if (role === "user") {
    return (
      <div className="mb-5 flex justify-end">
        <div className="max-w-[85%] rounded-soft bg-sage/15 px-5 py-3 font-serif text-base leading-relaxed text-sage-deep">
          {content.split(/\n\n+/).map((para, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>
              {para}
            </p>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="mb-5">
      <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-sage">
        Adelaide
      </p>
      <div className="mt-2 max-w-[92%] space-y-3 font-serif text-[1.125rem] leading-relaxed text-sage-deep/95">
        {content.split(/\n\n+/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  );
}

function openingLine(
  firstName: string | null,
  context: { layerName: string | null; fgDone: number; certDone: number },
): string {
  const name = firstName ? `${firstName}, ` : "";
  const progress =
    context.fgDone > 0 || context.certDone > 0
      ? ` I can see you are ${context.fgDone} chapters into the Field Guide and ${context.certDone} lessons into the Certification Program.`
      : "";
  const layer = context.layerName
    ? ` Your quiz says you are currently working at ${context.layerName}.`
    : "";
  return `${name}hello. This is a real conversation, so write to me the way you would write to yourself in the quiet hour before sleep.${progress}${layer} What is alive for you right now?`;
}
