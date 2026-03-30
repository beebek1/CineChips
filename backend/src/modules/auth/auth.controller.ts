import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import * as userService from "./auth.services.js";
import { StatusCodes } from "http-status-codes";

export const getUserById = asyncHandler(async(req: Request, res: Response) =>{
    const{ userID } = req.params;

    const user = await userService.fetchUserByID(Number(userID));

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "User fetched successfully",
        data: user
    })
})

export const registerUser = asyncHandler(async(req:Request, res: Response)=>{
    const { registerData } = req.body;

    const user = await userService.register(registerData);

    return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "User created successfully",
        data: user
    })
})

export const updateUser = asyncHandler(async(req:Request, res: Response)=>{
    const{ userID } = req.params;
    const{ updateData } = req.body;

    const user = await userService.updateUser(Number(userID), updateData);

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "User details updated successfully",
        data: user
    })
})

export const loginUser = asyncHandler(async(req:Request, res: Response)=>{
    const{ loginData } = req.body;

    const user = await userService.login(loginData);

    return res.status(StatusCodes.OK).json({
        success: true,
        message: "user logged in Successfully",
        data: user
    })
})