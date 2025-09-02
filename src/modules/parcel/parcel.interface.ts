import { Types } from "mongoose";

export enum Status {
  "Pending" = "Pending",
  "Failed" = "Failed",
  "Dispatched" = "Dispatched",
  "Delivered" = "Delivered",
  "Cancel" = "Cancel",
}

type UserInfo = {
  phone: string;
  email?: string;
  address: string;
};

type Log = {
  message: string;
  description: string;
  timestamp?: Date;
};

export interface IParcel {
  title: string;
  weight: number;
  height: number;
  width: number;
  receiver: UserInfo;
  sender: UserInfo;
  senderId: Types.ObjectId;
  fees: number;
  status: Status;
  logs?: [Log];
}
