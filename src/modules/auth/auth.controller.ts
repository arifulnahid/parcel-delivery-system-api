import { NextFunction, Request, Response } from "express";
import httpStatusCode from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { IUser } from "../user/user.inerface";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { setAuthCookie } from "../../utils/cookie";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, ...user } = req.user as IUser;
    const accessToken = generateToken(user, envVars.JWT_ACCESS_SECRET, "1d");
    const refreshToken = generateToken(user, envVars.JWT_ACCESS_SECRET, "1d");

    setAuthCookie(res, { accessToken, refreshToken });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.ACCEPTED,
      message: "Loggedin Successfuly",
      data: { accessToken, refreshToken, user },
      meta: {},
    });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.OK,
      message: "User Logged Out Successfully",
      data: null,
    });
  }
);

const getAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.refreshToken) {
      res.send("Refresh Token not found");
    }

    const { iat, exp, ...verifyUser } = verifyToken(
      req.cookies.refreshToken,
      envVars.JWT_REFRESH_SECRET
    );

    const accessToken = generateToken(
      verifyUser,
      envVars.JWT_ACCESS_SECRET,
      envVars.JWT_ACCESS_EXPIRES
    );

    setAuthCookie(res, { accessToken });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.ACCEPTED,
      message: "Loggedin Successfuly",
      data: { accessToken, user: verifyUser },
      meta: {},
    });
  }
);

export const AuthRoutes = { login, logout, getAccessToken };
