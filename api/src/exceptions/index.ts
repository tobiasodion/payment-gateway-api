import { HttpStatusCode } from "../models/enums";

export class BaseError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    httpCode: HttpStatusCode,
    description: string,
    isOperational: boolean,
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

export class InternalServerError extends BaseError {
  constructor(description: string) {
    super(
      "InternalServerError",
      HttpStatusCode.INTERNAL_SERVER,
      description,
      true,
    );
  }
}

export class BadRequestError extends BaseError {
  constructor(description: string) {
    super("BadRequestError", HttpStatusCode.BAD_REQUEST, description, true);
  }
}

export class NotFoundError extends BaseError {
  constructor(description: string) {
    super("NotFoundError", HttpStatusCode.NOT_FOUND, description, true);
  }
}

export class InvalidMerchantError extends BaseError {
  constructor(description: string) {
    super(
      "InvalidMerchantError",
      HttpStatusCode.BAD_REQUEST,
      description,
      true,
    );
  }
}
