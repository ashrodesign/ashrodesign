"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";

const trust = [
  "Bahamian-owned",
  "Local + diaspora reach",
  "Web · Ads · Email · SMS · Design",
];

export function Hero() {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };
  const item: Variants = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 26 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
      };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32"
    >
      {/* animated WebGL aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <ShaderBackground className="absolute inset-0 h-full w-full" />
        {/* readability scrim + brand vignette so text stays legible over the aurora */}
        <div className="absolute inset-0 bg-bg/40" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_15%,transparent_35%,rgba(10,11,15,0.62)_100%)]" />
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-7xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={item} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted backdrop-blur">
              <Sparkles size={15} className="text-accent-glow" />
              Trusted By Bahamian Businesses
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-fg sm:text-6xl md:text-[4.5rem]"
          >
            Bahamas E-Commerce Marketing Agency{" "}
            <span className="text-gradient">For Local Stores</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted sm:text-xl"
          >
            We design your website, manage your ads, and run your marketing — so
            your store sells 24/7.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="#contact" size="lg">
              Book a Strategy Call
              <ArrowRight size={18} />
            </Button>
            <Button href="#pricing" size="lg" variant="ghost">
              See Pricing
            </Button>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-2"
          >
            {trust.map((t, i) => (
              <li key={t} className="flex items-center gap-6">
                {i > 0 && (
                  <span aria-hidden className="hidden h-1 w-1 rounded-full bg-muted-2 sm:block" />
                )}
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* fade into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" />
    </section>
  );
}
