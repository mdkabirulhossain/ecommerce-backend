import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodSchema } from 'zod';
import ApiError from '../utils/ApiError.js';

const validate = (schema: { body?: ZodSchema; query?: ZodSchema; params?: ZodSchema }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.body) schema.body.parse(req.body);
      if (schema.query) schema.query.parse(req.query);
      if (schema.params) schema.params.parse(req.params);
      next();
    } catch (error: any) {
      next(new ApiError(400, error.errors?.[0]?.message || 'Validation Error'));
    }
  };
};

export default validate;
