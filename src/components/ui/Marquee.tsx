import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  /** Loop duration in seconds (larger = slower). */
  duration?: number;
  reverse?: boolean;
  /** Gap between items (any CSS length). */
  gap?: string;
  className?: string;
};

/**
 * Infinite, edge-faded marquee. Each item owns its trailing gap so the
 * -50% transform loops seamlessly. Pauses on hover; disabled under
 * prefers-reduced-motion (see globals.css). GPU transforms only.
 */
export function Marquee<T>({
  items,
  renderItem,
  duration = 42,
  reverse = false,
  gap = "1.5rem",
  className,
}: MarqueeProps<T>) {
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "marquee-group marquee-mask relative w-full overflow-hidden",
        className,
      )}
    >
      <div
        className={cn("marquee-track", reverse && "is-reverse")}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="shrink-0"
            style={{ marginInlineEnd: gap }}
            aria-hidden={i >= items.length}
          >
            {renderItem(item, i % items.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
