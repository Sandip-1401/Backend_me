import { Request, Response, NextFunction } from 'express';

export const asyncHandler =
  <T extends Request>(fn: (req: T, res: Response, next: NextFunction) => Promise<any>) =>
  (req: T, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

//Express me ek problem hoti hai...if controller async hai and andar error aya...throw new AppError(...) to Express automatically error middleware tak nahi send karta...that's why we have to write try/catch everywhere and that made our code messy...
//asyncHandler - a Wapper -> automatically do this -> error → next(error) -> and global error middleware handle kare
