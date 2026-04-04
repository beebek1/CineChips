import { StatusCodes } from "http-status-codes";
import db from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";
import { type ShowtimeInput } from "./showtime.validator.js";
import { generateShowtimeSeats } from "../seat/seat.services.js";

export const addShowtime = async (data: ShowtimeInput) => {
  return await db.$transaction(async (tx) => {
    const movie = await tx.movies.findUnique({
      where: { movie_id: data.movie_id },
    });
    if (!movie) throw new ApiError(StatusCodes.NOT_FOUND, "Movie not found");

    const hall = await tx.cinemaHalls.findUnique({
      where: { hall_id: data.hall_id },
    });
    if (!hall) throw new ApiError(StatusCodes.NOT_FOUND, "Hall not found");

    const newShowtime = await tx.showtimes.create({
      data: {
        ...data,
      },
    });
    await generateShowtimeSeats(newShowtime.showtime_id, data.hall_id, tx);
  });
};

export const getShowtimes = async () => {
  const showtimes = await db.showtimes.findMany({
    include: {
      movies: true,
      CinemaHalls: true,
    },
    orderBy: [{ show_date: "asc" }, { show_time: "asc" }],
  });
  return showtimes;
};

export const getShowtimeByMovieId = async (movieID: number) => {
  const showtimes = await db.showtimes.findMany({
    where: { movie_id: movieID },
    include: {
      movies: true,
      CinemaHalls: true,
    },
    orderBy: [{ show_date: "asc" }, { show_time: "asc" }],
  });
  if (!showtimes || showtimes.length === 0)
    throw new ApiError(StatusCodes.NOT_FOUND, " No showtime Found ");
  return showtimes;
};

export const deleteShowtime = async (showtimeID: number) => {
  const deletedShowtime = await db.showtimes.deleteMany({
    where: { showtime_id: showtimeID },
  });
  if (!deletedShowtime)
    throw new ApiError(StatusCodes.NOT_FOUND, "No showtime Found");
  return deletedShowtime;
};
