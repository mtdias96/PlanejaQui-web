import * as React from "react"
import { TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"

export interface LogoProps extends React.ComponentPropsWithoutRef<"span"> {
  /** Oculta o texto e mantém apenas o símbolo (útil em barras estreitas). */
  symbolOnly?: boolean
}

export function Logo({ className, symbolOnly = false, ...props }: LogoProps) {
  return (
    <span
      data-slot="logo"
      className={cn("inline-flex items-center gap-2.5", className)}
      {...props}
    >
      <TrendingUp
        aria-hidden="true"
        strokeWidth={2.75}
        className="size-6 shrink-0 text-free"
      />
      <span
        className={cn(
          "text-h3 font-extrabold text-foreground",
          symbolOnly && "sr-only"
        )}
      >
        Planeja<span className="text-free">Qui</span>
      </span>
    </span>
  )
}
