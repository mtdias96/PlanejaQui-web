import { cache } from "react";
import { ApiError } from "@/lib/api/errors";
import { getMe } from "./api";
import { decodeAccessToken, userFromClaims } from "../model/compute";
import { userSchema } from "../model/schema";
import type { User } from "../model/types";
import { getAccessToken } from "../session/session";

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const token = await getAccessToken();
  if (!token) return null;

  let rawUser: unknown;
  try {
    rawUser = await getMe(token);
  } catch (err) {
    if (ApiError.isUnauthorized(err)) return null;
    return userFromClaims(decodeAccessToken(token));
  }

  const parsed = userSchema.safeParse(rawUser);
  if (!parsed.success) {
    console.error(
      "[getCurrentUser] Contrato da API quebrou (ZodError):",
      parsed.error
    );
    return userFromClaims(decodeAccessToken(token));
  }

  return parsed.data;
});
