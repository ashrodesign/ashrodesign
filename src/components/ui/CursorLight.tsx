"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useMediaQuery } from "@/lib/hooks";

/**
 * Soft radial light that follows the cursor with inertia (lerp), scoped to
 * its positioned parent. Disabled on touch devices and under reduced-motion —
 * the hero's auto-drifting bloom carries the effect in those cases.
 */
export function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isTouch = useMediaQuery("(hover: none)");
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (reduced || isTouch) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const rect0 = parent.getBoundingClientRect();
    let targetX = rect0.width / 2;
    let targetY = rect0.height * 0.4;
    let x = targetX;
    let y = targetY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    const loop = () => {
      x += (targetX - x) * 0.09;
      y += (targetY - y) * 0.09;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    parent.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      parent.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced, isTouch]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-0 h-[36rem] w-[36rem] will-change-transform"
      style={{
        background:
          "radial-gradient(circle, rgba(91,59,255,0.20), rgba(58,26,255,0.06) 36%, transparent 66%)",
        transform: "translate3d(50%, 40%, 0) translate(-50%, -50%)",
      }}
    />
  );
}
