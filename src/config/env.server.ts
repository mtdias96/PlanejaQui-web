import "server-only";
import { env } from "./env";

const parsedTimeout = Number(process.env.API_TIMEOUT_MS ?? 10000);
const timeoutMs =
  Number.isNaN(parsedTimeout) || parsedTimeout <= 0 ? 10000 : parsedTimeout;

const rawServerApiUrl = process.env.API_URL;
let apiUrl = env.apiUrl;

if (rawServerApiUrl) {
  try {
    new URL(rawServerApiUrl);
    apiUrl = rawServerApiUrl;
  } catch {
    throw new Error(
      `Variável de ambiente API_URL ("${rawServerApiUrl}") não é uma URL válida.`
    );
  }
}

export const envServer = {
  apiUrl,
  timeoutMs,
} as const;
