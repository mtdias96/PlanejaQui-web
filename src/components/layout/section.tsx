import * as React from "react";
import { cn } from "@/lib/utils";

export function Section({ className, ...props }: React.ComponentPropsWithoutRef<"section">) {
  return (
    <section
      data-slot="layout-section"
      className={cn("flex flex-col gap-5", className)}
      {...props}
    />
  );
}
