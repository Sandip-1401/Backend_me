import { Request, Response, NextFunction } from "express";

// export const asyncHandler = 
//    (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
//    (req: AuthRequest, res: Response, next: NextFunction) => {
//       Promise.resolve(fn(req, res, next)).catch(next);
// };

export const asyncHandler = 
   <T extends Request>(
      fn: (req: T, res: Response, next: NextFunction) => Promise<any>
   ) => 
      (req: T, res: Response, next: NextFunction) => {
         Promise.resolve(fn(req, res, next)).catch(next);
   }  