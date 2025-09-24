import { Schema, model } from "mongoose";
import crypto from "crypto";
import { ILog, IParcel, Status } from "./parcel.interface";

const LogSchema = new Schema<ILog>(
  {
    message: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, enum: Object.values(Status), required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    _id: false,
  }
);

const SizeSchema: Schema = new Schema(
  {
    height: { type: String, required: true },
    width: { type: String, required: true },
    weight: { type: String, required: true },
  },
  {
    timestamps: false,
    versionKey: false,
    _id: false,
  }
);

const parcelSchema = new Schema<IParcel>(
  {
    title: { type: String, minLength: 5, required: true },
    description: { type: String, minLength: 5, required: true },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      default: null,
      required: false,
    },
    fees: { type: Number, required: true },
    size: { type: SizeSchema },
    types: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
      default: Status.Pending,
    },
    trakingId: { type: String, unique: true, default: null },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rider: { type: Schema.Types.ObjectId, ref: "User", default: null },
    agent: { type: Schema.Types.ObjectId, ref: "User", default: null },
    address: {
      type: {
        receiverAddress: { type: String, required: true },
        returnAddress: { type: String, required: true },
      },
      required: true,
      _id: false,
    },
    isDelivered: { type: Boolean, required: true, default: false },
    isRejected: { type: Boolean, required: true, default: false },
    isFaild: { type: Boolean, required: true, default: false },
    logs: { type: [LogSchema], default: [] },
    meta: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

parcelSchema.pre("save", function (next) {
  if (this.isNew && !this.trakingId) {
    const trakingId = crypto.randomBytes(6).toString("hex").toUpperCase();
    this.trakingId = trakingId;

    const initialLog: ILog = {
      message: "Parcel created.",
      description: `A new parcel has been created with tracking ID: ${trakingId}`,
      status: Status.Pending,
      createdAt: new Date(),
    };

    this.logs.push(initialLog);
  }

  next();
});

export const Parcel = model("Parcel", parcelSchema);
