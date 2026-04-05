import { Router } from "express";
import {verifyAccessToken} from "../../middlewares/auth.middleware.js"
import {requireRole} from "../../middlewares/role.middleware.js"
import {
  getSeatsByShowtime,
  bookSeats,
  releaseSeats
} from "./seat.controller.js";

const router = Router();

router.get("/seats/showtime/:showtimeId",verifyAccessToken, requireRole("user"), getSeatsByShowtime);
router.patch("/seats/book", verifyAccessToken, requireRole("user"), bookSeats);
router.patch("/seats/release", verifyAccessToken, requireRole("user"), releaseSeats);

export default router;

