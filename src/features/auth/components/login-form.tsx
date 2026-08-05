"use client";

import Link from "next/link";
import {
  useId,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel, FieldMessage } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupIcon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";
import { parseLoginForm } from "@/features/auth/schema";
import type { LoginFieldErrors } from "@/features/auth/types";
import { SocialAuthButtons } from "./social-auth-buttons";

export function LoginForm() {
  const [errors, setErrors] = useState<LoginFieldErrors>({});

  const emailId = useId();
  const passwordId = useId();
  const rememberId = useId();

  function validate(form: HTMLFormElement): boolean {
    const { errors: found } = parseLoginForm(new FormData(form));
    setErrors(found ?? {});
    return found === null;
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate(event.currentTarget)) return;
  }

  function handleChange(event: ChangeEvent<HTMLFormElement>) {
    if (Object.keys(errors).length === 0) return;
    validate(event.currentTarget);
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        className="space-y-5"
        noValidate
      >
        <Field>
          <FieldLabel htmlFor={emailId}>E-mail</FieldLabel>
          <InputGroup>
            <InputGroupIcon>
              <Mail />
            </InputGroupIcon>
            <InputGroupInput
              id={emailId}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="voce@email.com"
              required
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? `${emailId}-error` : undefined}
            />
          </InputGroup>
          {errors.email ? (
            <FieldMessage id={`${emailId}-error`}>{errors.email}</FieldMessage>
          ) : null}
        </Field>

        <Field>
          <FieldLabel htmlFor={passwordId}>Senha</FieldLabel>
          <PasswordInput
            id={passwordId}
            name="password"
            autoComplete="current-password"
            placeholder="Sua senha"
            required
            icon={<Lock />}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={
              errors.password ? `${passwordId}-error` : undefined
            }
          />
          {errors.password ? (
            <FieldMessage id={`${passwordId}-error`}>
              {errors.password}
            </FieldMessage>
          ) : null}
        </Field>

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div className="flex items-center gap-2.5">
            <Checkbox id={rememberId} name="remember" defaultChecked />
            <Label
              htmlFor={rememberId}
              className="text-note font-medium text-content-secondary"
            >
              Lembrar de mim
            </Label>
          </div>

          <Link
            href="/recuperar-senha"
            className="rounded-sm text-note font-medium text-content-secondary underline-offset-4 outline-none transition-colors hover:text-free hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            Esqueci a senha
          </Link>
        </div>

        <Button type="submit" variant="free" size="cta" className="w-full">
          Entrar
          <ArrowRight aria-hidden="true" />
        </Button>
      </form>

      <Separator label="ou" />

      <SocialAuthButtons />
    </div>
  );
}
