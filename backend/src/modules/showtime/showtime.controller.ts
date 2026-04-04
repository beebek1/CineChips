import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as showtimeService from "./showtime.services.js";
import { StatusCodes } from "http-status-codes";

export const addShowtime = asyncHandler(async (req: Request, res: Response) => {
  const newShowtime = await showtimeService.addShowtime(req.body);

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Showtime added successfully",
    data: newShowtime,
  });
});

export const getShowtime = asyncHandler(async (req: Request, res: Response) => {
  const fetchedShowtime = await showtimeService.getShowtimes();

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Showtime fetched successfully",
    data: fetchedShowtime,
  });
});

export const getShowtimeByMovieId = asyncHandler(async (req: Request, res: Response) => {
  const fetchedShowtime = await showtimeService.getShowtimeByMovieId(Number(req.params));

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Showtime fetched successfully",
    data: fetchedShowtime,
  });
});

export const deleteShowtime = asyncHandler(async (req: Request, res: Response) => {
  const deletedShowtime = await showtimeService.deleteShowtime(
    Number(req.params),
  );

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Showtime deleted successfully",
    data: deletedShowtime,
  });
});
