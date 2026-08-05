import { apiFetch } from "@/lib/api/client";
import type { User } from "./types";

export async function getCurrentUser(): Promise<User | null> {
  try {
    return await apiFetch<User>("/me");
  } catch {
    return null;
  }
}
