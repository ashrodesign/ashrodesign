"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Site-wide smooth inertia scrolling via Lenis, synced with GSAP ScrollTrigger.
 * Also upgrades in-page anchor links to eased scrolling (with sticky-nav offset).
 * Fully bypassed under prefers-reduced-motion — native scrolling is used instead.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    let lenis: Lenis | null = null;

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const dest = document.querySelector(hash);
      if (!dest) return;

      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(dest as HTMLElement, { offset: -84 });
      } else {
        (dest as HTMLElement).scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "start",
        });
      }
      // let the mobile menu (and anything else) know navigation happened
      window.dispatchEvent(new CustomEvent("ashro:navigate"));
    };

    if (reduced) {
      document.addEventListener("click", handleAnchorClick);
      return () => document.removeEventListener("click", handleAnchorClick);
    }

    gsap.registerPlugin(ScrollTrigger);
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });

    const raf = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
