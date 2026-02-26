import { Router } from "express";
import {
  addMovie,
  deleteMovie,
  getAllMovie,
  getMoviesById,
  updateMovie,
} from "./movie.controller.js";

import uploadImage from "../../middlewares/multer.js";

const router = Router();

router.post("/addmovie", uploadImage, addMovie);
router.put("/update/:id", uploadImage, updateMovie);
router.get("/getall", getAllMovie);
router.get("/get-movie-by-id/:id", getMoviesById);
router.delete("/delete/:id", deleteMovie);

export default router;
