import { Router } from "express";
import {
  addMovie,
  deleteMovie,
} from "./movie.controller.js";

import uploadImage from "../../middlewares/multer.js";

const router = Router();

router.post("/addmovie", uploadImage, addMovie);
router.delete("/:id", deleteMovie);

export default router;
