"use client";

import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "subtle";
type Size = "md" | "lg";

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-colors duration-300 will-change-transform focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  primary:
    "btn-glow text-white shadow-[0_8px_30px_-8px_rgba(58,26,255,0.6)] " +
    "bg-[linear-gradient(135deg,#2D00D6_0%,#3A1AFF_45%,#5B3BFF_100%)] " +
    "before:absolute before:inset-0 before:rounded-full before:bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent_55%)] before:opacity-60 before:transition-opacity hover:before:opacity-90",
  ghost:
    "border border-white/15 bg-white/[0.02] text-fg hover:border-white/30 hover:bg-white/[0.06]",
  subtle: "bg-white/[0.06] text-fg hover:bg-white/[0.1] border border-white/10",
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export function Button({
  variant = "primary",
  size = "lg",
  href,
  type = "button",
  onClick,
  target,
  rel,
  ariaLabel,
  disabled,
  className,
  children,
}: ButtonProps) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  // Magnetic pull: nudge the button a few px toward the cursor.
  const handleMove = (e: ReactMouseEvent<HTMLElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(clamp((e.clientX - (r.left + r.width / 2)) * 0.15, -5, 5));
    y.set(clamp((e.clientY - (r.top + r.height / 2)) * 0.15, -4, 4));
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <span className="relative z-[1] inline-flex items-center gap-2">
      {children}
    </span>
  );
  const interaction = {
    style: { x: sx, y: sy },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    whileTap: reduced ? undefined : { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        aria-label={ariaLabel}
        className={classes}
        onClick={onClick}
        {...interaction}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
      {...interaction}
    >
      {content}
    </motion.button>
  );
}
