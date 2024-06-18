import { payments } from "../data/payments";
import { PaymentStatus } from "../models/enums";
import { Payment } from "../models/payments";
import logger from "../utils/logger";

export const createPayment = async (payment: Payment): Promise<Payment> => {
  try {
    //interact with DB
    payments.push(payment);
    return payment;
  } catch (error) {
    logger.error("Error in creating Payments", error);
    throw error;
  }
};

export const getPayments = async (): Promise<Payment[]> => {
  try {
    //Get payments from DB
    return payments;
  } catch (error) {
    logger.error("Error in getPayments", error);
    throw error;
  }
};

export const getPaymentsById = async (
  id: string,
): Promise<Payment | undefined> => {
  try {
    //Get payments from DB
    return payments.find((payment) => payment.id === id);
  } catch (error) {
    logger.error("Error in getPayments", error);
    throw error;
  }
};

export const updatePaymentStatus = async (
  id: string,
  status: PaymentStatus,
) => {
  let updatedPayment: Payment;
  const paymentIndex = payments.findIndex((payment) => payment.id === id);
  if (paymentIndex === -1) {
    throw new Error("Payment not found");
  }
  updatedPayment = {
    ...payments[paymentIndex],
    status,
  };
  payments[paymentIndex] = updatedPayment;
  return updatedPayment;
};
