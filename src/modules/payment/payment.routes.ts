import { Router } from "express";
import { PaymentControllers } from "./payment.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  makePaymentZodSchema,
  updatePaymentZodSchema,
} from "./payment.validation";
import passport from "passport";
import { Role } from "../user/user.inerface";
import authorize from "../../middlewares/authorize";

const router = Router();

router.post(
  "/make",
  validateRequest(makePaymentZodSchema),
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin, Role.Agent, Role.Rider, "AUTH"),
  PaymentControllers.makePayment
);
router.patch(
  "/update",
  validateRequest(updatePaymentZodSchema),
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin, Role.Agent, Role.Rider),
  PaymentControllers.updatePayment
);
router.get(
  "/:paymentId",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin, Role.Agent, Role.Rider),
  PaymentControllers.getPaymentById
);
router.get(
  "parcel/parcelId",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin, Role.Agent, Role.Rider),
  PaymentControllers.getPaymentByParcelId
);
router.delete(
  "/delete/:paymentId",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin, Role.Agent),
  PaymentControllers.deletePayment
);

export const PaymentRouter = router;
