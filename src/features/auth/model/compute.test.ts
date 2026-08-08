import { describe, expect, it } from "vitest";
import {
  decodeAccessToken,
  isExpired,
  userFromClaims,
} from "./compute";

describe("decodeAccessToken", () => {
  it("deve decodificar um token JWT válido", () => {
    // header: {"alg":"HS256","typ":"JWT"} -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    // payload: {"sub":"user123","email":"test@example.com"} -> eyJzdWIiOiJ1c2VyMTIzIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn0
    const validToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIn0.signature";
    const result = decodeAccessToken(validToken);
    expect(result).toEqual({
      sub: "user123",
      email: "test@example.com",
    });
  });

  it("deve retornar null para token com número de partes diferente de 3", () => {
    expect(decodeAccessToken("invalid.token")).toBeNull();
    expect(decodeAccessToken("one.two.three.four")).toBeNull();
    expect(decodeAccessToken("")).toBeNull();
  });

  it("deve retornar null para payload que não é JSON", () => {
    // payload: "not-json" -> bm90LWpzb24
    const badToken = "header.bm90LWpzb24.signature";
    expect(decodeAccessToken(badToken)).toBeNull();
  });

  it("deve decodificar base64url contendo caracteres - e _", () => {
    // payload JSON com string contendo caracteres que geram - e _ no base64url
    // {"sub":"user-123_456"} -> eyJzdWIiOiJ1c2VyLTEyM180NTYifQ
    const tokenWithBase64Url =
      "header.eyJzdWIiOiJ1c2VyLTEyM180NTYifQ.signature";
    const result = decodeAccessToken(tokenWithBase64Url);
    expect(result).toEqual({ sub: "user-123_456" });
  });

  it("deve decodificar payload sem padding base64 sem lançar exceção", () => {
    // payload: {"a":"b"} sem padding -> eyJhIjoiYiJ9
    const unpaddedToken = "header.eyJhIjoiYiJ9.signature";
    const result = decodeAccessToken(unpaddedToken);
    expect(result).toEqual({ a: "b" });
  });
});

describe("isExpired", () => {
  it("deve retornar true quando exp está ausente", () => {
    expect(isExpired({})).toBe(true);
  });

  it("deve retornar true quando exp está no passado", () => {
    const pastTimestamp = Math.floor(Date.now() / 1000) - 100;
    expect(isExpired({ exp: pastTimestamp })).toBe(true);
  });

  it("deve retornar true quando exp expira dentro da janela de skew (ex: daqui a 30s com skew 60s)", () => {
    const expiresIn30s = Math.floor(Date.now() / 1000) + 30;
    expect(isExpired({ exp: expiresIn30s }, 60)).toBe(true);
  });

  it("deve retornar false quando exp expira no futuro além do skew (ex: daqui a 10min)", () => {
    const expiresIn10min = Math.floor(Date.now() / 1000) + 600;
    expect(isExpired({ exp: expiresIn10min }, 60)).toBe(false);
  });
});

describe("userFromClaims", () => {
  it("deve retornar null se claims for null ou sem sub", () => {
    expect(userFromClaims(null)).toBeNull();
    expect(userFromClaims({})).toBeNull();
    expect(userFromClaims({ email: "test@example.com" })).toBeNull();
  });

  it("deve retornar objeto User com apenas id se apenas sub estiver presente", () => {
    expect(userFromClaims({ sub: "user123" })).toEqual({
      id: "user123",
      name: undefined,
      email: undefined,
    });
  });

  it("deve derivar name da parte local do email se name não for fornecido", () => {
    expect(
      userFromClaims({ sub: "user123", email: "matheus@domain.com" })
    ).toEqual({
      id: "user123",
      name: "matheus",
      email: "matheus@domain.com",
    });
  });

  it("deve priorizar o name fornecido em claims sobre o email", () => {
    expect(
      userFromClaims({
        sub: "user123",
        name: "Matheus Dias",
        email: "matheus@domain.com",
      })
    ).toEqual({
      id: "user123",
      name: "Matheus Dias",
      email: "matheus@domain.com",
    });
  });
});
