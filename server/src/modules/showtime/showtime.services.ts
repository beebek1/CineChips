import { StatusCodes } from "http-status-codes";
import db from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";
import { type ShowtimeInput } from "./showtime.validator.js";
import { generateShowtimeSeats } from "../seat/seat.services.js";

export const addShowtime = async (data: ShowtimeInput, movie_id: number, hall_id: number) => {
  return await db.$transaction(async (tx) => {
    const movie = await tx.movies.findUnique({
      where: { movie_id: movie_id },
    });
    if (!movie) throw new ApiError(StatusCodes.NOT_FOUND, "Movie not found");

    const hall = await tx.cinemaHalls.findUnique({
      where: { hall_id: hall_id },
    });
    if (!hall) throw new ApiError(StatusCodes.NOT_FOUND, "Hall not found");

    const newShowtime = await tx.showtimes.create({
      data: {
        ...data,
        price: String(data.price),
        show_date: new Date(data.show_date),
        hall_id: hall_id,
        movie_id: movie_id
      },
    });
    await generateShowtimeSeats(newShowtime.showtime_id, hall_id, tx);
  });
};

export const editShowtime = async (
  data: ShowtimeInput,
  showtime_id: number,
  movie_id: number,
  hall_id: number
) => {
  return await db.$transaction(async (tx) => {
    const existingShowtime = await tx.showtimes.findUnique({
      where: { showtime_id },
    });
    if (!existingShowtime) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Showtime not found");
    }

    if (data.movie_id) {
      const movie = await tx.movies.findUnique({
        where: { movie_id: movie_id },
      });
      if (!movie) throw new ApiError(StatusCodes.NOT_FOUND, "Movie not found");
    }

    // 3. If hall_id is being updated, verify the new hall exists
    if (data.hall_id) {
      const hall = await tx.cinemaHalls.findUnique({
        where: { hall_id: hall_id },
      });
      if (!hall) throw new ApiError(StatusCodes.NOT_FOUND, "Hall not found");
    }

    // 4. Update the showtime
    const updatedShowtime = await tx.showtimes.update({
      where: { showtime_id },
      data: {
        ...data,
        movie_id: movie_id,
        hall_id: hall_id,
        price: String(data.price),
        show_date:  new Date(data.show_date),
      },
    });

    // 5. Handle Hall Change Logic
    // If the hall changed, the existing seats are likely invalid.
    // We should clear the old seats and generate new ones for the new hall.
    if (data.hall_id && hall_id !== existingShowtime.hall_id) {
      // Assuming you have a way to delete seats related to this showtime
      await tx.showtimeSeats.deleteMany({
        where: { showtime_id: showtime_id },
      });

      // Generate seats for the new hall
      await generateShowtimeSeats(showtime_id, hall_id, tx);
    }

    return updatedShowtime;
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
