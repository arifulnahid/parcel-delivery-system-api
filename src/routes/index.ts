import { Router } from "express";
import { UserRouter } from "../modules/user/user.routes";

export const router = Router();

router.use("/user", UserRouter);
