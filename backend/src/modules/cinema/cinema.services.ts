import { StatusCodes } from "http-status-codes";
import db from "../../config/db.js";
import { ApiError } from "../../utils/apiError.js";
import type { HallInput } from "./cinema.validator.js";
import { generateSeatsForHall } from "../seat/seat.services.js";

export const createHallWithSeats = async (data: HallInput) => {
  return await db.$transaction(async (tx) => {
    //transaction client for this transaction
    const newHall = await tx.cinemaHalls.create({
      data: {
        name: data.name,
        location: data.location,
        total_rows: Number(data.rowCount),
        total_columns: Number(data.colCount),
        basePrice: Number(data.basePrice),
        vipPrice: Number(data.vipPrice),
      },
    });

    //generating seats
    await generateSeatsForHall(
      newHall.hall_id,
      newHall.total_rows,
      newHall.total_columns,
      tx,
    );
    return newHall;
  });
};

export const updateHallWithSeats = async (hallID: number, data: HallInput) => {
  return await db.$transaction(async (tx) => {
    const hall = await tx.cinemaHalls.findUnique({
      where: { hall_id: hallID },
    });
    if (!hall) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Cinema Hall not found");
    }
    const updateHall = await tx.cinemaHalls.update({
      where: { hall_id: hallID },
      data: {
        name: data.name || hall.name,
        location: data.location || hall.location,
        total_rows: data.rowCount ? Number(data.rowCount) : hall.total_rows,
        total_columns: data.colCount
          ? Number(data.colCount)
          : hall.total_columns,
        basePrice: data.basePrice ? Number(data.basePrice) : hall.basePrice,
        vipPrice: data.vipPrice ? Number(data.vipPrice) : hall.vipPrice,
      },
    });
    await generateSeatsForHall(
      updateHall.hall_id,
      updateHall.total_rows,
      updateHall.total_columns,
      tx,
    );
    return updateHall;
  });
};

export const deleteHallWithSeats = async (hallID: number) => {
  return await db.$transaction(async (tx) => {
    const hall = await tx.cinemaHalls.findUnique({
      where: { hall_id: hallID },
    });
    if (!hall) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Cinema Hall not found");
    }
    await tx.cinemaHalls.delete({
      where: { hall_id: hallID },
    });

    return true;
  });
};

export const getHallWithSeats = async () => {
  const halls = db.cinemaHalls.findMany({
    orderBy: {
      createdAt: `desc`,
    },
  });
  return halls;
};
