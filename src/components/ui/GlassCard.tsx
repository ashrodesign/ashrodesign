import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
};

/** Frosted-glass surface with a thin gradient hairline border. */
export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn("glass hairline rounded-3xl", className)}>{children}</div>
  );
}
