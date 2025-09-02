import z from "zod";
import { Status } from "./parcel.interface";

export const UserInfoSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9]\d{1,11}$/, "Invalid phone number format"),
  email: z.string(),
  address: z
    .string()
    .min(1, "Address is required")
    .max(500, "Address too long"),
});

export const LogEntrySchema = z.object({
  message: z.string(),
  description: z.string().optional(),
});

export const ParcelSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  weight: z
    .number()
    .positive("Weight must be positive")
    .min(0.1, "Weight must be at least 0.1 kg"),
  height: z
    .number()
    .positive("Height must be positive")
    .min(1, "Height must be at least 1 cm"),
  width: z
    .number()
    .positive("Width must be positive")
    .min(1, "Width must be at least 1 cm"),
  receiver: UserInfoSchema,
  sender: UserInfoSchema,
  senderId: z.string(),
  fees: z.number().nonnegative("Fees cannot be negative"),
  status: z.enum(Status).default(Status.Pending),
  logs: LogEntrySchema.optional(),
});

// Type inference
export type UserInfo = z.infer<typeof UserInfoSchema>;
export type LogEntry = z.infer<typeof LogEntrySchema>;
export type IParcel = z.infer<typeof ParcelSchema>;
// export type Status = z.infer<typeof LogEntrySchema>;

// For partial updates (PATCH requests)
export const ParcelPartialSchema = ParcelSchema.partial();

// For creation with required fields
export const ParcelCreateSchema = ParcelSchema.omit({ logs: true }).extend({
  logs: LogEntrySchema,
});

// For update with optional fields
export const ParcelUpdateSchema = ParcelSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided for update" }
);
