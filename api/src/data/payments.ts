import { Payment } from "../models/payments";

export const payments: Payment[] = [
  {
    id: 1,
    amount: 100,
    currency: "USD",
    status: "paid",
    merchantId: "1",
    creditCard: {
      cardNumber: "1234-5678-1234-5678",
      cardHolder: "John Doe",
      expirationDate: "10/2022",
      cvv: "123",
    },
    reference: "ref-123",
  },
  {
    id: 2,
    amount: 200,
    currency: "USD",
    status: "paid",
    merchantId: "1",
    creditCard: {
      cardNumber: "1234-5678-1234-5678",
      cardHolder: "John Doe",
      expirationDate: "10/2022",
      cvv: "123",
    },
    reference: "ref-456",
  },
  {
    id: 3,
    amount: 300,
    currency: "USD",
    status: "paid",
    merchantId: "2",
    creditCard: {
      cardNumber: "1234-5678-1234-5678",
      cardHolder: "John Doe",
      expirationDate: "10/2022",
      cvv: "123",
    },
    reference: "ref-789",
  },
];
