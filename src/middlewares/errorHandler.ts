import { NextFunction, Request, Response } from "express";
import httpStatusCode from "http-status-codes";
import { envVars } from "../config/env";
import { TErrorSources } from "../interfaces/error.types";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (envVars.NODE_ENV == "development") console.log(err);

  let errorSources: TErrorSources[] = [];
  let message: string = "Error Happend";
  let statusCode: number = 500;

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
