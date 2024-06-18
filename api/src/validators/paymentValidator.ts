import { z } from "zod";

export const paymentSchema = z
  .object({
    amount: z.number().gt(0, { message: "Amount should be greater than 0" }),
    currency: z.enum(["EUR", "GBP", "USD"], {
      message: "Invalid currency, should be 'EUR', 'GBP', or 'USD'",
    }),
    merchantId: z.string(),
    creditCard: z
      .object({
        cardNumber: z.string().regex(/^\d{4}-\d{4}-\d{4}-\d{4}$/, {
          message: "Invalid card number format. Should be xxxx-xxxx-xxxx-xxxx",
        }),
        cardHolder: z.string(),
        expirationDate: z.string(),
        cvv: z.string().length(3, {
          message: "CVV should be 3 digits",
        }),
      })
      .strict(),
    reference: z.string(),
  })
  .strict();
