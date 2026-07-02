"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) =>
    setOpen((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );

  return (
    <section className="px-6 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Got questions? <span className="text-gradient">We&apos;ve got answers</span>
            </>
          }
        />

        <div className="mt-12 border-y border-white/10">
          {faqs.map((f, i) => {
            const isOpen = open.includes(i);
            return (
              <div key={f.q} className="border-b border-white/10 last:border-b-0">
                <h3>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => toggle(i)}
                    className="group/faq flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "text-base font-medium transition-colors sm:text-lg",
                        isOpen
                          ? "text-fg"
                          : "text-fg/90 group-hover/faq:text-fg",
                      )}
                    >
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors",
                        isOpen
                          ? "border-accent/40 bg-accent/10 text-accent-glow"
                          : "border-white/10 text-muted group-hover/faq:border-white/25 group-hover/faq:text-fg",
                      )}
                    >
                      <Plus
                        size={16}
                        className={cn(
                          "transition-transform duration-300",
                          isOpen && "rotate-45",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <motion.div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-10 leading-relaxed text-muted">{f.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
