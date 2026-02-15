import { Router } from "express";
import {
  addMovie,
  deleteMovie,
} from "./movie.controller.js";

const router = Router();

router.post("/addmovie", addMovie);
router.delete("/:id", deleteMovie);

export default router;
