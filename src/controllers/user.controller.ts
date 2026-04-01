import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync.js';

const getUser = catchAsync(async (req: Request, res: Response) => {
  res.send({ success: true, data: { name: 'Test User' } });
});

export default {
  getUser,
};
