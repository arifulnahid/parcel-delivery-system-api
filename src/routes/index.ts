import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";
import { AuthRoute } from "../modules/auth/auth.routes";

export const router = Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRoute);
