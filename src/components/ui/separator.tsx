"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

export interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive.Root> {
  /** Texto centralizado na linha (ex.: "ou"). Só vale na orientação horizontal. */
  label?: React.ReactNode
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  label,
  ...props
}: SeparatorProps) {
  if (label && orientation === "horizontal") {
    return (
      <div
        data-slot="separator"
        role="separator"
        aria-orientation="horizontal"
        className={cn("flex w-full items-center gap-3", className)}
      >
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
        <span className="text-overline uppercase text-content-faint">
          {label}
        </span>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>
    )
  }

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }
