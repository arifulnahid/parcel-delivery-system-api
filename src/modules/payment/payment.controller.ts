import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { Payment } from "./payment.model";
import { sendResponse } from "../../utils/sendResponse";

const makePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = Payment.create(req.body);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment Successfull",
      data: payment,
      meta: {},
    });
  }
);

const updatePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.paymentId;
    const payment = Payment.findByIdAndUpdate(paymentId, req.body);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment Update Successfull",
      data: payment,
      meta: {},
    });
  }
);

const getPaymentById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.paymentId;
    const payment = Payment.findById(paymentId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment Retrived Successfull",
      data: payment,
      meta: {},
    });
  }
);

const getPaymentByParcelId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parcelId = req.params.parcelId;
    const payment = Payment.findById(parcelId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment For Parcel Retrived Successfull",
      data: payment,
      meta: {},
    });
  }
);

const deletePayment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = req.params.paymentId;
    const payment = Payment.findByIdAndDelete(paymentId);

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "Payment For Parcel Retrived Successfull",
      data: payment,
      meta: {},
    });
  }
);

export const PaymentControllers = {
  makePayment,
  updatePayment,
  getPaymentById,
  getPaymentByParcelId,
  deletePayment,
};
