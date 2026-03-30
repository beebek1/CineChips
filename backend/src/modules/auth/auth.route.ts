import { Router } from "express";
import verifyEmail from "../../utils/emailUtils/verifyEmail.js";
import {
  registerUser,
  getUserById,
  loginUser,
  updateUser,
} from "./auth.controller.js";

const router = Router();

router.post("/register", registerUser);
router.get("/getUserByid/:id", getUserById);
router.get("/verify-email", verifyEmail);
router.put("/update/:id", updateUser);
router.post("/login", loginUser);

export default router;



