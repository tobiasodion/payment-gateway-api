import { randomUUID } from "crypto";
import { PaymentStatus } from "../models/enums";
import { Payment } from "../models/payments";

export const payments: Payment[] = [
  {
    id: randomUUID(),
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
    id: randomUUID(),
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
    id: randomUUID(),
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
    id: randomUUID(),
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
