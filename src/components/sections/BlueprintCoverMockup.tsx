import Image from "next/image";
import { brand } from "@/lib/assets";

/**
 * CSS-only 3D ebook mockup of the actual Blueprint cover — built from real
 * brand assets/copy rather than a generated image, so the title text and
 * colors are guaranteed to match exactly.
 */
export function BlueprintCoverMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[19rem] [perspective:1400px]">
      <div
        aria-hidden
        className="bloom"
        style={{
          top: "5%",
          left: "5%",
          width: "22rem",
          height: "22rem",
          background: "radial-gradient(circle, rgba(91,59,255,0.35), transparent 65%)",
        }}
      />

      <div className="animate-book-float relative [transform-style:preserve-3d]">
        {/* stacked page edges behind the cover, simulating book thickness */}
        <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-[#0d0e18] [transform:translateZ(-12px)]" />
        <div className="absolute inset-0 translate-x-1 translate-y-1 rounded-2xl bg-[#11121b] [transform:translateZ(-6px)]" />

        {/* front cover */}
        <div className="hairline glass relative aspect-[3/4] overflow-hidden rounded-2xl bg-[linear-gradient(160deg,#12101f_0%,#0a0b0f_55%,#170f2e_100%)] p-6 shadow-[24px_32px_60px_-20px_rgba(0,0,0,0.75)]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 60% at 30% 0%, rgba(91,59,255,0.28), transparent 60%)",
            }}
          />
          <div className="relative flex h-full flex-col">
            <Image
              src={brand.logoWhite}
              alt=""
              aria-hidden
              width={110}
              height={35}
              className="h-5 w-auto shrink-0 self-start"
            />

            <span className="mt-6 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-muted">
              Free Guide
            </span>

            <h3 className="mt-4 text-xl font-semibold leading-[1.15] text-fg">
              The Bahamian Store Owner&apos;s{" "}
              <span className="text-gradient">Digital Growth Blueprint</span>
            </h3>

            <div className="mt-auto border-t border-white/10 pt-3 text-[0.62rem] uppercase tracking-[0.1em] text-muted-2">
              By Ashro Design · ashrodesign.net
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
