import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import paymentsRoute from "./routes/payments";
import logger from "./utils/logger";
import { swaggerDocs } from "./utils/swagger";

const app = express();
const port = process.env.PORT || 3000;

app.use(`/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(`/payments`, paymentsRoute);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
