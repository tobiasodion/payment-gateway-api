import { PaymentStatus } from "../models/enums";
import { Payment } from "../models/payments";

export const payments: Payment[] = [
  {
    id: "9b4f5f0a-6f1d-4f99-9d13-5b35cfad6dbf",
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
    id: "3f98fbbc-b5f1-4b7b-824b-4c6a7ddf1a0a",
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
    id: "d230cf92-ec5b-4828-8f62-5b43a65c017d",
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
    id: "cb1d81e7-8f64-42ed-a682-83e9eae0c26e",
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
