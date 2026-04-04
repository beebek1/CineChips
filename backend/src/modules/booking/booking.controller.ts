import type { Response } from "express";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as bookingService from "./booking.services.js";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../utils/apiError.js";

export const addBooking = asyncHandler(async(req: AuthRequest, res: Response) =>{
    const { bookingData } = req.body;
    const userID = req.user?.id;

    const booking = await bookingService.addBooking(Number(userID), bookingData);

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Booking successfull",
        data: booking
    })
})

export const deleteBooking = asyncHandler(async(req: AuthRequest, res: Response) =>{
    const bookingID = req.params.bookingID;
    const booking = await bookingService.deleteBooking(bookingID as string);

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Booking successfull",
        data: booking
    })
})

export const getBookingsByUser = asyncHandler(async(req: AuthRequest, res: Response) =>{
    const userID = req.user?.id;

    const bookings = await bookingService.getBookingsByUser(Number(userID))
    return res.status(StatusCodes.OK).json({
        success: true,
        message: "Booking fetched successfull",
        data: bookings,
    });
})