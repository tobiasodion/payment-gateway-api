import { z } from "zod";

// regex pattern for the xxxx-xxxx-xxxx-xxxx format
const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;

// regex pattern for the mm/yy format
const expirationDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

const validateExpirationDate = (date: string) => {
  const isValidFormat = expirationDatePattern.test(date);
  if (!isValidFormat) {
    return false;
  }
  const currentDate = new Date();

  const firstDayOfMonth = 1;
  const lastMonthOfYear = 12;
  const currentYearPrefix = currentDate.getFullYear().toString().slice(0, 2);

  const getExpirationYear = (year: number): number => {
    return Number(
      `${currentYearPrefix}${month === lastMonthOfYear ? year++ : year}`,
    );
  };

  const [month, year] = date.split("/").map(Number);
  const expirationDate = new Date(
    getExpirationYear(year),
    month,
    firstDayOfMonth,
  );

  currentDate.setDate(firstDayOfMonth);
  return expirationDate >= currentDate;
};

export const paymentSchema = z
  .object({
    amount: z.number().gt(0, { message: "Amount should be greater than 0" }),
    currency: z.enum(["EUR", "GBP", "USD"], {
      message: "Invalid currency - should be 'EUR', 'GBP', or 'USD'",
    }),
    merchantId: z.string(),
    creditCard: z
      .object({
        cardNumber: z.string().regex(cardNumberPattern, {
          message: "Invalid card number format - Should be xxxx-xxxx-xxxx-xxxx",
        }),
        cardHolder: z.string(),
        expirationDate: z
          .string()
          .regex(expirationDatePattern, {
            message:
              "Invalid expiration date format - Should be mm/yy & mm should be between 01 and 12",
          })
          .refine(validateExpirationDate, {
            message: "Expiration date should be in the future",
          }),
        cvv: z.string().length(3, {
          message: "cvv should be 3 digits",
        }),
      })
      .strict(),
    reference: z.string(),
  })
  .strict();
