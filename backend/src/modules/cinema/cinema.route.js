import { Router } from "express";
import { addHall, addShowTime } from "./cinema.controller.js";

const router = Router();

// Cinema/Scheduling Routes
router.post("/halls", addHall);
router.post("/showtimes", addShowTime);

export default router;
