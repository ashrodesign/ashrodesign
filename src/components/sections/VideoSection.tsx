"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { video } from "@/lib/assets";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(video.src);

  return (
    <section className="relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="See it in action"
          title={
            <>
              Marketing that looks as good as your{" "}
              <span className="text-gradient">products</span>
            </>
          }
          subtitle="A quick look at the kind of work we create for Bahamian brands."
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="relative">
            {/* soft colored bloom so the screen appears to emit light */}
            <div
              aria-hidden
              className="bloom"
              style={{
                inset: "-10% -6%",
                background:
                  "radial-gradient(60% 60% at 50% 50%, rgba(58,26,255,0.38), transparent 70%)",
                filter: "blur(75px)",
              }}
            />

            <div className="hairline relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-surface">
              {hasVideo && playing ? (
                // TODO: replace with Ashro promo video (set video.src in src/lib/assets.ts)
                <video
                  className="h-full w-full object-cover"
                  src={video.src}
                  poster={video.poster}
                  controls
                  autoPlay
                  playsInline
                />
              ) : (
                <>
                  <Image
                    src={video.poster}
                    alt="Ashro Design promotional reel"
                    fill
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/20 to-transparent" />

                  <button
                    type="button"
                    onClick={() => hasVideo && setPlaying(true)}
                    className="group absolute inset-0 flex items-center justify-center"
                    aria-label={hasVideo ? "Play promo video" : "Promo video coming soon"}
                  >
                    <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                      <span className="absolute inset-0 rounded-full bg-accent/30 blur-xl" />
                      <Play size={26} className="relative ml-1 text-white" fill="white" />
                    </span>
                  </button>

                  {!hasVideo && (
                    <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs text-white/70 backdrop-blur">
                      Promo video coming soon
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
