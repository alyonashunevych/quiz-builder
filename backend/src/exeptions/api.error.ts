interface ApiErrorConstructor {
  message: string;
  status: number;
  errors?: Record<string, unknown>;
}

export class ApiError extends Error {
  status: number;
  errors: Record<string, unknown>;

  constructor({ message, status, errors = {} }: ApiErrorConstructor) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static badRequest(
    message: string,
    errors?: Record<string, unknown>,
  ): ApiError {
    return new ApiError({ message, status: 400, errors });
  }

  static notFound(
    message: string = 'Not found',
    errors?: Record<string, unknown>,
  ): ApiError {
    return new ApiError({ message, status: 404, errors });
  }
}
