import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { formatBRL } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/tokens";

const moneyVariants = cva("tabular-nums", {
  variants: {
    size: {
      hero: "text-hero",
      display: "text-display",
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      title: "text-title",
      subtitle: "text-subtitle",
      body: "text-body",
      note: "text-note",
    },
    tone: {
      free: "text-free",
      intention: "text-intention-text",
      warning: "text-warning",
      danger: "text-danger",
      neutral: "text-content-secondary",
    } satisfies Record<Tone, string>,
  },
  defaultVariants: {
    size: "body",
  },
});

export interface MoneyProps
  extends React.ComponentPropsWithoutRef<"span">,
    Omit<VariantProps<typeof moneyVariants>, "tone"> {
  cents: number;
  tone?: Tone | "auto";
  showSign?: boolean;
}

export function Money({
  cents,
  size = "body",
  tone,
  showSign = false,
  className,
  ...props
}: MoneyProps) {
  const resolvedTone: Tone | undefined =
    tone === "auto" ? (cents >= 0 ? "free" : "danger") : tone;

  const formatted = formatBRL(Math.abs(cents));
  const sign = cents < 0 ? "-" : showSign && cents > 0 ? "+" : "";

  return (
    <span
      data-slot="money"
      data-tone={resolvedTone}
      className={cn(moneyVariants({ size, tone: resolvedTone }), className)}
      {...props}
    >
      {sign}
      {formatted}
    </span>
  );
}

export { moneyVariants };
