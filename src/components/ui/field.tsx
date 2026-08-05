import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

/** Agrupa rótulo + controle + mensagem de erro de um campo de formulário. */
function Field({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      data-slot="field"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn("text-overline uppercase text-content-soft", className)}
      {...props}
    />
  )
}

function FieldMessage({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      data-slot="field-message"
      role="alert"
      className={cn("text-note text-danger", className)}
      {...props}
    />
  )
}

function FieldHint({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"p">) {
  return (
    <p
      data-slot="field-hint"
      className={cn("text-note text-content-faint", className)}
      {...props}
    />
  )
}

export { Field, FieldHint, FieldLabel, FieldMessage }
