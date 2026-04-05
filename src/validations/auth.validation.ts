import { z } from 'zod';

const register = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
  }),
};

const login = {
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
};

const verifyEmail = {
  body: z.object({
    email: z.string().email(),
    otp: z.string().length(6),
  }),
};

const refreshTokens = {
  body: z.object({
    refreshToken: z.string(),
  }),
};

export default {
  register,
  login,
  verifyEmail,
  refreshTokens,
};
