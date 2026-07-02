import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/data";
import { Icons } from "@/lib/icons";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 px-6 py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Everything your store needs to{" "}
              <span className="text-gradient">sell online</span>
            </>
          }
          subtitle="One team handling web, ads, email, SMS, and design — no juggling vendors, no gaps."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = Icons[service.icon];
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.06} className="h-full">
                <GlowCard className="h-full p-7">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-accent/10 text-accent-glow">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="text-muted-2 transition-all duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent-glow"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold leading-snug text-fg">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.body}
                  </p>
                </GlowCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
