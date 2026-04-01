import express, { Router } from 'express';
import authController from '../controllers/auth.controller.js';

const router: Router = express.Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email: {type: string}
 *               password: {type: string}
 *               name: {type: string}
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/register', authController.register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: {type: string}
 *               password: {type: string}
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/login', authController.login);

export default router;
