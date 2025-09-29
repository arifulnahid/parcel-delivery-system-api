import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";
import { AuthRoute } from "../modules/auth/auth.routes";
import { ParcelRouter } from "../modules/parcel/parcel.routes";
import { PaymentRouter } from "../modules/payment/payment.routes";

export const router = Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRoute);
router.use("/parcel", ParcelRouter);
router.use("/payment", PaymentRouter);
