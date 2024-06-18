import { payments } from "../data/payments";
import { Payment } from "../models/payments";
import logger from "../utils/logger";

export const createPayments = async (payment: Payment): Promise<Payment> => {
  try {
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
  id: Number,
): Promise<Payment | undefined> => {
  try {
    //Get payments from DB
    return payments.find((payment) => payment.id === id);
  } catch (error) {
    logger.error("Error in getPayments", error);
    throw error;
  }
};
