import z from "zod";

export const SeatSchema = z.object({
  body: z.object({
    seatIds: z
      .array(z.number().int())
      .nonempty("You must select at least one seat."),
    showtimeSeatId: z.number().int(),
  }),
});

export type SeatInput = z.infer<typeof SeatSchema> ["body"]