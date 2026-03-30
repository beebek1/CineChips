import crypto from "crypto";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { enum_users_role } from "@prisma/client";
import jwt, { type SignOptions } from "jsonwebtoken";

import db from "../../db/db.js";
import { ApiError } from "../../utils/apiError.js";
import type { LoginInput, RegisterInput, UpdateInput } from "./auth.validator.js";
import emailSender from "../../utils/emailUtils/emailSender.js";
import registrationEmailTemplate from "../../utils/emailUtils/register.js";


export const register = async(data: RegisterInput) => {
    const userExists = await db.users.findUnique({
        where : {email : data.email}
    });

    if(userExists){
        throw new ApiError(StatusCodes.CONFLICT, "user with this email already exists")
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000);
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const createdUser = await db.users.create({
        data: {
            username: data.username,
            email: data.email,
            password: hashedPassword,
            role: data.role as enum_users_role,
            verificationToken,
            verificationTokenExpires
        },
        select: {
            user_id: true,
            username: true,
            email: true,
            role: true, 
            isVerified: true
        },
    })

    const verifyLink = `${process.env.VERIFY_LINK}?token=${verificationToken}`;
    await emailSender(registrationEmailTemplate(data.username, verifyLink), "verify your email", data.email)

    return createdUser;
}

export const login = async(data:LoginInput) =>{
    const user = await db.users.findUnique({
        where: { email: data.email}
    });

    if(!user){
        throw new ApiError(StatusCodes.NOT_FOUND, "user with this email doesn't exists")
    }
    if(!user.isVerified){
        throw new ApiError(StatusCodes.FORBIDDEN, "user not verified")
    }
    const isPasswordCorrect = await bcrypt.compare(data.password, user.password);

    if(!isPasswordCorrect){
        throw new ApiError(StatusCodes.BAD_REQUEST, "email or password didn't match")
    }

    const payload = { id: user.user_id, role: user.role}
    const options: SignOptions = {expiresIn: process.env.JWT_EXPIRES_IN as string || "7d" as any}
    const token = jwt.sign(payload, process.env.JWT_SECRET!, options )

    return token;
}

export const updatedUser = async(userID: number, updateData: UpdateInput) =>{
    const user = await db.users.findUnique({
        where:{ user_id: userID }
    })

    if(!user){
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }
    const updateUser = await db.users.update({
        where:{user_id: userID},
        data: updateData,
        select: {
            user_id: true,
            username: true,
            email: true,
            role: true, 
            isVerified: true
        },
    })
    return updateUser;
}

export const fetchUserByID = async(userID: number) =>{
    const user = await db.users.findUnique({
        where: { user_id: userID },
        select: {
            user_id: true,
            username: true,
            email: true,
            role: true, 
            isVerified: true
        },
    });
    if(!user){
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found")
    }
    return user
}