import { Response } from "express";
import { BaseError } from "../exceptions";
import logger from "../utils/logger";
import { randomUUID } from "crypto";

class ErrorHandler {
  public async handleError(err: Error, res?: Response): Promise<void> {
    logger.error(err);

    if (err instanceof BaseError) {
      if (res) {
        res.status(err.httpCode).send({
          requestId: randomUUID(),
          errorType: err.name,
          errorMessage: err.message,
        });
      }
    }
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

export const errorHandler = new ErrorHandler();
