import { sequelize } from "../../db/database.js";
import { HallModel, SeatModel, ShowTime, Movie } from "../associations.js";

// 2. Add Hall and Auto-generate Seats
export const addHall = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, location, total_seats, layout_config } = req.body;

    const newHall = await HallModel.create(
      {
        name,
        location,
        total_seats,
        layout_config,
      },
      { transaction },
    );

    // Logic to generate physical seats automatically
    const seatsToCreate = [];
    layout_config.rows.forEach((rowLabel) => {
      const seatsInThisRow = total_seats / layout_config.rows.length;
      for (let i = 1; i <= seatsInThisRow; i++) {
        seatsToCreate.push({
          seat_code: `${rowLabel}${i}`,
          row: rowLabel,
          hall_id: newHall.id,
          type: "Standard",
        });
      }
    });

    await SeatModel.bulkCreate(seatsToCreate, { transaction });
    await transaction.commit();

    return res
      .status(201)
      .json({ message: "Hall and Seats generated", hall: newHall });
  } catch (error) {
    await transaction.rollback();
    return res
      .status(500)
      .json({ message: "Failed to create hall", error: error.message });
  }
};

// 3. Add Showtime
export const addShowTime = async (req, res) => {
  try {
    const { movieName, theaterId, date, startTime, price } = req.body;

    const movie = await Movie.findOne({
      where: { title: movieName.toLowerCase() },
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const newShowTime = await ShowTime.create({
      movie_id: movie.id,
      hall_id: theaterId,
      start_time: `${date} ${startTime}`,
      price: price || 500,
    });

    return res
      .status(201)
      .json({ message: "Showtime scheduled", showtime: newShowTime });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};
