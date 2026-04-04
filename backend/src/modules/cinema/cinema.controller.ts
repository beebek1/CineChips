import type { Response ,NextFunction } from "express";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as hallService from "./cinema.services.js"
import { StatusCodes } from "http-status-codes";

export const addHall = asyncHandler(async(req:AuthRequest, res: Response) =>{
    const newHall = await hallService.createHallWithSeats(req.body);

    return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Cinema Hall and seats created successfully",
    data: newHall,
  });
})

export const updateHall = asyncHandler(async(req:AuthRequest, res: Response) =>{
    const id = req.params;
    const updatedHall = await hallService.updateHallWithSeats(Number(id), req.body);

    return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Cinema Hall updated successfully",
    data: updatedHall,
  });
})

export const deleteHall = asyncHandler(async(req:AuthRequest, res: Response) =>{
    const id = req.params;
    await hallService.deleteHallWithSeats(Number(id));

    return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Cinema Hall deleted successfully",
    data: null,
  });
})

export const getAllHalls = asyncHandler(async(req:AuthRequest, res: Response) =>{

    const halls = await hallService.getHallWithSeats();

    return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Halls fetched successfully",
    data: halls,
  });
})

