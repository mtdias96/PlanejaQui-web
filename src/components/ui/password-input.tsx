"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  InputGroup,
  InputGroupAction,
  InputGroupIcon,
  InputGroupInput,
  type InputGroupProps,
} from "@/components/ui/input-group"

export interface PasswordInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  /** Ícone opcional exibido à esquerda do campo. */
  icon?: React.ReactNode
  /** Classes aplicadas à moldura do campo (o `InputGroup`). */
  groupClassName?: string
  groupSize?: InputGroupProps["size"]
  showPasswordLabel?: string
  hidePasswordLabel?: string
}

function PasswordInput({
  icon,
  className,
  groupClassName,
  groupSize,
  showPasswordLabel = "Mostrar senha",
  hidePasswordLabel = "Ocultar senha",
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false)
  const actionLabel = visible ? hidePasswordLabel : showPasswordLabel

  return (
    <InputGroup size={groupSize} className={cn(groupClassName)}>
      {icon ? <InputGroupIcon>{icon}</InputGroupIcon> : null}
      <InputGroupInput
        type={visible ? "text" : "password"}
        className={className}
        {...props}
      />
      <InputGroupAction
        onClick={() => setVisible((current) => !current)}
        aria-label={actionLabel}
        aria-pressed={visible}
        title={actionLabel}
      >
        {visible ? (
          <EyeOff aria-hidden="true" />
        ) : (
          <Eye aria-hidden="true" />
        )}
      </InputGroupAction>
    </InputGroup>
  )
}

export { PasswordInput }
