import { Document, Types } from "mongoose";

export enum Status {
  "Pending" = "PENDING",
  "Accepted" = "ACCEPTED",
  "Dispatched" = "DISPATCHED",
  "OnWarehouse" = "ON_WEREHOUSE",
  "Rejected" = "REJECTED",
  "OnTrasnsit" = "ON_TRANSIT",
  "RiderAssigned" = "RIDER_ASSIGNED",
  "OnDelivery" = "ON_DELIVERY",
  "Delivered" = "DELIVERED",
  "Failed" = "Failed",
  "Returned" = "RETURNED",
}

export interface ISize {
  height: string;
  width: string;
  weight: string;
}

export interface ILog {
  message: string;
  description?: string;
  status: Status;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IParcel extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  payment: Types.ObjectId;
  fees: number;
  size: ISize;
  types: string;
  trakingId: string;
  status: Status;
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  rider: Types.ObjectId;
  agent: Types.ObjectId;
  address: {
    returnAddress: string;
    receiverAddress: string;
  };
  isDelivered: boolean;
  isRejected: boolean;
  isFaild: boolean;
  logs: [ILog];
  meta: {};
}
