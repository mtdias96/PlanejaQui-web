import { env } from "@/config/env";
import { ApiError } from "./errors";

export interface ApiFetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

export async function apiFetch<T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { params, headers, ...customConfig } = options;

  const url = new URL(endpoint, env.apiUrl);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
  };

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...customConfig,
    });
  } catch (err) {
    throw new ApiError(
      503,
      `API Backend indisponível (${env.apiUrl}). Verifique se o servidor backend está rodando.`,
      err
    );
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message =
      errorData?.message || `Requisição falhou com status ${response.status}`;
    throw new ApiError(response.status, message, errorData);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}
