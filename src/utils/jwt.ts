import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, env.REFRESH_SECRET, {
    expiresIn: env.REFRESH_EXPIRES_IN as any,
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.REFRESH_SECRET);
};
