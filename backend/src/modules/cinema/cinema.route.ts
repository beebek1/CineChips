import { Router } from "express";
import {authenticate} from "../../middlewares/auth.middleware.js"
import {authorize} from "../../middlewares/role.middleware.js"
import { validator } from "../../middlewares/validator.middleware.js";
import {
  addHall,
  deleteHall,
  getAllHalls,
  updateHall,
} from "./cinema.controller.js";
import { HallSchema } from "./cinema.validator.js";

const router = Router();

// Hall Routes
router.post("/add",validator(HallSchema), authenticate, authorize("org"), addHall);
router.put("/update/:id", validator(HallSchema),authenticate, authorize("org"), updateHall);
router.get("/get-all",authenticate, authorize("org"), getAllHalls);
router.delete("/delete/:id",authenticate, authorize("org"), deleteHall);

export default router;
