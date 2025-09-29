import z from "zod";

export const authZodSchema = z.object({
  username: z
    .string()
    .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide valid email"),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." }),
});

export const changePasswordZodSchema = z.object({
  password: z
    .string()
    .min(4, { message: "Old Password must be at least 4 characters long." }),
  newPassword: z
    .string()
    .min(4, { message: "New Password must be at least 4 characters long." }),
});
