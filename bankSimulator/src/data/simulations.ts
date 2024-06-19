export const apis = [
  { id: 1, name: "GetPaymentById" },
  { id: 2, name: "PostPayment" },
];

export const getPaymentSimulation = {
  id: "1",
  name: "GetPaymentById",
  description:
    "Retrieve details of a previously made payment using the payment Id",
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
      description: "Payment found",
      body: {
        id: "d446e2b3-0977-4f1c-9d2f-5a1d6c781f63",
        amount: 100,
        currency: "USD",
        status: "AUTHORIZED",
        merchantId: "1",
        creditCard: {
          cardNumber: "1234-5678-1234-5678",
          cardHolder: "John Doe",
          expirationDate: "10/22",
          cvv: "123",
        },
        reference: "ref-123",
      },
    },
    {
      status: 404,
      description: "Payment not found",
      body: {
        requestId: "1395ce51-5f62-456c-b5c8-36840a4e2989",
        errorType: "NotFoundError",
        errorMessage: "Payment not found",
      },
    },
  ],
};
