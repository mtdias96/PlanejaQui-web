import type { User } from "./types";

export interface AccessTokenClaims {
  sub?: string;
  email?: string;
  name?: string;
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

function base64UrlDecode(str: string): string {
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "="
  );

  if (typeof atob === "function") {
    const raw = atob(padded);
    return decodeURIComponent(
      Array.from(raw)
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  }

  return Buffer.from(padded, "base64").toString("utf-8");
}

export function decodeAccessToken(token: string): AccessTokenClaims | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payloadPart = parts[1];
    if (!payloadPart) return null;

    const jsonPayload = base64UrlDecode(payloadPart);
    return JSON.parse(jsonPayload) as AccessTokenClaims;
  } catch {
    return null;
  }
}

export function isExpired(claims: AccessTokenClaims, skewSeconds = 60): boolean {
  if (!claims.exp) return true;
  return claims.exp * 1000 <= Date.now() + skewSeconds * 1000;
}

export function userFromClaims(claims: AccessTokenClaims | null): User | null {
  if (!claims || !claims.sub) return null;

  let name = claims.name;
  if (!name && claims.email) {
    name = claims.email.split("@")[0];
  }

  return {
    id: claims.sub,
    name,
    email: claims.email,
  };
}
