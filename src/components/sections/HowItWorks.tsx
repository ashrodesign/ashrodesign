"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "@/lib/data";
import { Icons } from "@/lib/icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const fill = progressRef.current;
    if (!fill) return;

    if (reduced) {
      fill.style.transform = "scaleY(1)";
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.5,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative px-6 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              Going online has never been{" "}
              <span className="text-gradient">this simple</span>
            </>
          }
        />

        <div className="relative mt-14">
          {/* timeline track + scroll-scrubbed fill (GSAP) */}
          <div className="absolute bottom-3 left-[27px] top-3 w-px bg-white/10 sm:left-[31px]">
            <div
              ref={progressRef}
              className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent-glow"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          <ol ref={listRef} className="space-y-10">
            {steps.map((step, i) => {
              const Icon = Icons[step.icon];
              return (
                <li key={step.num} className="relative flex gap-5 sm:gap-7">
                  <motion.div
                    initial={reduced ? false : { scale: 0.55, opacity: 0 }}
                    whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-surface text-accent-glow shadow-[0_0_30px_-10px_rgba(91,59,255,0.7)]"
                  >
                    <Icon size={22} strokeWidth={1.75} />
                  </motion.div>
                  <Reveal delay={i * 0.05} className="pt-1">
                    <span className="text-xs font-semibold tracking-[0.2em] text-accent-glow">
                      STEP {step.num}
                    </span>
                    <h3 className="mt-1.5 text-xl font-semibold text-fg">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
