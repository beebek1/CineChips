import z from "zod";

export const addBookingSchema = z.object({
    body: z.object({
        movie_name: z.string().nonempty("Movie_name is required"),
        hall_name: z.string()
            .nonempty("Hall name is required")
            .regex(/^[a-zA-Z0-9_]+$/, "Username can only cointain letters, numbers and \"_\" "),
        show_time: z.string().nonempty("Showtime is required"),
        show_date: z.coerce.date(),
        booked_seats: z.string().nonempty("No seats booked"),
        total_price: z.number().int(),
        showtime_id: z.number().int()
    }),
});

export const deleteBookingSchema = z.object({
  params: z.object({
    bookingID: z.string(), // matches your Prisma string ID
  }),
});


export type addBookingInput = z.infer<typeof addBookingSchema> ["body"];
export type deleteBookingInput = z.infer<typeof deleteBookingSchema> ["params"];