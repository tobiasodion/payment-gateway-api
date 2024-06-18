import { NextFunction, Request, Response } from "express";
import { getHello } from "../service/helloService";
import logger from "../../../utils/logger";

export const getHelloHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.info("Hello endpoint hit");
    const greeting = getHello();
    res.send(greeting);
  } catch (error) {
    next(error);
  }
};
