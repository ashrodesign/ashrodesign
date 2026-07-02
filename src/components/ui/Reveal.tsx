"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel distance in px. */
  y?: number;
  /** Stagger delay in seconds. */
  delay?: number;
};

/**
 * Scroll-reveal wrapper: fades + lifts content into view once.
 * Honors prefers-reduced-motion by rendering statically.
 */
export function Reveal({ children, className, y = 24, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
