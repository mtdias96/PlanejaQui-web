"use client";

import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupIcon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { PasswordInput } from "@/components/ui/password-input";
import { signInAction } from "@/features/auth/data/actions";
import { loginSchema, type LoginInput } from "@/features/auth/model/schema";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(signInAction, {});

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: true },
  });

  // Erro do servidor → RHF. Inclusive o erro de formulário, via `root`.
  useEffect(() => {
    if (state.fieldErrors) {
      for (const field of ["email", "password"] as const) {
        const message = state.fieldErrors[field];
        if (message) {
          form.setError(field, { type: "server", message });
        }
      }
    }
    if (state.formError) {
      form.setError("root.serverError", { type: "server", message: state.formError });
    }
  }, [state, form]);

  const rootError = form.formState.errors.root?.serverError?.message;

  const onSubmit = form.handleSubmit((values) => {
    // Chamada programática da action exige transition (React 19).
    startTransition(() => formAction(values));
  });

  return (
    <div className="space-y-6">
      {rootError ? (
        <div
          role="alert"
          className="rounded-lg border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger"
        >
          {rootError}
        </div>
      ) : null}

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <InputGroup>
                  <InputGroupIcon>
                    <Mail />
                  </InputGroupIcon>
                  <FormControl>
                    <InputGroupInput
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck={false}
                      placeholder="voce@email.com"
                      {...field}
                    />
                  </FormControl>
                </InputGroup>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete="current-password"
                    placeholder="Sua senha"
                    icon={<Lock />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2.5 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-note font-medium text-content-secondary normal-case">
                    Lembrar de mim
                  </FormLabel>
                </FormItem>
              )}
            />

            <Link
              href="/recuperar-senha"
              prefetch={false}
              className="rounded-sm text-note font-medium text-content-secondary underline-offset-4 outline-none transition-colors hover:text-free hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              Esqueci a senha
            </Link>
          </div>

          <Button
            type="submit"
            variant="free"
            size="cta"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" aria-hidden="true" />
                Entrando...
              </>
            ) : (
              <>
                Entrar
                <ArrowRight aria-hidden="true" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
