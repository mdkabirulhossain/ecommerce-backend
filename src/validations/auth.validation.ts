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

export default {
  register,
  login,
};
