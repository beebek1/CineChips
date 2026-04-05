import { Router } from "express";
import {verifyAccessToken} from "../../middlewares/auth.middleware.js"
import {requireRole} from "../../middlewares/role.middleware.js"
import { validator } from "../../middlewares/validator.middleware.js";
import {
  addHall,
  deleteHall,
  getAllHalls,
  updateHall,
} from "./cinema.controller.js";
import { HallSchema } from "./cinema.validator.js";

const router = Router();

// Hall Routes
router.post("/add",validator(HallSchema), verifyAccessToken, requireRole("org"), addHall);
router.put("/update/:id", validator(HallSchema),verifyAccessToken, requireRole("org"), updateHall);
router.get("/get-all",verifyAccessToken, requireRole("org"), getAllHalls);
router.delete("/delete/:id",verifyAccessToken, requireRole("org"), deleteHall);

export default router;
