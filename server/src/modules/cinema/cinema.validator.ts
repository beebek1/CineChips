import z from "zod";

export const HallSchema = z.object({
    body: z.object({
        name: z.string()
            .min(3, "Hall name should have minimum 3 letters")
            .max(10, "Hall name should have maximum 10 letters")
            .nonempty()
            .regex(/^[a-zA-Z0-9_]+$/, "Location can only cointain letters, numbers and \"_\" "),
        location: z.string()
            .min(5, "Location name should have minimum 5 letters")
            .max(30, "Location name should have maximum 30 letters")
            .nonempty()
            .regex(/^[a-zA-Z0-9_]+$/, "Location can only cointain letters, numbers and \"_\" "),
        rowCount: z.number()
            .int(),
        colCount: z.number()
            .int(),
        basePrice: z.number()
            .int(),
        vipPrice: z.number()
            .int()          
    })
})

export type HallInput = z.infer<typeof HallSchema> ["body"]