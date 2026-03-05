import { z } from "zod";

export const loginSchema = z.object({
   email: z.string().email(),
   passward: z.string().min(6)
});

export const registerSchema = z.object({
   name: z.string().min(2),
   email: z.string().email(),
   passward: z.string().min(6),
   phone_no: z.string().optional()
})