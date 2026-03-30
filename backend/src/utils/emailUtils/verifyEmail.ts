import type { Request, Response } from "express";
import db from "../../db/db.js";

const verifyEmail = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        message: "no token passed",
      });
    }

    // 1. Find the user by token
    const user = await db.users.findFirst({ 
      where: { verificationToken: token as string } 
    });

    if (!user) {
      return res.status(400).json({
        message: "invalid token",
      });
    }

    // 2. Check token expiration
    if (user.verificationTokenExpires && user.verificationTokenExpires < new Date()) {
      return res.status(400).json({
        message: "token expired",
      });
    }

    // 3. Update the user in the database
    // In Prisma, we use the update method with the user's ID
    await db.users.update({
      where: { user_id: user.user_id }, // or user.uuid depending on your schema
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpires: null,
      },
    });

    return res.status(200).json({
      message: "woah! email verified successfully",
    });

  } catch (error: any) {
    return res.status(500).json({
      message: "server side error",
      error: error.message,
    });
  }
};

export default verifyEmail;
