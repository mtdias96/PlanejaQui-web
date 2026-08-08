import { describe, expect, it } from "vitest";
import { loginSchema, mapApiIssues, zodToFieldErrors } from "./schema";

describe("loginSchema", () => {
  it("deve falhar para e-mail vazio", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "123",
      remember: true,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Informe seu e-mail.");
    }
  });

  it("deve falhar para e-mail com formato inválido", () => {
    const result = loginSchema.safeParse({
      email: "email-invalido",
      password: "123",
      remember: true,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("E-mail inválido.");
    }
  });

  it("deve falhar para senha vazia", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "",
      remember: true,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Informe sua senha.");
    }
  });

  it("deve passar para dados de login válidos (caso feliz)", () => {
    const validData = {
      email: "usuario@dominio.com",
      password: "senhaSegura123",
      remember: true,
    };
    const result = loginSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });
});

describe("zodToFieldErrors", () => {
  it("deve mapear email e password simultaneamente", () => {
    const result = loginSchema.safeParse({
      email: "",
      password: "",
      remember: true,
    });
    expect(result.success).toBe(false);
    if (result.success) return;

    expect(zodToFieldErrors(result.error)).toEqual({
      email: "Informe seu e-mail.",
      password: "Informe sua senha.",
    });
  });

  it("deve retornar vazio quando a falha é de um campo fora do formulário", () => {
    // Precondição do `formError` genérico em `signInAction`: sem essa saída
    // vazia, um `remember` malformado deixaria a tela sem erro e sem navegação.
    const result = loginSchema.safeParse({
      email: "usuario@dominio.com",
      password: "senhaSegura123",
      remember: "talvez",
    });
    expect(result.success).toBe(false);
    if (result.success) return;

    expect(zodToFieldErrors(result.error)).toEqual({});
  });
});

describe("mapApiIssues", () => {
  it("deve retornar objeto vazio para undefined ou array vazio", () => {
    expect(mapApiIssues()).toEqual({});
    expect(mapApiIssues([])).toEqual({});
  });

  it("deve ignorar fields desconhecidos", () => {
    const issues = [
      { field: "unknownField", error: "Erro genérico" },
    ];
    expect(mapApiIssues(issues)).toEqual({});
  });

  it("deve mapear erros de email e password simultaneamente", () => {
    const issues = [
      { field: "email", error: "Invalid email" },
      { field: "password", error: "Invalid pass" },
    ];
    expect(mapApiIssues(issues)).toEqual({
      email: "E-mail inválido.",
      password: "Senha inválida.",
    });
  });
});
