import { Router } from "express";
import {authenticate} from "../../middlewares/auth.middleware.js"
import {authorize} from "../../middlewares/role.middleware.js"
import { validator } from "../../middlewares/validator.middleware.js";
import { addBookingSchema, deleteBookingSchema } from "./booking.validator.js";
import {
  addBooking,
  deleteBooking,
  getBookingsByUser,
} from "./booking.controller.js";

const router = Router();

router.post("/add",authenticate, authorize("org"),validator(addBookingSchema), addBooking);
router.get("/get/:id",authenticate, authorize("user"), getBookingsByUser);
router.delete("/delete/:bookingID",authenticate, authorize("user"), validator(deleteBookingSchema) ,deleteBooking);

export default router;
