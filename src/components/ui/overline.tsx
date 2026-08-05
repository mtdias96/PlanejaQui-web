import * as React from "react";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

export interface OverlineProps extends React.ComponentPropsWithoutRef<"span"> {
  asChild?: boolean;
}

export function Overline({
  asChild = false,
  className,
  ...props
}: OverlineProps) {
  const Comp = asChild ? Slot.Root : "span";
  return (
    <Comp
      data-slot="overline"
      className={cn("text-overline uppercase text-content-faint", className)}
      {...props}
    />
  );
}
