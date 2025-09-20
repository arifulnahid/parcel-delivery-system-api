import { Router } from "express";
import { AuthRoutes } from "./auth.controller";
import passport from "passport";

const router = Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  AuthRoutes.login
);
router.post("/logout", AuthRoutes.logout);
router.get("/access-token", AuthRoutes.getAccessToken);

export const AuthRoute = router;
