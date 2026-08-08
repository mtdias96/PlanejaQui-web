const rawApiUrl = process.env.NEXT_PUBLIC_API_URL;
const rawAppUrl = process.env.NEXT_PUBLIC_APP_URL;

function validateUrl(
  urlStr: string | undefined,
  varName: string,
  defaultValue: string
): string {
  if (!urlStr) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Variável de ambiente obrigatória ${varName} não foi definida.`);
    }
    return defaultValue;
  }

  try {
    new URL(urlStr);
    return urlStr;
  } catch {
    throw new Error(`Variável de ambiente ${varName} ("${urlStr}") não é uma URL válida.`);
  }
}

export const env = {
  apiUrl: validateUrl(rawApiUrl, "NEXT_PUBLIC_API_URL", "http://localhost:3333"),
  appUrl: validateUrl(rawAppUrl, "NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
} as const;
