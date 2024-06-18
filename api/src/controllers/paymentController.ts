import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import {
  createPayments,
  getPayments,
  getPaymentsById,
} from "../service/paymentsService";
import { Payment } from "../models/payments";
import { payments } from "../data/payments";

export const getPaymentsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info("getPayments endpoint hit");
  try {
    const payments: Payment[] = await getPayments();
    res.status(200).send(payments);
  } catch (error) {
    next(error);
  }
};

export const getPaymentByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info("getPaymentById enpoint hit");
  try {
    const id = Number(req.params.id);
    const payment: Payment | undefined = await getPaymentsById(id);
    if (!payment) {
      res.status(404).send("Payment not found");
      return;
    }
    res.status(200).send(payment);
  } catch (error) {
    next(error);
  }
};

export const postPaymentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info("postPayment endpoint hit");
  try {
    //validate the request(zod)
    const payment: Payment = {
      id: payments.length + 1,
      amount: 1000,
      currency: "USD",
      status: "pending",
      merchantId: "123",
      creditCard: {
        cardNumber: "1234-5678-9012-3456",
        cardHolder: "John Doe",
        expirationDate: "12/21",
        cvv: "123",
      },
      reference: "123456",
    };
    //Create a payment in DB
    //Validate payment details
    //Create a payment in DB
    const newPayment: Payment = await createPayments(payment);
    //Send accepted/error response to merchant
    // if accepted:
    //Send payment details to acquirer for processing
    //Update payment status in DB when response is received(via webhook)
    //Send response to merchant via webhook
    res.send(newPayment);
  } catch (error) {
    next(error);
  }
};
