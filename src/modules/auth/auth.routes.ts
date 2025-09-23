import { Router } from "express";
import { AuthRoutes } from "./auth.controller";
import passport from "passport";
import { validateRequest } from "../../middlewares/validateRequest";
import { authZodSchema, changePasswordZodSchema } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validateRequest(authZodSchema),
  passport.authenticate("local", { session: false }),
  AuthRoutes.login
);
router.post("/logout", AuthRoutes.logout);
router.patch(
  "/change-password",
  validateRequest(changePasswordZodSchema),
  passport.authenticate("jwt", { session: false }),
  AuthRoutes.changePassword
);
router.get("/access-token", AuthRoutes.getAccessToken);

export const AuthRoute = router;
