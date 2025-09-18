import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/:userId", UserController.getUserById);
router.post("/update/:userId", UserController.updateUser);
router.post("/delete/:userId", UserController.deleteUser);

export const UserRouter = router;
