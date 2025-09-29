import z from "zod";
import { PaymentType } from "./payment.interface";

const paymentZodSchema = z.object({
  parcelId: z.string(),
  fees: z.number(),
  paidAmount: z.number(),
  isPaid: z.boolean().optional(),
  paymentType: z.enum(PaymentType),
});

export const makePaymentZodSchema = paymentZodSchema.clone();
export const updatePaymentZodSchema = paymentZodSchema.partial();
