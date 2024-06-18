import { Router } from "express";
import {
  getPaymentByIdHandler,
  getPaymentsHandler,
  postPaymentHandler,
} from "../controllers/paymentController";

const router = Router();

/**
 * Gets a list of payments for a given merchant.
 * @swagger
 * /payments:
 *   get:
 *     summary: Gets a list of payments for a given merchant
 *     responses:
 *       200:
 *         description: Returns a hello message.
 */
router.get("/", getPaymentsHandler);

/**
 * Gets a payment by id.
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Gets a payment by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns a hello message.
 */
router.get("/:id", getPaymentByIdHandler);

/**
 * Posts a payment for a given merchant.
 * @swagger
 * /payments:
 *   post:
 *     summary: Posts a payment for a given merchant
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               merchantId:
 *                 type: string
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Returns a hello message.
 */
router.post("/", postPaymentHandler);

export default router;
