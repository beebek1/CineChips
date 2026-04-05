import { Router } from "express";
import {verifyAccessToken} from "../../middlewares/auth.middleware.js"
import {requireRole} from "../../middlewares/role.middleware.js"
import {
  addShowtime,
  getShowtime,
  getShowtimeByMovieId,
  deleteShowtime
} from "./showtime.controller.js";
import { validator } from "../../middlewares/validator.middleware.js";
import { showtimeSchema } from "./showtime.validator.js";

const router = Router();

router.post("/showtimes",verifyAccessToken, requireRole("org"),validator(showtimeSchema), addShowtime);
router.get("/showtimes", verifyAccessToken, requireRole("org"), getShowtime);
router.get("/showtimes/:id", verifyAccessToken, requireRole("user"), getShowtimeByMovieId);
router.delete("/showtimes/:id", verifyAccessToken, requireRole("org"), deleteShowtime);

export default router;

