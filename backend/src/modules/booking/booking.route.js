import { Router } from "express";
import {
  addBooking,
  deleteBooking,
  getBookingsByUser,
} from "./booking.controller.js";

import uploadImage from "../../middlewares/multer.js";

const router = Router();

router.post("/add" , addBooking);
router.get("/get/:id", getBookingsByUser);
router.delete("/delete/:id", deleteBooking);

export default router;
