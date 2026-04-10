import { Router } from "express";
import verifyEmail from "../../utils/emailUtils/verifyEmail.js";
import {verifyAccessToken} from "../../middlewares/auth.middleware.js"
import {requireRole} from "../../middlewares/role.middleware.js"
import { validator } from "../../middlewares/validator.middleware.js";
import { authLoginSchema, authRegisterSchema, authUpdateUserSchema } from "./auth.validator.js";

import {
  registerUser,
  getUserById,
  loginUser,
  updatedUser,
} from "./auth.controller.js";
const router = Router();

router.post("/register", validator(authRegisterSchema), registerUser);
router.get("/getUser", verifyAccessToken, getUserById);
router.get("/verify-email", verifyEmail);
router.put(
  "/update/:id",
  verifyAccessToken,
  requireRole("user"),
  validator(authUpdateUserSchema),
  updatedUser,
);
router.post("/login",validator(authLoginSchema), loginUser);

export default router;



