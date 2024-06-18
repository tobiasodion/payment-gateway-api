export interface Payment {
  id: number;
  amount: number;
  currency: string;
  status: string;
  merchantId: string;
  creditCard: {
    cardNumber: string;
    cardHolder: string;
    expirationDate: string;
    cvv: string;
  };
  reference: string;
}
