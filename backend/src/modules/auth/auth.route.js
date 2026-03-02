import { Router } from "express";
import {
  addUser,
  getUserById,
  loginUser,
  updateUser,
} from "./auth.controller.js";
import verifyEmail from "../../utils/verifyEmail.js";

const router = Router();

// router.get("/getallUsers", getAllUsers);
router.post("/register", addUser);
router.get("/getUserByid/:id", getUserById);
router.get("/verify-email", verifyEmail);
router.put("/update/:id", updateUser);
router.post("/login", loginUser);

export default router;
