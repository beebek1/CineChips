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
router.post("/", verifyAccessToken, requireRole("org"),validator(HallSchema), addHall);
router.put("/:id",verifyAccessToken, requireRole("org"), validator(HallSchema), updateHall);
router.get("/", getAllHalls);
router.delete("/:id",verifyAccessToken, requireRole("org"), deleteHall);

export default router;
