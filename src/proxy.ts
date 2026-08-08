import type { NextRequest } from "next/server";
import { resolveAuthResponse } from "@/features/auth/session/guard";

/**
 * Convenção do Next: este arquivo precisa viver na raiz de `src/`, no mesmo
 * nível de `app/` — é onde o framework procura. Só um por projeto.
 * A lógica mora em `features/auth/guard.ts`; aqui fica apenas o acoplamento.
 */
export async function proxy(request: NextRequest) {
  return resolveAuthResponse(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)",
  ],
};
