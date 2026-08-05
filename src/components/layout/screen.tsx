import * as React from "react";
import { cn } from "@/lib/utils";

export function Screen({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="layout-screen"
      className={cn("w-full max-w-5xl mx-auto px-5.5 md:px-8 py-6", className)}
      {...props}
    />
  );
}
