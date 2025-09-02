import { Response } from "express";

interface TResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: string;
}

export const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(200).json(data);
};
