import { Router } from "express";
import {
  addUser,
  getUserById,
  loginUser,
} from "./auth.controller.js";
import verifyEmail from "../../utils/verifyEmail.js";

const router = Router();

// router.get("/getallUsers", getAllUsers);
router.post("/register", addUser);
router.put("/getUserByid/:uid", getUserById);
router.get("/verify-email", verifyEmail);
router.post("/login", loginUser);

export default router;
