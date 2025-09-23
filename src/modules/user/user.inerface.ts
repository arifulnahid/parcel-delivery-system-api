import { Document, Types } from "mongoose";

export enum Role {
  User = "USER",
  SuperAdmin = "SUPER_ADMIN",
  Admin = "ADMIN",
  Rider = "RIDER",
  Agent = "AGENT",
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  dob: string;
  password: string;
  isVerified?: boolean;
  role?: Role;
  isActive?: IsActive;
  isDeleted?: boolean;
  matchPassword: (inputPassword: string) => Promise<boolean>;
}
