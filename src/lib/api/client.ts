import { envServer } from "@/config/env.server";
import { ApiError, type ApiIssue } from "./errors";

export interface ApiFetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  token?: string;
  timeoutMs?: number;
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const {
    params,
    token,
    headers,
    timeoutMs = envServer.timeoutMs,
    signal: customSignal,
    ...customConfig
  } = options;

  const url = new URL(endpoint, envServer.apiUrl);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const combinedSignal = customSignal
    ? AbortSignal.any([customSignal, timeoutSignal])
    : timeoutSignal;

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      signal: combinedSignal,
      ...customConfig,
    });
  } catch (err: unknown) {
    const isAbort =
      err instanceof Error &&
      (err.name === "AbortError" || err.name === "TimeoutError");

    if (isAbort) {
      throw new ApiError(
        504,
        `Requisição à API excedeu o tempo limite de ${timeoutMs}ms.`,
        { data: err }
      );
    }
    throw new ApiError(
      503,
      `API Backend indisponível (${envServer.apiUrl}). Verifique se o servidor backend está rodando.`,
      { data: err }
    );
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const code = typeof body?.code === "string" ? body.code : undefined;
    const issues = Array.isArray(body?.message)
      ? (body.message as ApiIssue[])
      : undefined;

    const message =
      typeof body?.message === "string"
        ? body.message
        : `Requisição falhou com status ${response.status}`;

    throw new ApiError(response.status, message, { code, issues, data: body });
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}
