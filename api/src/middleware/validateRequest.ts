import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import { RequestError } from "../models/enums";

export const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      // save request to db
      return res.status(400).send({
        errorType: RequestError.INVALID_REQUEST,
        errorMessage: result.error.errors.map((err) => err.message),
      });
    }
    // save request to db
    next();
  };
