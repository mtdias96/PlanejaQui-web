import { cookies } from "next/headers";
import type { User } from "./types";

export async function getSessionUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("planejaqui_token")?.value;
  if (!token) return null;

  return {
    id: "user-1",
    name: "Usuário PlanejaQui",
    email: "usuario@planejaqui.app",
  };
}
