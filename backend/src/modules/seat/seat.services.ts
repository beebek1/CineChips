import { enum_Seats_seat_type, enum_ShowtimeSeats_status, Prisma } from "@prisma/client";
import db from "../../db/db.js";
import { ApiError } from "../../utils/apiError.js";
import { StatusCodes } from "http-status-codes";

const rowNumToLabel = (n: number): string => String.fromCharCode(64 + n);

export const generateSeatsForHall = async (
  hall_id: number,
  total_rows: number,
  total_columns: number,
  tx: Prisma.TransactionClient
) => {
  const seats = [];

  for (let r = 1; r <= total_rows; r++) {
    const row_label = rowNumToLabel(r);
    const is_vip = r === total_rows; //Last row is always VIP

    for (let c = 1; c <= total_columns; c++) {
      seats.push({
        hall_id,
        seat_name: `${row_label}${c}`,
        row_label,
        col_number: c,
        seat_type: is_vip ? enum_Seats_seat_type.vip : enum_Seats_seat_type.standard,
      });
    }
  }

  return await tx.seats.createMany({
    data: seats,
  });
};

export const generateShowtimeSeats = async(showtimeID: number, hallID: number, tx: Prisma.TransactionClient) =>{
    const seats = await tx.seats.findMany({where: { hall_id: hallID}});
    if(seats.length === 0){
        throw new ApiError(StatusCodes.NOT_FOUND, "No seats found for this hall");
    }
    const showtimeSeatsData = seats.map((seat) =>({
        showtime_id: showtimeID,
        seat_id: seat.seat_id,
        status: enum_ShowtimeSeats_status.available
    }))
    return await tx.showtimeSeats.createMany({
    data: showtimeSeatsData,
  });
}

export const fetchSeatsByShowtime = async(showtimeID: number) =>{
    const showtime = await db.showtimes.findUnique({
        where: { showtime_id: showtimeID },
        include: { CinemaHalls: true },
    });
    if (!showtime) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Showtime not found.");
    }

    const showtimeSeats = await db.showtimeSeats.findMany({
        where: { showtime_id: showtimeID },
        include: {
            Seats: true
        },
        orderBy: [
            { Seats: { row_label: "asc" } },
            { Seats: { col_number: "asc" } },
        ]
    })
    const rowMap: Record<string, any[]> = {};

    showtimeSeats.forEach((ss) => {
        const rowLabel = ss.Seats?.row_label;
        if (!rowLabel) return;
        if (!rowMap[rowLabel]) {
            rowMap[rowLabel] = [];
        }
        rowMap[rowLabel].push({
            showtime_seat_id: ss.showtime_seat_id,
            seat_id: ss.seat_id,
            seat_name: ss.Seats?.seat_name,
            col_number: ss.Seats?.col_number,
            seat_type: ss.Seats?.seat_type,
            status: ss.status,
            booked_by: ss.booked_by,
        });
    });
    const rows = Object.entries(rowMap).map(([row_label, seats]) => ({
        row_label,
        seats,
    }));
    return {
        showtime_id: showtimeID,
        hall: showtime.CinemaHalls,
        rows,
    };
}

export const bookSeats = async(showtimeSeatID:number, userID: number) =>{
    const bookedSeat = await db.showtimeSeats.updateMany({
        where:{ showtime_seat_id: showtimeSeatID, status: "available" },
        data:{
            status: "booked",
            booked_by: userID
        }
    })
    if(bookedSeat.count === 0){
        const seat = await db.showtimeSeats.findUnique({ where: { showtime_seat_id: showtimeSeatID } });

        if (!seat) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Seat not found.");
        }
        throw new ApiError(StatusCodes.CONFLICT, "Seat is already booked or reserved.");
    }
    return await db.showtimeSeats.findUnique({ where: { showtime_seat_id: showtimeSeatID } });
}

export const releaseSeats = async(showtimeSeatID:number) =>{
    const bookedSeat = await db.showtimeSeats.updateMany({
        where:{ showtime_seat_id: showtimeSeatID, status: "booked" },
        data:{
            status: "available",
            booked_by: null
        }
    })
    if(bookedSeat.count === 0){
        const seat = await db.showtimeSeats.findUnique({ where: { showtime_seat_id: showtimeSeatID } });

        if (!seat) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Seat not found");
        }
        throw new ApiError(StatusCodes.CONFLICT, "Seat is already available");
    }
    return await db.showtimeSeats.findUnique({ where: { showtime_seat_id: showtimeSeatID } });
}


