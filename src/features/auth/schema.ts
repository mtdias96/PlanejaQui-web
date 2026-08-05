import type { LoginFieldErrors } from "./types";

export interface LoginInput {
  email: string;
  password: string;
  remember: boolean;
}

export const PASSWORD_MIN_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function parseLoginForm(formData: FormData): {
  data: LoginInput;
  errors: LoginFieldErrors | null;
} {
  const data: LoginInput = {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
    remember: formData.get("remember") === "on",
  };

  const errors: LoginFieldErrors = {};

  if (!data.email) {
    errors.email = "Informe seu e-mail.";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "E-mail inválido.";
  }

  if (!data.password) {
    errors.password = "Informe sua senha.";
  } else if (data.password.length < PASSWORD_MIN_LENGTH) {
    errors.password = `A senha precisa ter ao menos ${PASSWORD_MIN_LENGTH} caracteres.`;
  }

  return {
    data,
    errors: Object.keys(errors).length > 0 ? errors : null,
  };
}
