import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { Parcel } from "./parcel.model";
import { Status } from "./parcel.interface";

const createParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parcel = await Parcel.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Parcel Created Successfull",
      data: parcel,
    });
  }
);

const getAllParcel = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parcel = await Parcel.find();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Parcel Retrive Successfull",
      data: parcel,
    });
  }
);

const getParcelById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const parcel = await Parcel.findById(id);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Parcel Retrive Successfull",
      data: parcel,
    });
  }
);

const updateParcelStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const message = req.body.message;

    console.log(req.body);
    const parcel = await Parcel.findOneAndUpdate(
      { _id: id },
      {
        $push: { logs: { message } },
      },
      { new: true, runValidators: true }
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Parcel Retrive Successfull",
      data: parcel,
    });
  }
);

const getParcelByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const senderId = req.user.userId;
  const parcel = await Parcel.find({ sender: senderId });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel Retrive Successfull",
    data: parcel,
  });
};

const getParcelByReceiver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const receiverId = req.params.id;
  const parcel = await Parcel.find({ receiver: receiverId });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Parcel Retrive Successfull",
    data: parcel,
  });
};

const cancelParcel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.percelId;
  const user = req?.user;

  const message = req.body.message || "Parcel Cancel";
  const parcel = await Parcel.findOneAndUpdate(
    {
      _id: id,
      status: Status.Pending,
    },
    { status: Status.Cancel, $push: { logs: { message } } },
    { new: true }
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.ACCEPTED,
    message: "Parcel Cancel Successfull",
    data: parcel,
  });
};

const confirmDelivery = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const user = req?.user;
    const message = req.body.message || "Delivered";
    const parcel = await Parcel.findOneAndUpdate(
      { _id: id },
      {
        status: Status.Delivered,
        $push: { logs: { message } },
      },
      { new: true, runValidators: true }
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.ACCEPTED,
      message: "Parcel Delivered Successfull",
      data: parcel,
    });
  }
);

export const ParcelControllers = {
  createParcel,
  getAllParcel,
  getParcelByUser,
  getParcelByReceiver,
  cancelParcel,
  getParcelById,
  updateParcelStatus,
  confirmDelivery,
};
