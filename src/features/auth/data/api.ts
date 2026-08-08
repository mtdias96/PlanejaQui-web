import { apiFetch } from "@/lib/api/client";
import type { AuthTokens } from "../model/types";

export async function signIn(input: {
  email: string;
  password: string;
}): Promise<AuthTokens> {
  return apiFetch<AuthTokens>("/auth/signin", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function refresh(
  refreshToken: string,
  timeoutMs = 4000
): Promise<AuthTokens> {
  return apiFetch<AuthTokens>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
    timeoutMs,
  });
}

export async function signOut(refreshToken: string): Promise<void> {
  await apiFetch<void>("/auth/signout", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}

export async function getMe(token: string): Promise<unknown> {
  return apiFetch<unknown>("/auth/me", { token });
}

