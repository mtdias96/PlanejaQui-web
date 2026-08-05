import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { getBankColor, type BankId, type Tone } from "@/lib/tokens";

const iconTileVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-icon font-semibold transition-colors",
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-8.5 text-sm",
        lg: "size-10 text-base",
      },
      tone: {
        free: "bg-free/12 text-free",
        intention: "bg-intention/12 text-intention-text",
        warning: "bg-warning/12 text-warning",
        danger: "bg-danger/12 text-danger",
        neutral: "bg-track-600 text-content-secondary",
      } satisfies Record<Tone, string>,
    },
    defaultVariants: {
      size: "md",
      tone: "neutral",
    },
  }
);

const solidToneClasses = {
  free: "bg-free text-free-ink",
  intention: "bg-intention text-intention-ink",
  warning: "bg-warning text-warning-ink",
  danger: "bg-danger text-danger-ink",
  neutral: "bg-track-500 text-content-primary",
} satisfies Record<Tone, string>;

export interface IconTileProps
  extends React.ComponentPropsWithoutRef<"div">,
    VariantProps<typeof iconTileVariants> {
  bank?: BankId;
  bankColor?: string;
  /** `tint` (padrão) pinta o fundo a 12%; `solid` preenche com a cor cheia. */
  fill?: "tint" | "solid";
}

export function IconTile({
  size = "md",
  tone = "neutral",
  fill = "tint",
  bank,
  bankColor,
  className,
  style,
  children,
  ...props
}: IconTileProps) {
  const resolvedColor = getBankColor(bank, bankColor);
  const dynamicStyle = resolvedColor
    ? ({ ...style, "--tile": resolvedColor } as React.CSSProperties)
    : style;
  const isSolid = fill === "solid";

  const appearance = resolvedColor
    ? isSolid
      ? "bg-(--tile) text-foreground"
      : "bg-(--tile)/12 text-(--tile)"
    : isSolid
      ? solidToneClasses[tone ?? "neutral"]
      : undefined;

  return (
    <div
      data-slot="icon-tile"
      data-tone={tone}
      data-bank={bank}
      data-fill={fill}
      style={dynamicStyle}
      className={cn(
        iconTileVariants({ size, tone: resolvedColor ? undefined : tone }),
        appearance,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { iconTileVariants };
