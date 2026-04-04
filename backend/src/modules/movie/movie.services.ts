import { StatusCodes } from "http-status-codes";
import db from "../../config/db.js";
import type { MovieInput } from "./movie.validator.js";
import { ApiError } from "../../utils/apiError.js";

export const addMovie = async (data: MovieInput, coverPicName: string) => {
  const cleanTitle = data.title.replace(/\s+/g, " ").trim().toLowerCase();

  const movieExists = await db.movies.findFirst({
    where: { title: cleanTitle },
  });
  if (movieExists) {
    throw new ApiError(StatusCodes.CONFLICT, "Movie already exists");
  }

  const newMovie = await db.movies.create({
    data: {
      ...data,
      title: cleanTitle,
      coverPic: coverPicName,
    },
  });
  return newMovie;
};

export const updateMovie = async (
  movieID: number,
  data: MovieInput,
  coverPicName?: string,
) => {
  const movieExists = await db.movies.findUnique({
    where: { movie_id: movieID },
  });
  if (!movieExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Movie not found");
  }
  let cleanTitle = movieExists.title;
  if (data.title) {
    cleanTitle = data.title.replace(/\s+/g, " ").trim().toLowerCase();

    const duplicateTitle = await db.movies.findFirst({
      where: { title: cleanTitle },
    });
    if (duplicateTitle) {
      throw new ApiError(
        StatusCodes.CONFLICT,
        "Movie with this title already Exists",
      );
    }
  }

  const updatedMovie = await db.movies.update({
    where: { movie_id: movieID },
    data: {
      ...data,
      title: cleanTitle,
      ...(coverPicName && { coverPic: coverPicName }),
    },
  });
  return updatedMovie;
};

export const getAllMovies = async () => {
  const movies = await db.movies.findMany({
    where: { status: "Showing" },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!movies || movies.length === 0) {
    throw new ApiError(StatusCodes.NOT_FOUND, "No movies showing currently");
  }
  return movies;
};

export const getMovieByID = async (movieID: number) => {
  const movieExists = db.movies.findUnique({ where: { movie_id: movieID } });
  if (!movieExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Movie not found");
  }
  const movie = await db.movies.findFirst({
    where: { movie_id: movieID },
  });
  return movie;
};

export const deleteMovie = async (movieID: number) => {
  const movieExists = db.movies.findUnique({ where: { movie_id: movieID } });
  if (!movieExists) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Movie not found");
  }
  await db.movies.delete({
    where: { movie_id: movieID },
  });
  return null;
};
