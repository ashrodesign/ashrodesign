import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section className="relative px-6 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Testimonials"
          title={
            <>
              Loved by local <span className="text-gradient">businesses</span>
            </>
          }
          subtitle="Real results for real Bahamian stores — from first online sale to shipping worldwide."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.quote} delay={i * 0.08} className="h-full">
              <SpotlightCard className="flex h-full flex-col p-7">
                <div className="flex items-center justify-between">
                  <Quote size={28} className="text-accent-glow" />
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star
                        key={s}
                        size={15}
                        className="fill-accent-glow text-accent-glow"
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-5 flex-1 text-lg leading-relaxed text-fg/90">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2D00D6,#5B3BFF)] text-sm font-semibold text-white">
                    {initialsOf(t.name)}
                  </span>
                  <div>
                    <p className="font-medium text-fg">{t.name}</p>
                    <p className="text-sm text-muted">{t.location}</p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
