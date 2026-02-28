import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface authRequest extends Request {
   user?: {
      user_id: string;
   };
}
export const authMiddleware = (
   req: authRequest,
   res: Response,
   next: NextFunction
) => {
   try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
         return res.status(401).json({
            status: false,
            message: "Authorization Header is missing",
         });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
         return res.status(401).json({
            status: false,
            message: "Token is missing",
         });
      }

      const secretKey = process.env.JWT_SECRET_KEY;
      if (!secretKey) {
         return res.status(500).json({
            status: false,
            message: "JWT secretKey is not configured",
         });
      }

      const decoded = jwt.verify(token, secretKey) as { user_id: string };

      req.user = { user_id: decoded.user_id };

      next();
   } catch (err) {
      return res.status(401).json({
         status: false,
         message: "Invalid or expired token",
      });
   }
};