import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync.js';
import authService from '../services/auth.service.js';

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  res.status(201).send({
    success: true,
    statusCode: 201,
    data: user,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.status(200).send({
    success: true,
    statusCode: 200,
    data: result,
  });
});

const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const result = await authService.verifyEmail(email, otp);
  res.status(200).send({
    success: true,
    statusCode: 200,
    data: result,
  });
});

const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const result = await authService.refreshTokens(refreshToken);
  res.status(200).send({
    success: true,
    statusCode: 200,
    data: result,
  });
});

export default {
  register,
  login,
  verifyEmail,
  refreshTokens,
};
