import { Router } from "express";
import {
  addHall,
  addShowTime,
  deleteHall,
  deleteShowTime,
  getAllHalls,
  getShowTimes,
  updateHall,
} from "./cinema.controller.js";

import {
  getSeatsByShowtime,
  bookSeat,
  releaseSeat,
} from "./seat.controller.js";

const router = Router();

// Hall Routes
router.post("/add", addHall);
router.put("/update/:id", updateHall);
router.get("/get-all", getAllHalls);
router.delete("/delete/:id", deleteHall);

// Showtime Routes
router.post("/showtimes", addShowTime);
router.get("/get-showtime", getShowTimes);
router.delete("/showtime/delete/:id", deleteShowTime);

// Seat Routes
router.get("/seats/showtime/:showtimeId", getSeatsByShowtime);
router.patch("/seats/book", bookSeat);
router.patch("/seats/release", releaseSeat);

export default router;
