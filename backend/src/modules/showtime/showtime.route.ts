import { Router } from "express";
import {authenticate} from "../../middlewares/auth.middleware.js"
import {authorize} from "../../middlewares/role.middleware.js"
import {
  addShowtime,
  getShowtime,
  getShowtimeByMovieId,
  deleteShowtime
} from "./showtime.controller.js";
import { validator } from "../../middlewares/validator.middleware.js";
import { showtimeSchema } from "./showtime.validator.js";

const router = Router();

router.post("/showtimes",authenticate, authorize("org"),validator(showtimeSchema), addShowtime);
router.get("/showtimes", authenticate, authorize("org"), getShowtime);
router.get("/showtimes/:id", authenticate, authorize("user"), getShowtimeByMovieId);
router.delete("/showtimes/:id", authenticate, authorize("org"), deleteShowtime);

export default router;

