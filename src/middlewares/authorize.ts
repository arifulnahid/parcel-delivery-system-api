import { NextFunction, Request, Response } from "express";
import AppError from "../config/AppError";
import httpStatus from "http-status-codes";
import { Role } from "../modules/user/user.interface";

export const authorize =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.user;
    console.log(req.params);
    console.log(user);

    if (!user) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Your are not permitted to access"
      );
    } else if (!roles.includes(user.role) && user.userId != req.params.id) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Your are not permitted to access"
      );
    }

    next();
  };
