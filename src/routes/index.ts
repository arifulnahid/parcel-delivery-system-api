import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ParcelRoutes } from "../modules/parcel/parcel.route";

export const router = Router();

const modulesRoutes = [
  {
    path: "/",
  },
];

router.use("/user", UserRoutes);
router.use("/auth", AuthRoutes);
router.use("/parcel", ParcelRoutes);
