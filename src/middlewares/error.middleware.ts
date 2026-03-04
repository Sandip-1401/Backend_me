import { Request, Response, NextFunction } from "express";
import { AppError } from "../common/errors/AppError";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.errorCode
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
};