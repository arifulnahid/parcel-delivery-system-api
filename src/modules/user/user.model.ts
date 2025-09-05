import { model, Schema } from "mongoose";
import { IsActive, IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, require: true },
    dob: { type: String, required: true },
    isActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isVerified: Boolean,
    isDeleted: Boolean,
    role: { type: String, enum: Role, default: Role.USER },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;

  return user;
};

export const User = model<IUser>("User", userSchema);
