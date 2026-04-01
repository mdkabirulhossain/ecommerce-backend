import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

/**
 * @openapi
 * /test:
 *   get:
 *     summary: Test endpoint to verify server is working
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/test', (req: Request, res: Response) => {
  res.send({ message: 'test is working' });
});

/**
 * @openapi
 * /check:
 *   get:
 *     summary: Check endpoint to verify server is working
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/check', (req: Request, res: Response) => {
  res.send({ message: 'check is working' });
});

export default router;
