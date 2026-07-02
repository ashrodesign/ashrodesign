"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      return;
    }
    // TODO: wire to email provider (Omnisend / Mailchimp / etc.)
    setStatus("done");
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
          className="h-9 w-full bg-transparent text-sm text-fg placeholder:text-muted-2 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="btn-glow flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2D00D6,#5B3BFF)] text-white transition-transform hover:scale-105"
        >
          <ArrowRight size={16} />
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="mt-2 text-xs text-red-400">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
