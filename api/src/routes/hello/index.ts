import { Router } from "express";
import { getHelloHandler } from "./handlers/getHelloHandler";

const router = Router();

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Hello endpoint
 *     responses:
 *       200:
 *         description: Returns a hello message.
 */
router.get("/", getHelloHandler);

export default router;
