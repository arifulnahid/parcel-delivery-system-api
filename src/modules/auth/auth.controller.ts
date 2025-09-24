import { NextFunction, Request, Response } from "express";
import httpStatusCode from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { setAuthCookie } from "../../utils/cookie";
import { AuthenticatedRequest } from "../../interfaces/auth.types";
import { User } from "../user/user.model";
import AppErro from "../../config/appError";
import { IsActive, Role } from "../user/user.inerface";
import { JwtPayload } from "jsonwebtoken";

const login = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      new AppErro(httpStatusCode.BAD_REQUEST, "Login faild!");
    }

    const accessToken = generateToken(user!, envVars.JWT_ACCESS_SECRET, "1d");
    const refreshToken = generateToken(user!, envVars.JWT_ACCESS_SECRET, "1d");
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

const changePassword = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { password, newPassword } = req.body;
    const userId = req.user?._id;

    const user = await User.findById(userId).select("+password");
    if (!user)
      throw new AppErro(httpStatusCode.BAD_REQUEST, "User does not found");

    const isPasswordMatch = await user?.matchPassword(password);
    if (!isPasswordMatch)
      throw new AppErro(httpStatusCode.FORBIDDEN, "Password Does not match");

    user.password = newPassword;
    await user.save();

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.ACCEPTED,
      message: "Password Change Successfully",
      data: user,
      meta: {},
    });
  }
);

const getAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.refreshToken) {
      res.send("Refresh Token not found");
    }

    const verifyUser: JwtPayload = verifyToken(
      req.cookies.refreshToken,
      envVars.JWT_REFRESH_SECRET
    );

    const user = await User.findById(verifyUser._id);

    if (!user)
      throw new AppErro(
        httpStatusCode.BAD_REQUEST,
        "Account does not not found"
      );
    if (user?.isDeleted)
      throw new AppErro(httpStatusCode.BAD_REQUEST, "Account has been deleted");
    if (user?.isActive != IsActive.ACTIVE)
      throw new AppErro(httpStatusCode.BAD_REQUEST, "Account is not active");

    const accessToken = generateToken(
      {
        _id: user?._id,
        email: user?.email,
        phone: user?.phone,
        role: user?.role,
      },
      envVars.JWT_ACCESS_SECRET,
      envVars.JWT_ACCESS_EXPIRES
    );

    setAuthCookie(res, { accessToken });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.ACCEPTED,
      message: "Loggedin Successfuly",
      data: { accessToken, user: user },
      meta: {},
    });
  }
);

const changeUserRole = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    const role = req.body.role;
    const userRole = req.user && req.user.role;

    if (!role || !Object.values(Role).includes(role as Role)) {
      throw new AppErro(
        httpStatusCode.FORBIDDEN,
        `Please provide a valid role`
      );
    } else if (userRole != Role.Admin || role == Role.SuperAdmin) {
      throw new AppErro(
        httpStatusCode.FORBIDDEN,
        `${role} cannot be applied on this user`
      );
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

    sendResponse(res, {
      success: true,
      statusCode: httpStatusCode.ACCEPTED,
      message: `Your Role Changed to ${role}`,
      data: user,
      meta: {},
    });
  }
);

export const AuthRoutes = {
  login,
  logout,
  changePassword,
  getAccessToken,
  changeUserRole,
};
