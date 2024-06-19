import { Merchant } from "../models/merchants";
import { Payment } from "../models/payments";

enum ProcessingStatus {
  SUCCESSFUL = "successful",
  UNSUCCESSFUL = "unsuccessful",
}

export enum AcquirerMode {
  SUCCESS = "success",
  FAILURE = "failure",
}

export interface ProcessPaymentResponse {
  reference: string;
  status: ProcessingStatus;
}

export const processPayment = async (
  merchant: Merchant,
  paymentDetails: Payment,
  mode: AcquirerMode,
): Promise<ProcessPaymentResponse> => {
  return {
    reference: paymentDetails.id,
    status:
      mode === AcquirerMode.SUCCESS
        ? ProcessingStatus.SUCCESSFUL
        : ProcessingStatus.UNSUCCESSFUL,
  };
};
