import { socials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function SocialGlyph({ name }: { name: string }) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-7.5h2.5l.4-2.9h-2.9V8.7c0-.84.23-1.41 1.44-1.41H16.5V4.68c-.27-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9v2.18H7.9v2.9h2.52V21h3.08Z" />
      </svg>
    );
  }
  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.2 5 12 5 12 5s-7.2 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3 26 26 0 0 0 1 12a26 26 0 0 0 .4 4.7 2.5 2.5 0 0 0 1.8 1.8C4.8 19 12 19 12 19s7.2 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.7.4-4.7Z" />
        <path d="M9.8 15.3V8.7l5.7 3.3-5.7 3.3Z" fill="#0a0b0f" />
      </svg>
    );
  }
  // tiktok
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2.1 1.5 3.5 3.5 3.7v2.5c-1.2.1-2.4-.2-3.5-.9v5.5c0 3.3-2.4 5.4-5.2 5.4-2.7 0-4.8-2-4.8-4.7 0-2.8 2.3-4.8 5.2-4.4v2.6c-.4-.1-.9-.2-1.3-.1-1.1.2-1.8 1-1.7 2.1.1 1.1 1 1.9 2.1 1.8 1.2-.1 1.9-1 1.9-2.3V3h3.6Z" />
    </svg>
  );
}

/** Row of social links — shared across footer, mobile menu, and contact. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-3", className)}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all hover:border-accent/50 hover:text-accent-glow"
        >
          <SocialGlyph name={s.icon} />
        </a>
      ))}
    </div>
  );
}
