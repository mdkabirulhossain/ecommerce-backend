import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';
import ApiError from '../utils/ApiError.js';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;

  if (env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  res.status(statusCode || 500).send({
    success: false,
    statusCode: statusCode || 500,
    message,
  });
};
