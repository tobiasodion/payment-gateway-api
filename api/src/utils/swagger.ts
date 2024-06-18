import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Payment Gateway API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*/index.ts"],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
