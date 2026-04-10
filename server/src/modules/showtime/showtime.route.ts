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

router.post("/",verifyAccessToken, requireRole("org"),validator(showtimeSchema), addShowtime);
router.put("/",verifyAccessToken, requireRole("org"),validator(showtimeSchema), addShowtime);
router.get("/", getShowtime);
router.get("/:id", getShowtimeByMovieId);
router.delete("/:id", verifyAccessToken, requireRole("org"), deleteShowtime);

export default router;

