import { success, ZodSchema } from "zod";
import { AuthRequest } from "./auth.middleware";
import { NextFunction } from "express";
import { Response } from "express";

export const validate = 
   (schema: ZodSchema) => 
   (req: AuthRequest, res: Response, next: NextFunction) => {  
      const result = schema.safeParse(req.body);
      if(!result.success){
         return res.status(400).json({
            success: false,
            message: result.error.issues[0].message
         });
      }
      
      req.body = result.data
      next();
}  