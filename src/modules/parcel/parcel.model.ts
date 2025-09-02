import { model, Schema, SchemaType } from "mongoose";
import { IParcel, Status } from "./parcel.interface";
import { required } from "zod/v4/core/util.cjs";

const parcelSchema = new Schema<IParcel>(
  {
    title: { type: String, required: true },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    receiver: {
      type: {
        phone: String,
        email: String,
        address: String,
      },
      required: true,
      _id: false,
    },
    sender: {
      type: {
        phone: String,
        email: String,
        address: String,
      },
      _id: false,
      required: true,
    },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fees: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(Status),
      default: Status.Pending,
    },
    logs: [
      {
        message: String,
        description: { type: String, required: false, default: "" },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        _id: false,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

export const Parcel = model<IParcel>("Parcel", parcelSchema);
