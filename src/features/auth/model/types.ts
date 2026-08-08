export interface User {
  id: string;
  name?: string;
  email?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export type LoginField = "email" | "password";

export type LoginFieldErrors = Partial<Record<LoginField, string>>;

export interface SignInState {
  fieldErrors?: LoginFieldErrors;
  formError?: string;
}
