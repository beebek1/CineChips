import type { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as showtimeService from "./showtime.services.js";
import { StatusCodes } from "http-status-codes";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";

export const addShowtime = asyncHandler(async (req: AuthRequest, res: Response) => {
  const {movie_id, hall_id} = req.body;
  const newShowtime = await showtimeService.addShowtime(req.body, Number(movie_id), Number(hall_id));

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Showtime added successfully",
    data: newShowtime,
  });
});

export const editShowtime = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { movie_id, hall_id } = req.body;
    const movieID = req.params.id;

    // We pass the body and the casted ID to the service
    const updatedShowtime = await showtimeService.editShowtime(
      req.body,
      Number(movieID),
      Number(movie_id),
      Number(hall_id)
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Showtime updated successfully",
      data: updatedShowtime,
    });
  },
);

export const getShowtime = asyncHandler(async (req: AuthRequest, res: Response) => {
  const fetchedShowtime = await showtimeService.getShowtimes();

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Showtime fetched successfully",
    data: fetchedShowtime,
  });
});

export const getShowtimeByMovieId = asyncHandler(async (req: AuthRequest, res: Response) => {
  const fetchedShowtime = await showtimeService.getShowtimeByMovieId(Number(req.params));

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Showtime fetched successfully",
    data: fetchedShowtime,
  });
});

export const deleteShowtime = asyncHandler(async (req: AuthRequest, res: Response) => {
  const showtimeID = req.params.id;
  const deletedShowtime = await showtimeService.deleteShowtime(
    Number(showtimeID),
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Showtime deleted successfully",
    data: deletedShowtime,
  });
});
