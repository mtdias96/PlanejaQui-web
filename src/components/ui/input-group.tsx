import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

/**
 * Moldura de campo com adornos (ícone à esquerda, ação à direita).
 * O grupo assume borda, fundo, altura e anel de foco; o `<Input>` interno
 * entra como `variant="bare"` para não duplicar a moldura.
 */
const inputGroupVariants = cva(
  "flex w-full min-w-0 items-center rounded-lg border border-input bg-surface-input shadow-xs transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 has-[input:disabled]:pointer-events-none has-[input:disabled]:opacity-50 has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-[3px] has-[[aria-invalid=true]]:ring-destructive/20",
  {
    variants: {
      size: {
        sm: "h-10 gap-2 px-3",
        default: "h-13 gap-3 px-4",
        lg: "h-14 gap-3 px-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface InputGroupProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "size">,
    VariantProps<typeof inputGroupVariants> {}

function InputGroup({ className, size, ...props }: InputGroupProps) {
  return (
    <div
      data-slot="input-group"
      className={cn(inputGroupVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupIcon({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) {
  return (
    <span
      data-slot="input-group-icon"
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center text-content-soft [&_svg]:size-4.5 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return <Input variant="bare" className={className} {...props} />
}

/** Botão de ação dentro do campo (ex.: revelar senha, limpar). */
function InputGroupAction({
  className,
  type = "button",
  ...props
}: React.ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type={type}
      data-slot="input-group-action"
      className={cn(
        "-mr-1.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md text-content-soft outline-none transition-colors hover:text-content-secondary focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4.5 [&_svg]:shrink-0",
        className
      )}
      {...props}
    />
  )
}

export {
  InputGroup,
  InputGroupAction,
  InputGroupIcon,
  InputGroupInput,
  inputGroupVariants,
}
