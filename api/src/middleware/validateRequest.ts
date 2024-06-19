import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { BadRequestError } from "../exceptions";
import logger from "../utils/logger";

export const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    // save request to db
    const result = schema.safeParse(req.body);
    if (!result.success) {
      logger.error("Invalid request", result);
      next(
        new BadRequestError(
          result.error.errors.map((err) => err.message).join(", "),
        ),
      );
    }
    next();
  };
