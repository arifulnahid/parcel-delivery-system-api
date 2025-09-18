import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatusCode from "http-status-codes";
import bcrypt from "bcryptjs";
import { envVars } from "../../config/env";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const hash = bcrypt.hashSync(req.body.password, envVars.BCRYPT_SALT_ROUND);
    const user = await User.create({ ...req.body, password: hash });

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

    return sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.ACCEPTED,
      message: "User Deleted Successfuly",
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
};
