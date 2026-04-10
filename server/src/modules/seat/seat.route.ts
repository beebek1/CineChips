import { Router } from "express";
import {verifyAccessToken} from "../../middlewares/auth.middleware.js"
import {requireRole} from "../../middlewares/role.middleware.js"
import {
  getSeatsByShowtime,
  bookSeats,
  releaseSeats
} from "./seat.controller.js";
import { validator } from "../../middlewares/validator.middleware.js";
import { SeatSchema } from "./seat.validator.js";

const router = Router();

router.get("/:id", getSeatsByShowtime);
router.patch("/book", verifyAccessToken, requireRole("user"), validator(SeatSchema), bookSeats);
router.patch("/release", verifyAccessToken, requireRole("user"), releaseSeats);

export default router;

