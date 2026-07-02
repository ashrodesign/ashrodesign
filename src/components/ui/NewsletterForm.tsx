"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "submitting" | "done">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <p className="flex items-center gap-2 text-sm text-accent-glow">
        <Check size={16} strokeWidth={2.5} />
        You&apos;re subscribed — talk soon!
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1 pl-4 transition-colors focus-within:border-accent/60">
        <input
          type="email"
          inputMode="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Your email"
          aria-label="Email address"
          aria-invalid={status === "error"}
          disabled={status === "submitting"}
          className="h-9 w-full bg-transparent text-sm text-fg placeholder:text-muted-2 focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === "submitting"}
          className="btn-glow flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2D00D6,#5B3BFF)] text-white transition-transform hover:scale-105 disabled:opacity-60"
        >
          <ArrowRight size={16} />
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
