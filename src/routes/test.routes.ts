import express, { Router, Request, Response } from 'express';
import { auth } from '../middlewares/auth.middleware.js';

const router: Router = express.Router();

/**
 * @openapi
 * /test:
 *   get:
 *     summary: Test endpoint to verify server is working (Protected)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/test', auth, (req: Request, res: Response) => {
  res.send({ message: 'test is working', user: (req as any).user });
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
