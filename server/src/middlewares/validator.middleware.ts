import { z, ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validator =
  (schema: z.ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Map the errors to get a clean string: "title: required, genre: too short"
        const errorMessages = error.issues
          .map((err) => {
            const field = String(err.path[1] || err.path[0]);
            return `${field}: ${err.message}`;
          })
          .join(", ");

        return res.status(400).json({
          success: false,
          message: errorMessages, // Now the specific errors are in the message string
          errors: error.issues.map((err) => ({
            path: err.path[1] || err.path[0],
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
