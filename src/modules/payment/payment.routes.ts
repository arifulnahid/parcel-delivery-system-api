import { Router } from "express";
import { PaymentControllers } from "./payment.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  makePaymentZodSchema,
  updatePaymentZodSchema,
} from "./payment.validation";

const router = Router();

router.post(
  "/make",
  validateRequest(makePaymentZodSchema),
  PaymentControllers.makePayment
);
router.patch(
  "/update",
  validateRequest(updatePaymentZodSchema),
  PaymentControllers.updatePayment
);
router.get("/:paymentId", PaymentControllers.getPaymentById);
router.get("parcel/parcelId", PaymentControllers.getPaymentByParcelId);
router.delete("/delete/:paymentId", PaymentControllers.deletePayment);

export const PaymentRouter = router;
