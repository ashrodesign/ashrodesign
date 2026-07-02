import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span
            className={cn(
              "inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.22em] text-accent-glow",
            )}
          >
            <span className="h-px w-6 bg-accent-glow/50" />
            {eyebrow}
          </span>
        </Reveal>
      ) : null}

      <Reveal delay={0.05}>
        <h2
          className={cn(
            "mt-5 text-3xl font-semibold leading-[1.08] text-fg sm:text-4xl md:text-[2.85rem]",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>

      {subtitle ? (
        <Reveal delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
