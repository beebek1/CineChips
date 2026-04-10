import { Router } from "express";
import {verifyAccessToken} from "../../middlewares/auth.middleware.js"
import {requireRole} from "../../middlewares/role.middleware.js"
import { validator } from "../../middlewares/validator.middleware.js";
import { addBookingSchema, deleteBookingSchema } from "./booking.validator.js";
import {
  addBooking,
  deleteBooking,
  getBookingsByUser,
} from "./booking.controller.js";

const router = Router();

router.post("/",verifyAccessToken,validator(addBookingSchema), addBooking);
router.get("/",verifyAccessToken, requireRole("user"), getBookingsByUser);
router.delete("/:id",verifyAccessToken, requireRole("user"), validator(deleteBookingSchema) ,deleteBooking);

export default router;
