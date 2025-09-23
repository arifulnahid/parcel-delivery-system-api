import z from "zod";
import { IsActive, Role } from "./user.inerface";

export const createUserZodSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Name must be at least 2 characters long." })
    .max(25, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string()
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide valid email"),
  phone: z.string().regex(/^(?:\+8801\d{9}|01\d{9})$/, {
    message:
      "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
  }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." }),
  dob: z.string(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ error: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .optional(),
  phone: z
    .string({ error: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isVerified: z
    .boolean({ error: "isVerified must be true or false" })
    .optional(),
});
