import crypto from "crypto";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { enum_users_role } from "@prisma/client";

import db from "../../db/db.js";
import { ApiError } from "../../utils/apiError.js";
import type { LoginInput, RegisterInput } from "./auth.validator.js";


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

    return await db.users.create({
        data: {
            username: data.username,
            email: data.email,
            password: hashedPassword,
            role: data.role as enum_users_role,
            verificationToken,
            verificationTokenExpires
        }
    })
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
        return 
    }


}