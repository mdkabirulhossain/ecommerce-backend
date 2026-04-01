import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync.js';
import authService from '../services/auth.service.js';

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  res.status(201).send({ success: true, data: user });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const tokens = await authService.login(email, password);
  res.send({ success: true, data: { tokens } });
});

export default {
  register,
  login,
};
