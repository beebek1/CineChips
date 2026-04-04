import cron from "node-cron";
import { ShowTime } from "../modules/associations.js";
import { Op } from "sequelize";
import { internalDeleteShowtime } from "../modules/cinema/cinema.controller.js";

// Run every 30 minutes
cron.schedule("*/10 * * * * ", async () => {
  console.log("Checking for expired showtimes...");

  const now = new Date();
  const currentDate = now.toISOString().split("T")[0];
  const currentTime = now.toTimeString().split(" ")[0];

  try {
    // Find showtimes that have already passed
    const expiredShows = await ShowTime.findAll({
      where: {
        [Op.or]: [
          { show_date: { [Op.lt]: currentDate } },
          {
            [Op.and]: [
              { show_date: currentDate },
              { show_time: { [Op.lt]: currentTime } },
            ],
          },
        ],
      },
    });

    if (expiredShows.length > 0) {
      console.log(
        `Found ${expiredShows.length} expired showtimes. Deleting...`,
      );

      await Promise.all(
        expiredShows.map((show) => internalDeleteShowtime(show.id)),
      );

      console.log("Cleanup complete.");
    } else {
      console.log("No expired showtimes found.");
    }
  } catch (error) {
    console.error("Error during showtime cleanup cron:", error);
  }
});
