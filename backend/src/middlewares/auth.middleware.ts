import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request{
    user?:{
        id: string;
        role: string;
    };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized: Token missing");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: string };
        
        req.user = decoded;
        next();
    } catch (error) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized: Invalid or expired token");
    }
};