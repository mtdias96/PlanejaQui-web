import { NextResponse, type NextRequest } from "next/server";
import { ApiError } from "@/lib/api/errors";
import { refresh } from "../data/api";
import { decodeAccessToken, isExpired } from "../model/compute";
import {
  ACCESS_TOKEN_COOKIE,
  PERSIST_SESSION_COOKIE,
  REFRESH_TOKEN_COOKIE,
  buildCookieOptions,
} from "./session";

const PUBLIC_ROUTES = ["/entrar", "/recuperar-senha"];

/** Renova antes de vencer, para reduzir a janela de rotação concorrente. */
const REFRESH_SKEW_SECONDS = 60;

/** Curto de propósito: este refresh roda no meio da navegação. */
const REFRESH_TIMEOUT_MS = 4000;

function isPublic(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

function isPrefetch(request: NextRequest): boolean {
  return (
    request.headers.get("next-router-prefetch") === "1" ||
    request.headers.get("purpose") === "prefetch" ||
    request.headers.get("x-middleware-prefetch") === "1"
  );
}

/**
 * Guard de rota + renovação de sessão, executado pelo `proxy.ts`.
 *
 * O decode das claims aqui é **otimista**: serve para decidir redirect e
 * renovação, nunca para autorizar. Quem autoriza é a API, devolvendo 401.
 */
export async function resolveAuthResponse(
  request: NextRequest
): Promise<NextResponse> {
  const publicRoute = isPublic(request.nextUrl.pathname);

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  const remember =
    request.cookies.get(PERSIST_SESSION_COOKIE)?.value === "1";

  const claims = accessToken ? decodeAccessToken(accessToken) : null;
  const hasValidAccessToken =
    claims !== null && !isExpired(claims, REFRESH_SKEW_SECONDS);

  // 1. Sessão válida.
  if (hasValidAccessToken) {
    return publicRoute
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  }

  if (refreshToken) {
    // 2. Prefetch: não rotaciona (evita corrida), mas também não redireciona —
    //    um redirect cacheado mandaria ao login quem tem sessão válida.
    if (isPrefetch(request)) {
      return NextResponse.next();
    }

    // 3. Renovação com rotação.
    try {
      const tokens = await refresh(refreshToken, REFRESH_TIMEOUT_MS);
      const options = buildCookieOptions(remember);

      // Torna o token novo visível para os Server Components deste mesmo request.
      request.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken);
      request.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken);

      const response = publicRoute
        ? NextResponse.redirect(new URL("/", request.url))
        : NextResponse.next({ request });

      // Persiste no navegador.
      response.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, options);
      response.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, options);
      if (remember) {
        response.cookies.set(PERSIST_SESSION_COOKIE, "1", options);
      }

      return response;
    } catch (err: unknown) {
      // Só desloga quando a API rejeita o token explicitamente.
      if (ApiError.isUnauthorized(err)) {
        const response = publicRoute
          ? NextResponse.next()
          : NextResponse.redirect(new URL("/entrar", request.url));

        response.cookies.delete(ACCESS_TOKEN_COOKIE);
        response.cookies.delete(REFRESH_TOKEN_COOKIE);
        response.cookies.delete(PERSIST_SESSION_COOKIE);
        return response;
      }

      // Falha transitória (timeout, 5xx, rede): preserva os cookies e segue.
      // O layout sinaliza o estado degradado via `getSessionState()`.
      return NextResponse.next();
    }
  }

  // 4. Sem sessão.
  return publicRoute
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/entrar", request.url));
}
