import { Router } from "express";
import verifyEmail from "../../utils/emailUtils/verifyEmail.js";
import {authenticate} from "../../middlewares/auth.middleware.js"
import {authorize} from "../../middlewares/role.middleware.js"
import { validator } from "../../middlewares/validator.middleware.js";
import { authLoginSchema, authRegisterSchema, authUpdateUserSchema } from "./auth.validator.js";

import {
  registerUser,
  getUserById,
  loginUser,
  updatedUser,
} from "./auth.controller.js";
const router = Router();

router.post("/register",validator(authRegisterSchema), registerUser);
router.get("/getUserByid/:id", authenticate,  getUserById);
router.get("/verify-email", verifyEmail);
router.put("/update/:id", validator(authUpdateUserSchema), authenticate, authorize("user"), updatedUser);
router.post("/login",validator(authLoginSchema), loginUser);

export default router;



