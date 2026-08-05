export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthSession {
  user: User;
  token: string;
}

export type LoginField = "email" | "password";

export type LoginFieldErrors = Partial<Record<LoginField, string>>;
