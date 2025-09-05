import { Router } from "express";
import { ParcelControllers } from "./parcel.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { LogEntrySchema, ParcelSchema } from "./parcel.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { authorize } from "../../middlewares/authorize";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/create",
  validateRequest(ParcelSchema),
  checkAuth(),
  ParcelControllers.createParcel
);
router.get(
  "/",
  checkAuth(),
  authorize(Role.ADMIN),
  ParcelControllers.getAllParcel
);
router.get("/track/:id", ParcelControllers.getParcelById);
router.get("/sender/:id", checkAuth(), ParcelControllers.getParcelByUser);
router.get("/receiver/:id", checkAuth(), ParcelControllers.getParcelByReceiver);
router.post("/cancel/:percelId", checkAuth(), ParcelControllers.cancelParcel);
router.post(
  "/status/:id",
  validateRequest(LogEntrySchema),
  checkAuth(),
  authorize(Role.ADMIN),
  ParcelControllers.updateParcelStatus
);
router.post("/delivered/:id", checkAuth(), ParcelControllers.confirmDelivery);

export const ParcelRoutes = router;
