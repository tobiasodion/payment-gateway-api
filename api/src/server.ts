import express, { Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import paymentsRoute from "./routes/payments";
import logger from "./utils/logger";
import { swaggerDocs } from "./utils/swagger";
import { NotFoundError } from "./exceptions";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(`/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(`/payments`, paymentsRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError("Resource not found")));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }
  errorHandler.handleError(err, res);
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
