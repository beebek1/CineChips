import z, { nonnegative } from "zod";

export const movieSchema = z.object({
    body: z.object({
        title: z.string()
            .min(3, "Movie title should atleast 3 letters")
            .nonempty()
            .max(10, "Movie title should have maximum 10 letters"),

        description: z.string()
            .min(5, "Movie description should atleast 5 letters")
            .nonempty()
            .max(50, "Movie description should have maximum 50 letters"),

        duration: z.string()
            .nonempty(),
        genre: z.string()
            .nonempty(),
        releaseDate: z.string()
            .nonempty(),
        trailerLink: z.string()
            .nonempty(),
        status: z.enum(["Showing", "Upcoming"]),

        featured: z.string().optional().default("false")
    })
})

export type MovieInput = z.infer<typeof movieSchema>["body"]