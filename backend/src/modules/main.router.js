import { Router } from "express";

import authRoute from "./auth/auth.route.js";
import cinemaRoute from "./cinema/cinema.route.js";
import movieRoute from "./movie/movie.route.js";
import bookingRoute from "./booking/booking.route.js";
import createPaymentIntent from "../utils/stripe.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/cinema", cinemaRoute);
router.use("/movie", movieRoute);
router.use("/booking", bookingRoute);
router.post("/payment", createPaymentIntent);

export default router;
