import z, { nonnegative } from "zod";

export const movieSchema = z.object({
    body: z.object({
        title: z.string()
            .min(3, "Movie title should atleast 3 letters")
            .max(10, "Movie title should have maximum 10 letters")
            .regex(/^[a-zA-Z0-9_]+$/, "Movie title can only cointain letters, numbers and \"_\" "),

        description: z.string()
            .min(5, "Movie description should atleast 5 letters")
            .max(50, "Movie description should have maximum 50 letters")
            .regex(/^[a-zA-Z0-9_]+$/, "Movie description can only cointain letters, numbers and \"_\" "),

        duration: z.string()
            .nonempty(),
        genre: z.string()
            .nonempty(),
        releaseDate: z.string()
            .nonempty(),
        trailerLink: z.string()
            .nonempty(),
        status: z.enum(["Showing", "Upcoming"])
    })
})

export type MovieInput = z.infer<typeof movieSchema> ["body"]