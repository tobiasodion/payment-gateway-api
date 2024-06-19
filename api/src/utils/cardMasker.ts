import { CreditCard } from "../models/payments";

export const maskCard = (creditCard: CreditCard): CreditCard => {
  return {
    ...creditCard,
    cardNumber: `**** **** **** ${creditCard.cardNumber.slice(-4)}`,
    cvv: "****",
  };
};
