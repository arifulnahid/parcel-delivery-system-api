import { z } from "zod";
import { Status } from "./parcel.interface";

export const ParcelZodSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  fees: z.number(),
  size: z.object({
    height: z.string().min(1, "Height is required"),
    width: z.string().min(1, "Width is required"),
    weight: z.string().min(1, "Weight is required"),
  }),
  types: z.string().min(1, "Type is required"),
  senderId: z.string().length(24, "Sender ID must be a valid ObjectId"),
  receiverId: z.string().length(24, "Receiver ID must be a valid ObjectId"),
  agent: z.string().optional(),
  address: z.object({
    receiverAddress: z.string().min(1, "Receiver address is required"),
    returnAddress: z.string().min(1, "Return address is required"),
  }),
  logs: z
    .array(
      z.object({
        message: z.string().min(1, "Log message is required"),
        description: z.string().optional(),
        status: Object.values(Status),
      })
    )
    .default([]),
  meta: z.record(z.string(), z.any()).default({}),
});

export const parcelUpdateStausZodSchema = z.object({
  message: z.string(),
  description: z.string(),
  status: z.enum(Status),
});

export const createParcelZodSchema = ParcelZodSchema.pick({
  title: true,
  description: true,
  fees: true,
  size: true,
  types: true,
  senderId: true,
  agent: true,
  receiverId: true,
  address: true,
});

export const UpdateParcelZodSchema = createParcelZodSchema.partial();
