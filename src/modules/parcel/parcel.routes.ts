import { Router } from "express";
import { ParcelControllers } from "./parcel.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createParcelZodSchema,
  parcelUpdateStausZodSchema,
  UpdateParcelZodSchema,
} from "./parcel.validation";
import passport from "passport";
import authorize from "../../middlewares/authorize";
import { Role } from "../user/user.inerface";

const router = Router();

router.post(
  "/create",
  validateRequest(createParcelZodSchema),
  ParcelControllers.createParcel
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.SuperAdmin, Role.Admin),
  ParcelControllers.getAllParcels
);
router.get(
  "/:parcelId",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.SuperAdmin, Role.Admin, Role.Rider, Role.Agent),
  ParcelControllers.getParcelById
);
router.post(
  "/update/:parcelId",
  validateRequest(UpdateParcelZodSchema),
  passport.authenticate("jwt", { session: false }),
  authorize(Role.SuperAdmin, Role.Admin, Role.Agent),
  ParcelControllers.updateParcel
);
router.post(
  "/update-status/:parcelId",
  validateRequest(parcelUpdateStausZodSchema),
  passport.authenticate("jwt", { session: false }),
  authorize(Role.SuperAdmin, Role.Admin, Role.Agent),
  ParcelControllers.updateStatus
);
router.delete(
  "/delete/:parcelId",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.SuperAdmin, Role.Admin, Role.Agent),
  ParcelControllers.deleteParcel
);
router.get("/track/:trakingId", ParcelControllers.trackParcel);
router.get(
  "/sender/:userId",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.SuperAdmin, Role.Admin, Role.Agent, "AUTH"),
  ParcelControllers.getParcelsBySender
);
router.get(
  "/receiver/:userId",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.SuperAdmin, Role.Admin, Role.Agent, "AUTH"),
  ParcelControllers.getParcelsByReceiver
);
router.get(
  "/agent/:agentId",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.SuperAdmin, Role.Admin, Role.Agent),
  ParcelControllers.getParcelsByAgent
);
router.get(
  "/rider/:riderId",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.SuperAdmin, Role.Admin, Role.Agent, Role.Rider),
  ParcelControllers.getParcelsByRider
);

export const ParcelRouter = router;
