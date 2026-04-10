import type { Request, Response } from "express";
import { stripe } from "../config/stripe.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export default asyncHandler(async (req: Request, res: Response) => {
  const { finalAmount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(Number(finalAmount) * 100), // Convert to cents
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret,
  });
});
