import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from "http-status-codes";
import AppErro from "../../config/appError";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.create(req.body);

    return sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.CREATED,
      message: "User Created Successfuly",
      data: user,
      meta: {},
    });
  }
);

const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.find();

    return sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "User Retrive Successfuly",
      data: user,
      meta: {},
    });
  }
);

const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user)
      throw new AppErro(httpStatusCode.NOT_FOUND, "Account does not found");

    return sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "User Retrive Successfuly",
      data: user,
      meta: {},
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

    if (!user)
      throw new AppErro(httpStatusCode.NOT_FOUND, "Account does not found");

    return sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.ACCEPTED,
      message: "User Updated Successfuly",
      data: user,
      meta: {},
    });
  }
);

const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);

    if (!user)
      throw new AppErro(httpStatusCode.NOT_FOUND, "Account does not found");

    return sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.ACCEPTED,
      message: "User Deleted Successfuly",
      data: user,
      meta: {},
    });
  }
);

const softDeleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true }
    );

    if (!user)
      throw new AppErro(httpStatusCode.NOT_FOUND, "Account does not found");

    return sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.ACCEPTED,
      message: "User Soft Deleted Successfuly",
      data: user,
      meta: {},
    });
  }
);

export const UserController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  softDeleteUser,
};
