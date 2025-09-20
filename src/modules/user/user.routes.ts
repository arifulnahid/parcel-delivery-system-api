import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/:userId", UserController.getUserById);
router.patch("/update/:userId", UserController.updateUser);
router.delete("/delete/:userId", UserController.deleteUser);

export const UserRouter = router;
