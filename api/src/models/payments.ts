import { PaymentStatus } from "./enums";

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  merchantId: string;
  creditCard: CreditCard;
  reference: string;
}

export interface CreditCard {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
}
