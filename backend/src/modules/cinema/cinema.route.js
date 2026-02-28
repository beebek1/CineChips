import { Router } from "express";
import { addHall, addShowTime, deleteHall, getAllHalls, getShowTimes, updateHall } from "./cinema.controller.js";

const router = Router();

// Cinema/Scheduling Routes
router.post("/add", addHall);
router.put("/update/:id", updateHall);
router.get("/get-all", getAllHalls);
router.delete("/delete/:id", deleteHall);

router.post("/showtimes", addShowTime);
router.get("/get-showtime", getShowTimes);

export default router;
