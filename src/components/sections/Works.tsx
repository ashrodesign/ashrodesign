import Image from "next/image";
import { works, type WorkCreative } from "@/lib/assets";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";

function WorkTile({ item }: { item: WorkCreative }) {
  return (
    <div className="hairline group relative h-64 w-[18rem] overflow-hidden rounded-2xl border border-white/10 bg-surface sm:h-72 sm:w-[22rem]">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 18rem, 22rem"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent" />
      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white/80 backdrop-blur">
        {item.category}
      </span>
      <div className="absolute inset-x-4 bottom-4">
        <p className="text-base font-semibold text-white">{item.brand}</p>
        <p className="text-sm text-white/70">{item.tagline}</p>
      </div>
    </div>
  );
}

export function Works() {
  const half = Math.ceil(works.length / 2);
  const rowA = works.slice(0, half);
  const rowB = works.slice(half);

  return (
    <section id="works" className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          align="left"
          eyebrow="Selected works"
          title={
            <>
              Creative that stops the <span className="text-gradient">scroll</span>
            </>
          }
          subtitle="A snapshot of the ad creatives, stores, and campaigns we've built for brands across The Bahamas."
        />
      </div>

      {/* full-bleed marquees with edge fade */}
      <div className="relative left-1/2 mt-14 w-screen -translate-x-1/2 space-y-5">
        <Marquee
          items={rowA}
          duration={48}
          renderItem={(item) => <WorkTile item={item} />}
        />
        <Marquee
          items={rowB}
          duration={56}
          reverse
          renderItem={(item) => <WorkTile item={item} />}
        />
      </div>
    </section>
  );
}
