import { Router } from "express";

import authRoute from "./modules/auth/auth.route.js";
import cinemaRoute from "./modules/cinema/cinema.route.js";
import movieRoute from "./modules/movie/movie.route.js";
import bookingRoute from "./modules/booking/booking.route.js";
import seatRoute from "./modules/seat/seat.route.js";
import showtimeRoute from "./modules/showtime/showtime.route.js";

import createPaymentIntent from "./services/payment.service.js";
import verifyEmail from "./utils/emailUtils/verifyEmail.js";

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
