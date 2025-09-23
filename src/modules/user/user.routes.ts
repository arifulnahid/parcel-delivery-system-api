import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";
import passport from "passport";

const router = Router();

router.post(
  "/create",
  validateRequest(createUserZodSchema),
  UserController.createUser
);
router.get("/users", UserController.getAllUsers);
router.get(
  "/:userId",
  passport.authenticate("jwt"),
  UserController.getUserById
);
router.patch(
  "/update/:userId",
  validateRequest(updateUserZodSchema),
  passport.authenticate("jwt"),
  UserController.updateUser
);
router.delete(
  "/delete/:userId",
  passport.authenticate("jwt"),
  UserController.deleteUser
);
router.patch(
  "/soft-delete/:userId",
  passport.authenticate("jwt"),
  UserController.softDeleteUser
);

export const UserRouter = router;
