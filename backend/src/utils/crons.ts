import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { deleteShowtime } from "../modules/showtime/showtime.services.js";
import db from "../config/db.js";

export const startShowtimeCleanupCron = (): void => {
  cron.schedule("*/10 * * * *", async () => {
    console.log("Checking for expired showtimes...");

    try {
      const now = new Date();

      const expiredShowtimes = await db.showtimes.findMany({
        where: {
          show_date: {
            lt: now,
          },
        },
        select: {
          showtime_id: true,
        },
      });

      if (expiredShowtimes.length === 0) {
        console.log("No expired showtimes found.");
        return;
      }

      console.log(
        `Found ${expiredShowtimes.length} expired showtimes. Deleting...`,
      );

      await Promise.all(
        expiredShowtimes.map((show) =>
          deleteShowtime(show.showtime_id),
        ),
      );

      console.log("Cleanup complete.");
    } catch (error: unknown) {
      console.error("Error during showtime cleanup cron:", error);
    }
  });
};
