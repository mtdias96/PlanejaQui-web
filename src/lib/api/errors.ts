export class ApiError extends Error {
  public readonly status: number;
  public readonly data?: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }

  static isUnauthorized(error: unknown): boolean {
    return error instanceof ApiError && error.status === 401;
  }

  static isForbidden(error: unknown): boolean {
    return error instanceof ApiError && error.status === 403;
  }

  static isNotFound(error: unknown): boolean {
    return error instanceof ApiError && error.status === 404;
  }

  static isValidationError(error: unknown): boolean {
    return error instanceof ApiError && error.status === 422;
  }
}
