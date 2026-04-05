import express, { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.middleware.js';
import * as authValidation from '../validations/auth.validation.js';

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
router.post('/register', validate(authValidation.register), authController.register);

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
router.post('/login', validate(authValidation.login), authController.login);

/**
 * @openapi
 * /auth/verify-email:
 *   post:
 *     summary: Verify email with OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email: {type: string}
 *               otp: {type: string}
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

/**
 * @openapi
 * /auth/refresh-tokens:
 *   post:
 *     summary: Refresh authentication tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [refreshToken]
 *             properties:
 *               refreshToken: {type: string}
 *     responses:
 *       200:
 *         description: New tokens generated
 */
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);

export default router;
