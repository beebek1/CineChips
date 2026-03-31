import { Router } from "express";
import {authenticate} from "../../middlewares/auth.middleware.js"
import {authorize} from "../../middlewares/role.middleware.js"
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

router.post("/addmovie", authenticate, authorize("org"), validator(movieSchema), uploadImage, addMovie);
router.put("/update/:id", authenticate, authorize("org"), validator(movieSchema), uploadImage, updateMovie);
router.get("/getall", authenticate, authorize("org, user"), getAllMovies);
router.get("/get-movie-by-id/:id", authenticate, authorize("org, user"), getMovieByID);
router.delete("/delete/:id", authenticate, authorize("org"), deleteMovie);

export default router;
