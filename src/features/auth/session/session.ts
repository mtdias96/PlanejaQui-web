import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { env } from "@/config/env";
import { decodeAccessToken, isExpired } from "../model/compute";
import type { AuthTokens } from "../model/types";

export const ACCESS_TOKEN_COOKIE = "pq_at";
export const REFRESH_TOKEN_COOKIE = "pq_rt";
export const PERSIST_SESSION_COOKIE = "pq_persist";
export const REMEMBER_MAX_AGE = 60 * 60 * 24 * 30; // 30 dias

export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge?: number;
}

export function buildCookieOptions(remember: boolean): CookieOptions {
  return {
    httpOnly: true,
    secure: env.isProd,
    sameSite: "lax",
    path: "/",
    ...(remember ? { maxAge: REMEMBER_MAX_AGE } : {}),
  };
}

export async function persistTokens(
  tokens: AuthTokens,
  remember: boolean
): Promise<void> {
  const cookieStore = await cookies();
  const options = buildCookieOptions(remember);

  cookieStore.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, options);
  cookieStore.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, options);
  if (remember) {
    cookieStore.set(PERSIST_SESSION_COOKIE, "1", options);
  } else {
    cookieStore.set(PERSIST_SESSION_COOKIE, "0", options);
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
  cookieStore.delete(PERSIST_SESSION_COOKIE);
}

export async function getAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}

export async function getRefreshToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null;
}

/**
 * Saúde da sessão — não é fonte de dados do usuário. Quem responde "quem é o
 * usuário" é `queries.ts`, via `GET /auth/me`.
 */
export interface SessionState {
  /**
   * O access token venceu e o proxy ainda assim deixou passar, o que só
   * acontece quando a renovação falhou por motivo transitório. A sessão segue
   * de pé, mas requisições autenticadas podem falhar até a próxima navegação.
   */
  isDegraded: boolean;
}

export const getSessionState = cache(async (): Promise<SessionState> => {
  const [accessToken, refreshToken] = await Promise.all([
    getAccessToken(),
    getRefreshToken(),
  ]);

  if (!accessToken || !refreshToken) {
    return { isDegraded: false };
  }

  const claims = decodeAccessToken(accessToken);
  if (!claims) {
    return { isDegraded: false };
  }

  return { isDegraded: isExpired(claims, 0) };
});
