import Stripe from "stripe";
import { ApiError } from "../utils/apiError.js";
import { StatusCodes } from "http-status-codes";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new ApiError(
    StatusCodes.INTERNAL_SERVER_ERROR,
    "STRIPE_SECRET_KEY is missing from .env",
  );
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
