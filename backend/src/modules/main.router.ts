import { Router } from "express";

import authRoute from "./auth/auth.route.js";
import cinemaRoute from "./cinema/cinema.route.js";
import movieRoute from "./movie/movie.route.js";
import bookingRoute from "./booking/booking.route.js";
import seatRoute from "./seat/seat.route.js";
import showtimeRoute from "./showtime/showtime.route.js";

import createPaymentIntent from "../services/payment.service.js";
import verifyEmail from "../utils/emailUtils/verifyEmail.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/booking", bookingRoute);
router.use("/cinema", cinemaRoute);
router.use("/movie", movieRoute);
router.use("/seat", seatRoute);
router.use("/showtime", showtimeRoute);

router.post("/payment", createPaymentIntent);
router.get("/verify-email", verifyEmail);

export default router;
