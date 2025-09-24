import { model, Schema } from "mongoose";
import { IPayment, PaymentType } from "./payment.interface";

const PaymentSchema: Schema = new Schema<IPayment>({
  parcelId: { type: Schema.Types.ObjectId, ref: "Parcel", required: true },
  fees: { type: Number, required: true },
  due: { type: Number, required: true },
  paidAmount: { type: Number, required: true, default: 0 },
  isPaid: { type: Boolean, default: false },
  paymentType: {
    type: String,
    enum: Object.values(PaymentType),
    default: PaymentType.CashOnDelivery,
  },
});

export const Payment = model<IPayment>("Payment", PaymentSchema);
