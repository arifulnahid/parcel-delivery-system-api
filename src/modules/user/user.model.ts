import { model, Schema } from "mongoose";
import { IsActive, IUser, Role } from "./user.inerface";
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env";

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
    toJSON: {
      transform(doc, ret, options) {
        delete (ret as any).password;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  const hash = bcrypt.hashSync(this.password, envVars.BCRYPT_SALT_ROUND);
  this.password = hash;
  next();
});

userSchema.methods.matchPassword = async function (
  inputPassword: string
): Promise<boolean> {
  return await bcrypt.compare(inputPassword, this.password);
};

export const User = model<IUser>("User", userSchema);
