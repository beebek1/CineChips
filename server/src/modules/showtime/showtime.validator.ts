import z from "zod";

export const showtimeSchema = z.object({
  body: z.object({
    movie_id: z.string().nonempty(),

    hall_id: z.string().nonempty(),

    show_date: z.string().nonempty(),
    show_time: z.string().nonempty(),
    language: z.string().nonempty(),
    price: z.string().nonempty(),
  }),
});

export type ShowtimeInput = z.infer<typeof showtimeSchema>["body"];
