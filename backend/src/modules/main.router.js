import { Router } from "express";

import authRoute from "./auth/auth.route.js";
import cinemaRoute from "./cinema/cinema.route.js";
import movieRoute from "./movie/movie.route.js";

const router = Router();

router.use("/auth", authRoute);
router.use("/cinema", cinemaRoute);
router.use("/movie", movieRoute);

export default router;
