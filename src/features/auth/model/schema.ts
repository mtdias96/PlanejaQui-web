import { z } from "zod";
import type { ApiIssue } from "@/lib/api/errors";
import type { LoginFieldErrors } from "./types";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Informe seu e-mail.")
    .pipe(z.email("E-mail inválido.")),
  password: z.string().min(1, "Informe sua senha."),
  remember: z.boolean(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const userSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.email().optional(),
});

/** Erros do zod (client ou server) → shape do formulário. */
export function zodToFieldErrors(error: z.ZodError): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (field === "email" || field === "password") {
      errors[field] ??= issue.message;
    }
  }
  return errors;
}

/** Issues do backend → shape do formulário. Mapeia por `field`, nunca por texto. */
export function mapApiIssues(issues?: ApiIssue[]): LoginFieldErrors {
  if (!issues) return {};
  const errors: LoginFieldErrors = {};
  for (const issue of issues) {
    if (issue.field === "email") errors.email = "E-mail inválido.";
    else if (issue.field === "password") errors.password = "Senha inválida.";
  }
  return errors;
}
