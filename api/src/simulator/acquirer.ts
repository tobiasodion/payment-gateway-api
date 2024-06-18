import { Merchant } from "../models/merchants";
import { Payment } from "../models/payments";

enum ProcessingError {
  INSUFFICIENT_FUNDS = "insufficient_funds",
  CARD_BLOCKED = "card_blocked",
  CARD_EXPIRED = "card_expired",
  CARD_NOT_SUPPORTED = "card_not_supported",
  CARD_DECLINED = "card_declined",
  PAYMENT_GATEWAY_ERROR = "payment_gateway_error",
}

enum ProcessingStatus {
  SUCCESSFUL = "successful",
  UNSUCCESSFUL = "unsuccessful",
}

export interface ProcessPaymentResponse {
  reference: string;
  status: ProcessingStatus;
  processingErrors?: ProcessingError;
}

export const processPayment = async (
  merchant: Merchant,
  paymentDetails: Payment,
): Promise<ProcessPaymentResponse> => {
  return {
    reference: paymentDetails.id,
    status: ProcessingStatus.SUCCESSFUL,
  };
};
