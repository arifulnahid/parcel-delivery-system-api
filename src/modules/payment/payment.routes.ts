import { Router } from "express";
import { PaymentControllers } from "./payment.controller";

const router = Router();

router.post("/make", PaymentControllers.makePayment);
router.patch("/update", PaymentControllers.updatePayment);
router.get("/:paymentId", PaymentControllers.getPaymentById);
router.get("parcel/parcelId", PaymentControllers.getPaymentByParcelId);
router.delete("/delete/:paymentId", PaymentControllers.deletePayment);

export const PaymentRouter = router;
