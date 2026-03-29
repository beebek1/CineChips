import { z } from "zod";

export const authRegisterSchema = z.object({
    body: z.object({

        username: z.string()
            .min(3, "username is too short")
            .max(20, "username is too long")
            .regex(/^[a-zA-Z0-9_]+$/, "username can only cointain letters, numbers and \"_\" "),

        email: z.email({message: "invalid email format"}),

        role : z.enum(["user", "org"]),

        password: z.string()
            .min(8, "password too short")
            .max(30, "password too long")
    }),
});

export const authLoginSchema = z.object({
    body: z.object({

        email: z.email({message: "invalid email format"}),

        password: z.string()
            .min(8, "password too short")
            .max(30, "password too long")
    }),
});

export type RegisterInput = z.infer<typeof authRegisterSchema > ["body"];
export type LoginInput = z.infer<typeof authLoginSchema > ["body"];



