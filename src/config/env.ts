export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333",
  isDev: process.env.NODE_ENV === "development",
  isProd: process.env.NODE_ENV === "production",
} as const;
