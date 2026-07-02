import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* dramatic glow treatment */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="bloom"
          style={{
            top: "50%",
            left: "50%",
            width: "70rem",
            height: "40rem",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(58,26,255,0.35), transparent 62%)",
          }}
        />
        <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-4xl font-semibold leading-[1.08] text-fg sm:text-5xl md:text-6xl">
          Your store is ready for the world.{" "}
          <span className="text-gradient">Are you?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted">
          Book your free strategy session today and let&apos;s build something
          great together. No pressure. No obligation. Just an honest conversation
          about your business and what&apos;s possible.
        </p>
        <div className="mt-9 flex justify-center">
          <Button href="#contact" size="lg">
            Book My Free Strategy Session
            <ArrowRight size={18} />
          </Button>
        </div>
        <p className="mt-5 text-sm text-muted-2">
          Free consultation. No commitment. 100% tailored to your business.
        </p>
      </Reveal>
    </section>
  );
}
