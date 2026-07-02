import { Check } from "lucide-react";
import { pricing, type PricingTier } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

function Tier({ tier }: { tier: PricingTier }) {
  const { popular } = tier;
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-3xl p-7 sm:p-8",
        "glass hairline",
        popular
          ? "lg:-translate-y-3 lg:scale-[1.02] shadow-[0_0_70px_-18px_rgba(91,59,255,0.65)] ring-1 ring-accent/30"
          : "transition-transform duration-500 will-change-transform hover:-translate-y-1.5",
      )}
    >
      {popular && (
        <>
          <div
            aria-hidden
            className="bloom"
            style={{
              top: "-22%",
              left: "50%",
              width: "20rem",
              height: "14rem",
              transform: "translateX(-50%)",
              background:
                "radial-gradient(circle, rgba(91,59,255,0.4), transparent 65%)",
            }}
          />
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[linear-gradient(135deg,#2D00D6,#5B3BFF)] px-4 py-1 text-xs font-semibold text-white shadow-[0_8px_24px_-8px_rgba(91,59,255,0.9)]">
            Most Popular
          </span>
        </>
      )}

      <div className="relative">
        <div className="flex items-baseline gap-2">
          <h3 className="text-xl font-semibold text-fg">{tier.name}</h3>
          {tier.subtitle && (
            <span className="text-sm text-muted-2">· {tier.subtitle}</span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">{tier.bestFor}</p>

        <div className="mt-5 flex items-end gap-1">
          <span className="text-4xl font-semibold tracking-tight text-fg">
            ${tier.price.toLocaleString()}
          </span>
          <span className="mb-1 text-sm text-muted">{tier.cadence}</span>
        </div>
        <p className="mt-2 text-sm italic text-muted">{tier.blurb}</p>

        <div className="mt-6">
          <Button
            href="#contact"
            variant={popular ? "primary" : "ghost"}
            className="w-full"
          >
            Get Started
          </Button>
        </div>

        <div className="mt-7 space-y-5">
          {tier.features.map((group) => (
            <div key={group.group}>
              <p className="text-xs font-semibold uppercase tracking-wider text-fg/70">
                {group.group}
              </p>
              <ul className="mt-2.5 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check
                      size={16}
                      className="mt-0.5 shrink-0 text-accent-glow"
                      strokeWidth={2.5}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="relative scroll-mt-24 px-6 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Simple, transparent plans that{" "}
              <span className="text-gradient">grow with you</span>
            </>
          }
          subtitle="No hidden fees. No confusing contracts. Just clear, customized plans built for where your business is right now."
        />

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className="h-full">
              <Tier tier={tier} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-2">
          Every plan is tailored during your free strategy session. Flexible
          payment arrangements available.
        </p>
      </div>
    </section>
  );
}
