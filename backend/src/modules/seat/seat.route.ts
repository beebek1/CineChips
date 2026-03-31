import { Router } from "express";
import {authenticate} from "../../middlewares/auth.middleware.js"
import {authorize} from "../../middlewares/role.middleware.js"
import {
  getSeatsByShowtime,
  bookSeats,
  releaseSeats
} from "./seat.controller.js";

const router = Router();

router.get("/seats/showtime/:showtimeId",authenticate, authorize("user"), getSeatsByShowtime);
router.patch("/seats/book", authenticate, authorize("user"), bookSeats);
router.patch("/seats/release", authenticate, authorize("user"), releaseSeats);

export default router;

