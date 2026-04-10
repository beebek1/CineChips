import type { Response } from "express";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as seatService from "./seat.services.js";
import { StatusCodes } from "http-status-codes";

export const getSeatsByShowtime = asyncHandler(async(req: AuthRequest, res:Response) =>{
    const showtimeID = req.params.id;
    const seats = await seatService.fetchSeatsByShowtime(Number(showtimeID));

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Seats for the showtime fetched successfully",
        data: seats
    })
})

export const bookSeats = asyncHandler(async(req: AuthRequest, res:Response) =>{
    const userID = req.user?.id;
    const seats = await seatService.bookSeats(Number(userID), req.body);

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Seats booked successfully",
        data: seats
    })
})

export const releaseSeats = asyncHandler(async(req: AuthRequest, res:Response) =>{
    const showtimeID = req.params.id;
    const seats = await seatService.releaseSeats(Number(showtimeID));

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Seats freed successfully",
        data: seats
    })
})
