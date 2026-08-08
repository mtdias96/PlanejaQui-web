"use server";

import { redirect } from "next/navigation";
import { ApiError } from "@/lib/api/errors";
import { signIn, signOut } from "./api";
import { loginSchema, mapApiIssues, zodToFieldErrors } from "../model/schema";
import type { AuthTokens, SignInState } from "../model/types";
import {
  clearSession,
  getRefreshToken,
  persistTokens,
} from "../session/session";

export async function signInAction(
  _prev: SignInState,
  input: unknown
): Promise<SignInState> {
  // Nunca confie no client: revalida com o MESMO schema.
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors = zodToFieldErrors(parsed.error);

    // `zodToFieldErrors` só conhece os campos que o formulário exibe. Se a
    // falha veio de outro campo (ex.: `remember` malformado), o retorno sairia
    // vazio e a tela ficaria sem erro e sem navegação — beco sem saída.
    if (Object.keys(fieldErrors).length === 0) {
      return { formError: "Não foi possível validar os dados enviados." };
    }

    return { fieldErrors };
  }
  const data = parsed.data;

  let tokens: AuthTokens;
  try {
    tokens = await signIn({ email: data.email, password: data.password });
  } catch (err: unknown) {
    if (ApiError.isValidation(err)) {
      return {
        fieldErrors: mapApiIssues(err.issues),
      };
    }

    if (err instanceof ApiError) {
      if (err.code === "INVALID_CREDENTIALS" || err.status === 401) {
        return {
          formError: "E-mail ou senha incorretos.",
        };
      }
      if (err.code === "ACCOUNT_LOCKED") {
        return {
          formError: "Sua conta está bloqueada. Entre em contato com o suporte.",
        };
      }
    }

    return {
      formError: "Ocorreu um erro ao entrar. Tente novamente em instantes.",
    };
  }

  await persistTokens(tokens, data.remember);
  redirect("/");
}

export async function signOutAction(): Promise<void> {
  const rt = await getRefreshToken();

  if (rt) {
    try {
      await signOut(rt);
    } catch {
      // Ignora erro no logout remoto se a API estiver fora do ar
    }
  }

  await clearSession();
  redirect("/entrar");
}
