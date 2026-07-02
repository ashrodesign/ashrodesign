"use client";

import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";

type SpotlightCardProps = {
  children: ReactNode;
  /** Applied to the inner content wrapper (e.g. layout + padding). */
  className?: string;
};

/**
 * Frosted-glass card that lifts on hover and emits a soft accent light
 * tracking the cursor across its surface. Disabled under reduced motion.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const reduced = usePrefersReducedMotion();

  const handleMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      onMouseMove={handleMove}
      className="group/spot glass hairline relative h-full overflow-hidden rounded-3xl transition-[transform,border-color] duration-500 will-change-transform hover:-translate-y-1 hover:border-white/20"
    >
      {!reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
          style={{
            background:
              "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(91,59,255,0.16), transparent 72%)",
          }}
        />
      )}
      <div className={cn("relative z-[1] h-full", className)}>{children}</div>
    </div>
  );
}
