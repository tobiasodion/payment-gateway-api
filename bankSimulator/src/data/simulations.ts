export const apis = [
  { id: 1, name: "GetPaymentById", method: "GET", endpoint: "/payments/{id}" },
  { id: 2, name: "PostPayment", method: "POST", endpoint: "/payments" },
];

export enum SimulationType {
  GET_PAYMENT_BY_ID = "GetPaymentById",
  POST_PAYMENT = "PostPayment",
}

export enum AcquirerMode {
  SUCCESS = "success",
  FAILURE = "failure",
}

export const simulationsData: {
  id: number;
  type: SimulationType;
  description: string;
  method: string;
  endpoint: string;
  test: {
    name: string;
    values: string[] | object[];
  }[];
  response: {
    status: number;
    name: string;
    description: string;
    body: Record<string, unknown>;
  }[];
}[] = [
  {
    id: 1,
    type: SimulationType.GET_PAYMENT_BY_ID,
    description:
      "Retrieve details of a previously made payment using the payment Id. The sensitive card details(card number and cvv) are masked in the response.",
    method: "GET",
    endpoint: "/payments/{id}",
    test: [
      {
        name: "Test Ids",
        values: [
          "9b4f5f0a-6f1d-4f99-9d13-5b35cfad6dbf",
          "3f98fbbc-b5f1-4b7b-824b-4c6a7ddf1a0a",
          "d230cf92-ec5b-4828-8f62-5b43a65c017d",
          "cb1d81e7-8f64-42ed-a682-83e9eae0c26e",
        ],
      },
    ],
    response: [
      {
        status: 200,
        name: "Payment found",
        description: "Payment details found for the provided Id",
        body: {
          id: "cb1d81e7-8f64-42ed-a682-83e9eae0c26e",
          amount: 400,
          currency: "USD",
          status: "declined",
          merchantId: "2",
          creditCard: {
            cardNumber: "**** **** **** 5678",
            cardHolder: "John Doe",
            expirationDate: "10/22",
            cvv: "****",
          },
          reference: "ref-101",
        },
      },
      {
        status: 404,
        name: "Payment not found",
        description: "Payment details found for the provided Id",
        body: {
          requestId: "1395ce51-5f62-456c-b5c8-36840a4e2989",
          errorType: "NotFoundError",
          errorMessage: "Payment not found",
        },
      },
    ],
  },
  {
    id: 2,
    type: SimulationType.POST_PAYMENT,
    description:
      "Create a new payment with the provided details, sends the payment to the acquirer for processing and returns the status of the payment",
    method: "POST",
    endpoint: "/payments",
    test: [
      {
        name: "Test Merchant Ids",
        values: ["01", "02", "03"],
      },
      {
        name: "Test payload",
        values: [
          {
            amount: 1000,
            currency: "USD",
            merchantId: "01",
            creditCard: {
              cardNumber: "1234-5678-9012-3457",
              cardHolder: "John Doe",
              expirationDate: "06/24",
              cvv: "123",
            },
            reference: "123456",
          },
        ],
      },
    ],
    response: [
      {
        status: 200,
        name: "Payment authorized",
        description:
          "The payment processing by the acquiring bank was successful",
        body: {
          id: "93aed40b-c648-4a4a-b7a2-ef7ba6e36d65",
          status: "authorized",
          amount: 1000,
          currency: "USD",
          merchantId: "01",
          creditCard: {
            cardNumber: "**** **** **** 3457",
            cardHolder: "John Doe",
            expirationDate: "06/24",
            cvv: "****",
          },
          reference: "123456",
        },
      },
      {
        status: 200,
        name: "Payment declined",
        description:
          "The payment processing by the acquiring bank was unsuccessful",
        body: {
          id: "d6c4a187-7ae6-4352-82b5-ab26bec8831c",
          status: "declined",
          amount: 1000,
          currency: "USD",
          merchantId: "01",
          creditCard: {
            cardNumber: "**** **** **** 3457",
            cardHolder: "John Doe",
            expirationDate: "06/24",
            cvv: "****",
          },
          reference: "123456",
        },
      },
      {
        status: 400,
        name: "Invalid merchant Id",
        description: "The merchant Id provided does not exist on the system",
        body: {
          requestId: "2a54ea2f-e1cc-4d32-9f05-6110a4632fe9",
          errorType: "InvalidMerchantError",
          errorMessage: "Invalid merchant Id",
        },
      },
      {
        status: 400,
        name: "Invalid Request",
        description:
          "Including amount less than or equal to 0, unsupported/invalid currency, invalid card number format, invalid carholder format, invalid expiration date format, expired card, invalid cvv, inalid reference format",
        body: {
          requestId: "265ae599-7db5-4945-807b-d5a2821f1ec4",
          errorType: "BadRequestError",
          errorMessage: "<Appropriate error message>",
        },
      },
    ],
  },
];
