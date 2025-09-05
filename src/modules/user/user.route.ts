import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserSchema, updateUserSchema } from "./user.validation";
import { Role } from "./user.interface";
import { checkAuth } from "../../middlewares/checkAuth";
import { authorize } from "../../middlewares/authorize";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserSchema),
  UserControllers.createUser
);
router.get("/profile", checkAuth(), UserControllers.getUserById);
router.get(
  "/profile/:id",
  checkAuth(),
  authorize(Role.ADMIN),
  UserControllers.getProfile
);
router.get(
  "/all-users",
  checkAuth(),
  authorize(Role.ADMIN),
  UserControllers.getAllUsers
);
router.patch(
  "/:id",
  validateRequest(updateUserSchema),
  checkAuth(),
  UserControllers.updateUser
);

export const UserRoutes = router;
