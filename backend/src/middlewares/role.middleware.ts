import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware.js";
import { ApiError } from "../utils/apiError.js";
import { StatusCodes } from "http-status-codes";

export const requireRole = (...allowedRoles: string[]) => {
  //array of string
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Authentication required");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(
        StatusCodes.FORBIDDEN,
        `Forbidden: Access restricted to ${allowedRoles.join(" or ")}`,
      );
    }
    next();
  };
};