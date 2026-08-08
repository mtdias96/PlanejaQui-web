export type AuthErrorCode =
  | "VALIDATION"
  | "INVALID_CREDENTIALS"
  | "UNAUTHORIZED"
  | "USER_ALREADY_EXISTS"
  | "ACCOUNT_LOCKED";

export interface ApiIssue {
  field: string;
  error: string;
}

export class ApiError extends Error {
  public readonly status: number;
  public readonly code?: AuthErrorCode | (string & {});
  public readonly issues?: ApiIssue[];
  public readonly data?: unknown;

  constructor(
    status: number,
    message: string,
    options?: {
      code?: AuthErrorCode | (string & {});
      issues?: ApiIssue[];
      data?: unknown;
    }
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = options?.code;
    this.issues = options?.issues;
    this.data = options?.data;
  }

  static isUnauthorized(error: unknown): error is ApiError {
    return error instanceof ApiError && error.status === 401;
  }

  static isForbidden(error: unknown): error is ApiError {
    return error instanceof ApiError && error.status === 403;
  }

  static isNotFound(error: unknown): error is ApiError {
    return error instanceof ApiError && error.status === 404;
  }

  static isValidation(error: unknown): error is ApiError {
    return error instanceof ApiError && error.code === "VALIDATION";
  }
}
