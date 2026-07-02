import Image from "next/image";
import { Quote, ArrowRight } from "lucide-react";
import { founder } from "@/lib/data";
import { founderImage } from "@/lib/assets";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Founder() {
  const displayName = founder.name || founder.title;
  const displaySub = founder.name
    ? `${founder.title}, ${founder.org}`
    : founder.org;

  return (
    <section id="founder" className="relative px-6 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* portrait */}
        <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
          <div
            aria-hidden
            className="bloom"
            style={{
              inset: "-14%",
              background:
                "radial-gradient(circle at 50% 40%, rgba(58,26,255,0.38), transparent 65%)",
            }}
          />
          <div className="hairline relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface">
            <div className="relative aspect-[4/5]">
              <Image
                src={founderImage}
                alt={`${displayName}, ${displaySub}`}
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover object-center"
              />
              {/* blend the dark photo into the section */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-lg font-semibold text-white">{displayName}</p>
              <p className="text-sm text-accent-glow">{displaySub}</p>
            </div>
          </div>
        </Reveal>

        {/* quote */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-accent-glow">
              <span className="h-px w-6 bg-accent-glow/50" />
              Meet the Founder
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <Quote size={40} className="mt-6 text-accent-glow/40" aria-hidden />
          </Reveal>

          <Reveal delay={0.08}>
            <blockquote className="mt-3 text-2xl font-medium leading-snug text-fg sm:text-[1.75rem]">
              {founder.quote}
            </blockquote>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-7 flex items-center gap-4">
              <span className="h-px w-10 bg-white/25" />
              <span className="text-sm text-muted">
                <span className="font-medium text-fg">{displayName}</span>
                {" · "}
                {displaySub}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8">
              <Button href="#contact">
                Build with us
                <ArrowRight size={18} />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
