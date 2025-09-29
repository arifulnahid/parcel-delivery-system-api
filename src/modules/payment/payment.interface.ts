import { Types } from "mongoose";

export enum PaymentType {
  "CashOnDelivery" = "CASH_ON_DELIVERY",
  "Mfs" = "MFS",
  "Bkash" = "BKASH",
  "Nagad" = "Nagad",
  "SSLCommerz" = "SSLCOMMARZ",
}

export interface IPayment {
  parcelId: Types.ObjectId;
  fees: number;
  paidAmount: number;
  isPaid: boolean;
  paymentType: PaymentType;
}
