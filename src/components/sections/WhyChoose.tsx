import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { whyCards } from "@/lib/data";
import { whyImage } from "@/lib/assets";
import { Icons } from "@/lib/icons";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyChoose() {
  return (
    <section className="relative px-6 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Why Ashro"
          title={
            <>
              Why Bahamian Businesses Choose{" "}
              <span className="text-gradient">Ashro Design</span>
            </>
          }
          subtitle="A local team that does it all — and treats your growth like our own."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {/* image tile — tall left column on large screens, full-width above the cards otherwise */}
          <Reveal className="h-full lg:col-span-1">
            <div className="hairline relative h-full min-h-[18rem] overflow-hidden rounded-3xl border border-white/10 bg-surface">
              <Image
                src={whyImage}
                alt="The Ashro Design team collaborating"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-glow">
                  Proudly Bahamian
                </p>
                <p className="mt-1.5 text-lg font-semibold text-white">
                  Built in The Bahamas, for The Bahamas.
                </p>
              </div>
            </div>
          </Reveal>

          {/* value cards — keep their styling, arranged beside the image */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {whyCards.map((card, i) => {
              const Icon = Icons[card.icon];
              return (
                <Reveal key={card.title} delay={i * 0.06} className="h-full">
                  <GlowCard className="h-full p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-accent/10 text-accent-glow">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-fg">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {card.body}
                    </p>
                  </GlowCard>
                </Reveal>
              );
            })}

            {/* conversion nudge card */}
            <Reveal delay={whyCards.length * 0.06} className="h-full">
              <a
                href="#contact"
                className="hairline group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-7 transition-transform duration-500 hover:-translate-y-1.5"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(45,0,214,0.35), rgba(91,59,255,0.18))",
                }}
              >
                <div
                  aria-hidden
                  className="bloom"
                  style={{
                    top: "-30%",
                    right: "-20%",
                    width: "20rem",
                    height: "20rem",
                    background:
                      "radial-gradient(circle, rgba(91,59,255,0.45), transparent 65%)",
                  }}
                />
                <p className="relative text-xl font-semibold leading-snug text-white">
                  Ready to grow your store online?
                </p>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-medium text-white">
                  Book a free strategy call
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
