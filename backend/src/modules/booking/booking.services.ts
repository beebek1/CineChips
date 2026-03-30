import { StatusCodes } from "http-status-codes";
import db from "../../db/db.js";
import { ApiError } from "../../utils/apiError.js";
import type { addBookingInput } from "./booking.validator.js";

export const addBooking = async(  userID: number,data:addBookingInput) =>{
    const bookingID = "CHIP-" + Date.now().toString().slice(-6)
    const bookingExists = await db.bookings.findFirst({
        where:{booking_id: bookingID}
    })
    if(bookingExists){
        throw new ApiError(StatusCodes.CONFLICT, "Booking already exists")
    }
    const booking = db.bookings.create({
        data:{
            user_id: userID,
            showtime_id: data.showtime_id,
            booking_id : bookingID,
            movie_name: data.movie_name,
            hall_name: data.hall_name,
            show_time: data.show_time,
            show_date: data.show_time,
            booked_seats: data.booked_seats, 
            total_price: data.total_price,
            status: "unchecked",
        },
    });

    return booking;
}

export const deleteBooking = async( bookingID: string) =>{
    const bookingExists = await db.bookings.findFirst({
        where:{booking_id: bookingID}
    })
    if(!bookingExists){
        throw new ApiError(StatusCodes.NOT_FOUND, "Booking not found")
    }
    const booking = await db.bookings.delete({
        where:{booking_id: bookingID}
    })
    return booking;
}

export const getBookingByUser = async(userID: number) =>{
    const bookings = await db.bookings.findMany({
        where:{
            user_id: userID,
        },
        include: {
            showtimes:{
                select: {
                    language: true,
                    movies:{
                        select: {
                            coverPic: true
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        }
    });

    if(!bookings || bookings.length === 0){
        throw new ApiError(StatusCodes.NOT_FOUND, "No booking found")
    }
    return bookings
}