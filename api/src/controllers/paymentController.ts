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
import {
  AcquirerMode,
  ProcessPaymentResponse,
  ProcessingStatus,
  processPayment,
} from "../simulator/acquirer";
import {
  InternalServerError,
  InvalidMerchantError,
  NotFoundError,
} from "../exceptions";
import { maskCard } from "../utils/cardMasker";

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
      logger.error(`Payment with id: ${id} not found`);
      next(new NotFoundError("Payment not found"));
      return;
    }

    const paymentWithMaskedCard = {
      ...payment,
      creditCard: maskCard(payment.creditCard),
    };
    res.status(200).send(paymentWithMaskedCard);
  } catch (error) {
    logger.error("Error in getPaymentById", error);
    next(new InternalServerError("Something went wrong!"));
  }
};

export const postPaymentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.info("postPayment endpoint hit");
  const acquirerMode = req.get("x-Acquirer-Mode") as string;
  logger.info(
    `Acquirer mode: ${acquirerMode === "failure" ? "failure" : "success"}`,
  );
  try {
    //Validate payment details - (merchant id)
    const merchant = await getMerchantById(req.body.merchantId);
    if (!merchant) {
      next(new InvalidMerchantError("Invalid merchant Id"));
      return;
    }

    //Create a payment in DB with pending status
    const payment: Payment = {
      id: randomUUID(),
      status: PaymentStatus.PENDING,
      ...req.body,
    };
    const pendingPayment: Payment = await createPayment(payment);

    //Send payment and merchant details to acquirer for processing
    const response: ProcessPaymentResponse = await processPayment(
      merchant,
      pendingPayment,
      acquirerMode === "failure" ? AcquirerMode.FAILURE : AcquirerMode.SUCCESS,
    );
    // if accepted:
    //Send accepted response to merchant via webhook

    //Update payment status in DB when response is received(via webhook)
    const updatedPayment: Payment = await updatePaymentStatus(
      response.reference,
      response.status === ProcessingStatus.SUCCESSFUL
        ? PaymentStatus.AUTHORIZED
        : PaymentStatus.DECLINED,
    );

    res.send(updatedPayment);
  } catch (error) {
    logger.error("Error in postPayment", error);
    next(new InternalServerError("Something went wrong!"));
  }
};
