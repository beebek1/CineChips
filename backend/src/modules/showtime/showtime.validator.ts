import z from "zod";

export const showtimeSchema = z.object({
  body: z.object({
    movie_id: z.number().int().positive(),

    hall_id: z.number().int().positive(),

    show_date: z.string().nonempty(),
    show_time: z.string().nonempty(),
    language: z.string().nonempty(),
    price: z.number().int().positive(),
  }),
});

export type ShowtimeInput = z.infer<typeof showtimeSchema>["body"];
