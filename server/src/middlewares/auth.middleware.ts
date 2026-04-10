import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import type { enum_users_role } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: enum_users_role;
  };
}

type AccessTokenPayload = {
  id: string;
  role: enum_users_role;
  iat?: number;
  exp?: number;
};

export const verifyAccessToken = asyncHandler(
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized: Invalid token format",
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized: Token missing",
      );
    }

    let decoded: AccessTokenPayload;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as AccessTokenPayload;
    } catch {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized: Invalid or expired token",
      );
    }

    if (!decoded?.id || !decoded?.role) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized: Invalid token payload",
      );
    }

    req.user = {
      id: String(decoded.id),
      role: decoded.role,
    };

    next();
  },
);
