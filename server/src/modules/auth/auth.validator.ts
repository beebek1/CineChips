import { z } from "zod";

export const authRegisterSchema = z.object({
    body: z.object({

        username: z.string()
            .min(3, "Username is too short")
            .max(20, "Username is too long"),

        email: z.email({message: "invalid email format"}),

        role : z.enum(["user", "org"]),

        password: z.string()
            .min(8, "Password too short")
            .max(30, "Password too long")
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

export const authUpdateUserSchema = z.object({
    body: z.object({
        email: z.email({message: "invalid email format"}),
        username: z.string()
            .min(3, "username is too short")
            .max(20, "username is too long")
    })
})

export const deleteBookingSchema = z.object({
  params: z.object({
    bookingID: z.string(), // matches your Prisma string ID
  }),
});



export type RegisterInput = z.infer<typeof authRegisterSchema > ["body"];
export type LoginInput = z.infer<typeof authLoginSchema > ["body"];
export type UpdateInput = z.infer<typeof authUpdateUserSchema > ["body"];



