import { model, Schema } from "mongoose";
import { IsActive, IUser, Role } from "./user.inerface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, minLength: 3, maxLength: 30, required: true },
    email: {
      type: String,
      minLength: 5,
      maxLength: 120,
      required: true,
      unique: true,
    },
    phone: { type: String, minLength: 11, required: true, unique: true },
    password: { type: String, minLength: 4, required: true, select: false },
    dob: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.User },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);
