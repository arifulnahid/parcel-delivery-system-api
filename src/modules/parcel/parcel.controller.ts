import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { Parcel } from "./parcel.model";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from "http-status-codes";
import AppErro from "../../config/appError";
import { ILog, Status } from "./parcel.interface";

const createParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parcel = await Parcel.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Parcel Created Successfully",
      data: parcel,
      meta: {},
    });
  }
);

const getAllParcels = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parcel = await Parcel.find();

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Parcel Retrived Successfully",
      data: parcel,
      meta: {},
    });
  }
);

const getParcelById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parcelId = req.params.parcelId;
    const parcel = await Parcel.findById(parcelId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Parcel Retrived Successfully",
      data: parcel,
      meta: {},
    });
  }
);

const updateParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parcelId = req.params.parcelId;
    const parcel = await Parcel.findByIdAndUpdate(parcelId, req.body, {
      new: true,
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Parcel Updated Successfully",
      data: parcel,
      meta: {},
    });
  }
);

const updateStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parcelId = req.params.parcelId;
    const parcel = await Parcel.findById(parcelId);

    if (!parcel)
      throw new AppErro(httpStatusCode.NO_CONTENT, "User does not exits");

    const log: ILog = { ...req.body, createdAt: new Date() };
    parcel.status = log.status;
    parcel.isRejected = log.status == Status.Rejected;
    parcel.isDelivered = log.status == Status.Delivered;
    parcel.isFaild = log.status == Status.Failed;
    parcel.logs.push(log);
    await parcel.save();

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Parcel Status Updated Successfully",
      data: parcel,
      meta: {},
    });
  }
);

const deleteParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parcelId = req.params.parcelId;
    const parcel = await Parcel.findByIdAndDelete(parcelId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Parcel deleted Successfully",
      data: parcel,
      meta: {},
    });
  }
);

const trackParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const trakingId = req.params.trakingId;
    const parcel = await Parcel.findOne({ trakingId });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Tracked Parcel",
      data: parcel,
      meta: {},
    });
  }
);

const getParcelsBySender = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const parcels = await Parcel.find({ senderId: userId });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Retrived all your parcel",
      data: parcels,
      meta: {},
    });
  }
);

const getParcelsByReceiver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const parcels = await Parcel.find({ receiverId: userId });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Retrived all your parcel",
      data: parcels,
      meta: {},
    });
  }
);

const getParcelsByAgent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const agentId = req.params.agentId;
    const parcels = await Parcel.find({ agent: agentId });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Retrived all your parcel",
      data: parcels,
      meta: {},
    });
  }
);

const getParcelsByRider = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const riderId = req.params.riderId;
    const parcels = await Parcel.find({ rider: riderId });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "Retrived all your parcel",
      data: parcels,
      meta: {},
    });
  }
);

export const ParcelControllers = {
  createParcel,
  getAllParcels,
  getParcelById,
  updateParcel,
  updateStatus,
  deleteParcel,
  trackParcel,
  getParcelsBySender,
  getParcelsByReceiver,
  getParcelsByAgent,
  getParcelsByRider,
};
