import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Elevated surface card that lifts and blooms a soft accent glow on hover.
 * Uses transform/opacity only (GPU-friendly).
 */
export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div
      className={cn(
        "group/card relative overflow-hidden rounded-3xl border border-white/[0.08] bg-surface/60 transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-white/[0.18]",
        className,
      )}
    >
      {/* hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(130% 120% at 50% 0%, rgba(91,59,255,0.14), transparent 58%)",
        }}
      />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
