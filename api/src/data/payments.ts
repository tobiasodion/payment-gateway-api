import { PaymentStatus } from "../models/enums";
import { Payment } from "../models/payments";

export const payments: Payment[] = [
  {
    id: "d446e2b3-0977-4f1c-9d2f-5a1d6c781f63",
    amount: 100,
    currency: "USD",
    status: PaymentStatus.AUTHORIZED,
    merchantId: "1",
    creditCard: {
      cardNumber: "1234-5678-1234-5678",
      cardHolder: "John Doe",
      expirationDate: "10/22",
      cvv: "123",
    },
    reference: "ref-123",
  },
  {
    id: "dbe83441-7d13-4c08-b6a2-64598e879a3e",
    amount: 200,
    currency: "USD",
    status: PaymentStatus.AUTHORIZED,
    merchantId: "1",
    creditCard: {
      cardNumber: "1234-5678-1234-5678",
      cardHolder: "John Doe",
      expirationDate: "10/22",
      cvv: "123",
    },
    reference: "ref-456",
  },
  {
    id: "dbe83441-7d13-4c08-b6a2-64598e879a3e",
    amount: 300,
    currency: "USD",
    status: PaymentStatus.DECLINED,
    merchantId: "2",
    creditCard: {
      cardNumber: "1234-5678-1234-5678",
      cardHolder: "John Doe",
      expirationDate: "10/22",
      cvv: "123",
    },
    reference: "ref-789",
  },
  {
    id: "dbe83441-7d13-4c08-b6a2-64598e879a3e",
    amount: 400,
    currency: "USD",
    status: PaymentStatus.DECLINED,
    merchantId: "2",
    creditCard: {
      cardNumber: "1234-5678-1234-5678",
      cardHolder: "John Doe",
      expirationDate: "10/22",
      cvv: "123",
    },
    reference: "ref-101",
  },
];
