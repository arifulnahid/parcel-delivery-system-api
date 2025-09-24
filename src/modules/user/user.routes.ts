import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import passport from "passport";
import authorize from "../../middlewares/authorize";
import { Role } from "./user.inerface";

const router = Router();

router.post(
  "/create",
  validateRequest(createUserZodSchema),
  UserController.createUser
);
router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin, Role.SuperAdmin),
  UserController.getAllUsers
);
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin, Role.SuperAdmin),
  UserController.getUserById
);
router.patch(
  "/update/:userId",
  validateRequest(updateUserZodSchema),
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin, Role.SuperAdmin),
  UserController.updateUser
);
router.delete(
  "/delete/:userId",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin, Role.SuperAdmin),
  UserController.deleteUser
);
router.patch(
  "/soft-delete/:userId",
  passport.authenticate("jwt", { session: false }),
  authorize(Role.Admin, Role.SuperAdmin),
  UserController.softDeleteUser
);

export const UserRouter = router;
