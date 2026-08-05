import * as React from "react";
import { cn } from "@/lib/utils";

export function Stack({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="layout-stack"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}
