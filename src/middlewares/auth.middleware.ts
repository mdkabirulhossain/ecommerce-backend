import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError.js';
import { verifyAccessToken } from '../utils/jwt.js';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(401, 'Please authenticate');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    next(new ApiError(401, 'Please authenticate'));
  }
};
