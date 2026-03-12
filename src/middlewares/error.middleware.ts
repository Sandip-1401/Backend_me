import { Request, Response, NextFunction } from 'express';
import { AppError } from '../common/errors/AppError';
import { AuthRequest } from './auth.middleware';

export const errorMiddleware = (err: any, req: AuthRequest, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.errorCode,
    });
  }

  console.error('Unhandled Error:', err);

  return res.status(500).json({
    success: false,
    message: err.message || 'Internal server Error',
  });
};
