import type { Metadata } from "next";
import Image from "next/image";
import { Sparkles, X } from "lucide-react";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/assets";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlueprintOptInForm } from "@/components/sections/BlueprintOptInForm";

const TITLE = "The Bahamian Store Owner's Digital Growth Blueprint";
const DESCRIPTION =
  "How to get your store online, reach more customers, and sell more — even if you're not techy and you're running the whole thing yourself. Free guide from Ashro Design.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "https://ashrodesign.net/free-blueprint",
    siteName: "Ashro Design",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const pillars = [
  {
    icon: "web" as const,
    title: "A Real Online Store",
    body: "Not just a social page — a website where customers browse, add to cart, and pay, 24/7.",
  },
  {
    icon: "social" as const,
    title: "Paid Ads That Work",
    body: "Facebook, Instagram & Google ads that put your products in front of the right people — locals, tourists, and the diaspora.",
  },
  {
    icon: "email" as const,
    title: "Email Marketing",
    body: "The one audience you actually own. Turn first-time buyers into repeat customers.",
  },
  {
    icon: "sms" as const,
    title: "SMS Marketing",
    body: "Short, punchy texts for drops and flash sales — opened almost instantly.",
  },
  {
    icon: "graphic" as const,
    title: "Branding & Design",
    body: "Consistent visuals that make a small store look like an established brand.",
  },
];

const costs = [
  {
    title: "Sales that quietly disappear",
    body: "Every “how much?” you don’t answer fast enough is a sale gone to someone else.",
  },
  {
    title: "You’re invisible on Google",
    body: "A ready-to-buy customer searches, and buys from whoever they find.",
  },
  {
    title: "You’re at the mercy of the algorithm",
    body: "You’re renting attention, not owning it.",
  },
  {
    title: "You look smaller than you are",
    body: "Inconsistent visuals read as “hobby,” not “brand.”",
  },
];

const trustBullets = ["Bahamian-owned", "One team, all 5 pillars", "Local + diaspora reach"];

export default function FreeBlueprintPage() {
  return (
    <main className="min-h-dvh">
      {/* ---- Hero ---- */}
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-16 sm:pt-20">
        <div
          aria-hidden
          className="bloom"
          style={{
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "48rem",
            height: "48rem",
            background:
              "radial-gradient(circle, rgba(58,26,255,0.22), transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <Image
            src={brand.logoWhite}
            alt="Ashro Design"
            width={130}
            height={41}
            priority
            className="mx-auto h-9 w-auto"
          />

          <span className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted backdrop-blur">
            <Sparkles size={15} className="text-accent-glow" />
            Free Guide For Bahamian Store Owners
          </span>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-fg sm:text-5xl md:text-[3.4rem]">
            {TITLE.replace("Digital Growth Blueprint", "")}
            <span className="text-gradient">Digital Growth Blueprint</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-muted">
            How to get your store online, reach more customers, and sell more —
            even if you&apos;re not techy and you&apos;re running the whole thing
            yourself.
          </p>

          <div className="mx-auto mt-9 max-w-md">
            <BlueprintOptInForm />
          </div>
        </div>
      </section>

      {/* ---- What's Inside ---- */}
      <section className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="What's Inside"
            title="The 5 Pillars of Selling More Online"
            subtitle="A clear, no-jargon framework for turning “I have a nice product” into “I have a store that consistently sells.”"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar, i) => {
              const Icon = Icons[pillar.icon];
              return (
                <Reveal key={pillar.title} delay={(i % 3) * 0.06} className="h-full">
                  <GlowCard className="h-full p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-accent/10 text-accent-glow">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-fg">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {pillar.body}
                    </p>
                  </GlowCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- The Real Cost ---- */}
      <section className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="The Real Cost"
            title="What Staying Offline Is Quietly Costing You"
            subtitle="Nobody likes thinking about what they're losing — but the cost of staying offline is real, it's just invisible."
          />

          <div className="mt-12 space-y-4">
            {costs.map((cost, i) => (
              <Reveal key={cost.title} delay={i * 0.05}>
                <div className="glass hairline flex items-start gap-4 rounded-2xl p-5">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                    <X size={15} strokeWidth={2.5} />
                  </span>
                  <div>
                    <p className="font-medium text-fg">{cost.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {cost.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={costs.length * 0.05}>
            <p className="mt-8 text-center text-muted">
              None of this means the sky is falling. It just means there&apos;s
              money on the table — and it&apos;s very fixable.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Why Ashro Design ---- */}
      <section className="relative px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            eyebrow="Why Ashro"
            title="You Don't Have To Do This By Yourself"
            subtitle={
              <>
                Building a store, running ads, writing emails, setting up SMS,
                and keeping your branding sharp is basically five part-time
                jobs. Ashro Design is a Bahamian-owned e-commerce marketing
                agency that handles all five pillars under one roof — one
                team, one strategy, no juggling vendors. Because we&apos;re
                here, we understand your market: the seasons, the culture, the
                local customer, and the diaspora opportunity most overseas
                agencies don&apos;t even know exists.
              </>
            }
          />

          <Reveal delay={0.1}>
            <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-2">
              {trustBullets.map((t, i) => (
                <li key={t} className="flex items-center gap-6">
                  {i > 0 && (
                    <span aria-hidden className="hidden h-1 w-1 rounded-full bg-muted-2 sm:block" />
                  )}
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---- Second CTA ---- */}
      <section className="relative px-6 py-20 sm:py-28">
        <div
          aria-hidden
          className="bloom"
          style={{
            bottom: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "44rem",
            height: "44rem",
            background:
              "radial-gradient(circle, rgba(45,0,214,0.2), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl">
            Get Your Free Blueprint
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Join Bahamian store owners already getting our best growth
            strategies straight to their inbox.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <BlueprintOptInForm />
          </div>
        </div>
      </section>

      {/* ---- Minimal footer ---- */}
      <footer className="px-6 pb-10 pt-4">
        <p className="text-center text-xs text-muted-2">
          © {new Date().getFullYear()} Ashro Design · info@ashrodesign.net
        </p>
      </footer>
    </main>
  );
}
