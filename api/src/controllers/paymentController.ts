import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import {
  createPayment,
  getPaymentsById,
  updatePaymentStatus,
} from "../service/paymentsService";
import { Payment } from "../models/payments";
import { PaymentStatus } from "../models/enums";
import { randomUUID } from "crypto";
import { getMerchantById } from "../service/merchantService";
import { ProcessPaymentResponse, processPayment } from "../simulator/acquirer";

export const getPaymentByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info("getPaymentById enpoint hit");
  try {
    const id = req.params.id;
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
    //Validate payment details - (merchant id)
    const merchant = await getMerchantById(req.body.merchantId);

    //Create a payment in DB with pending status
    const payment: Payment = {
      id: randomUUID(),
      status: PaymentStatus.PENDING,
      ...req.body,
    };
    const newPayment: Payment = await createPayment(payment);

    //Send payment and merchant details to acquirer for processing
    const response: ProcessPaymentResponse = await processPayment(
      merchant,
      newPayment,
    );
    // if accepted:
    //Send accepted response to merchant via webhook

    //Update payment status in DB when response is received(via webhook)
    const updatedPayment: Payment = await updatePaymentStatus(
      response.reference,
      response.status === "successful"
        ? PaymentStatus.APPROVED
        : PaymentStatus.DECLINED,
    );

    res.send(updatedPayment);
  } catch (error) {
    next(error);
  }
};
