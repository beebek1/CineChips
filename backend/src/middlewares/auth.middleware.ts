import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import db from "../config/db.js";
import type { enum_users_role } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";

export interface AuthRequest extends Request{
    user?:{
        id: string;
        role: enum_users_role;
    };
}

export const verifyAccessToken = asyncHandler(async(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) throw new ApiError( StatusCodes.UNAUTHORIZED, "Unauthorized: Invalid token format");
  const token = authHeader.split(" ")[1];
  if (!token) throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized: Token missing");


    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    const user = await db.users.findUnique({
      where: { user_id: Number(decoded.id) },
      select: { user_id: true, role: true },
    });

    if (!user) throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized: User not found");

    req.user = {
      id: String(user.user_id),
      role: user.role,
    };
    next();
});