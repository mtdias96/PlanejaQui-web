"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import type { Tone } from "@/lib/tokens"

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-track-600",
  {
    variants: {
      size: {
        thin: "h-1.5",
        default: "h-2",
        thick: "h-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const progressIndicatorVariants = cva(
  "h-full w-full flex-1 transition-all",
  {
    variants: {
      tone: {
        free: "bg-free",
        intention: "bg-intention",
        warning: "bg-warning",
        danger: "bg-danger",
        neutral: "bg-content-secondary",
      } satisfies Record<Tone, string>,
    },
    defaultVariants: {
      tone: "free",
    },
  }
)

export interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressIndicatorVariants> {}

function Progress({
  className,
  value,
  size = "default",
  tone = "free",
  ...props
}: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-size={size}
      className={cn(progressVariants({ size }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        data-tone={tone}
        className={cn(progressIndicatorVariants({ tone }))}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress, progressVariants, progressIndicatorVariants }
