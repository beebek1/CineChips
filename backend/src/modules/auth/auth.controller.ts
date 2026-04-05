import type { Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as userService from "./auth.services.js";
import { StatusCodes } from "http-status-codes";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";

export const getUserById = asyncHandler(async(req: AuthRequest, res: Response) =>{
    const userID = req.user?.id;

    const user = await userService.fetchUserByID(Number(userID));

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "User fetched successfully",
        data: user
    })
})

export const registerUser = asyncHandler(async(req:AuthRequest, res: Response)=>{

    const user = await userService.register(req.body);

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User created successfully",
        data: user
    })
})

export const updatedUser = asyncHandler(async(req:AuthRequest, res: Response)=>{
    const userID = req.user?.id;
    const{ updateData } = req.body;

    const user = await userService.updatedUser(Number(userID), updateData);

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "User details updated successfully",
        data: user
    })
})

export const loginUser = asyncHandler(async(req:AuthRequest, res: Response)=>{

    const user = await userService.login(req.body);

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "user logged in Successfully",
        data: user
    })
})