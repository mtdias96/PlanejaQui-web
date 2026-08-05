import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Overline } from "./overline";
import { Money } from "./money";
import type { Tone } from "@/lib/tokens";

const statTileVariants = cva(
  "flex flex-col gap-1.5 rounded-lg bg-surface-input p-4 border border-border-strong/40"
);

export interface StatTileProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof statTileVariants> {
  label: string;
  cents: number;
  tone?: Tone | "auto";
  showSign?: boolean;
}

export function StatTile({
  label,
  cents,
  tone = "neutral",
  showSign = false,
  className,
  ...props
}: StatTileProps) {
  return (
    <div
      data-slot="stat-tile"
      className={cn(statTileVariants(), className)}
      {...props}
    >
      <Overline>{label}</Overline>
      <Money cents={cents} size="h3" tone={tone} showSign={showSign} />
    </div>
  );
}

export { statTileVariants };
