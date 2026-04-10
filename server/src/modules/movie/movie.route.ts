import { Router } from "express";
import {verifyAccessToken} from "../../middlewares/auth.middleware.js"
import {requireRole} from "../../middlewares/role.middleware.js"
import { validator } from "../../middlewares/validator.middleware.js";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMovieByID,
  updateMovie,
} from "./movie.controller.js";

import uploadImage from "../../middlewares/multer.js";
import { movieSchema } from "./movie.validator.js";

const router = Router();

router.post("/", verifyAccessToken, requireRole("org"), uploadImage, validator(movieSchema), addMovie);
router.put("/:id", verifyAccessToken, requireRole("org"), uploadImage, validator(movieSchema), updateMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieByID);
router.delete("/:id", verifyAccessToken, requireRole("org"), deleteMovie);

export default router;
