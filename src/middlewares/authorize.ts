import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../interfaces/auth.types";
import AppErro from "../config/appError";
import httpStatusCode from "http-status-codes";

export const authorize = (...allowedRoles: string[]) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.userId;
      const user = req.user;
      let isAuthorized = false;

      // 1. Check if the user object exists on the request.
      if (!user)
        throw new AppErro(
          httpStatusCode.UNAUTHORIZED,
          "Unauthorized: No user provided in request."
        );

      // 2. Check for role-based authorization.
      if (allowedRoles.includes(user.role as string)) {
        isAuthorized = true;
      }

      // 3. Check for user-specific authorization if a user ID parameter is provided.
      if (!isAuthorized && userId && allowedRoles.includes("AUTH")) {
        if (user!._id!.toString() === userId) {
          isAuthorized = true;
        }
      }

      // 4. If the user is authorized, proceed. Otherwise, send a Forbidden error.
      if (isAuthorized) {
        next();
      } else {
        throw new AppErro(
          httpStatusCode.UNAUTHORIZED,
          "Forbidden: You do not have the required permissions to access this resource."
        );
      }
    } catch (error) {
      next(error);
    }
  };
};

export default authorize;
