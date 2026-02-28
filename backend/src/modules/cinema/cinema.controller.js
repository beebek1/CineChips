import { sequelize } from "../../db/database.js";
import { HallModel, SeatModel, ShowTime, Movie } from "../associations.js";

export const addHall = async (req, res) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const {
      name,
      location,
      rowCount, // matches frontend
      colCount, // matches frontend
      basePrice,
      vipRowPrice, // matches frontend
    } = req.body;

    console.log("Data received:", req.body);

    const newHall = await HallModel.create(
      {
        name,
        location,
        total_rows: parseInt(rowCount),
        total_columns: parseInt(colCount),
        basePrice: parseFloat(basePrice),
        vipPrice: parseFloat(vipRowPrice),
      },
      { transaction },
    );

    await transaction.commit();

    return res.status(201).json({
      message: "Cinema Hall created successfully",
      hall: newHall,
    });
  } catch (error) {
    if (transaction) await transaction.rollback();

    console.error("Add Hall Error:", error);
    return res.status(500).json({
      message: "Failed to create hall",
      error: error.message,
    });
  }
};

export const updateHall = async (req, res) => {
  let transaction;
  try {
    if (!req.body) {
      console.log("not found");
    }
    console.log(req.params);
    transaction = await sequelize.transaction();
    const { id } = req.params;

    const { name, location, rowCount, colCount, basePrice, vipRowPrice } =
      req.body;

    const hall = await HallModel.findByPk(id);
    if (!hall) {
      await transaction.rollback();
      return res.status(404).json({ message: "Cinema Hall not found" });
    }

    await hall.update(
      {
        name: name || hall.name,
        location: location || hall.location,
        total_rows: rowCount ? parseInt(rowCount) : hall.total_rows,
        total_columns: colCount ? parseInt(colCount) : hall.total_columns,
        basePrice: basePrice ? parseFloat(basePrice) : hall.basePrice,
        vipPrice: vipRowPrice ? parseFloat(vipRowPrice) : hall.vipPrice,
      },
      { transaction },
    );

    await transaction.commit();
    return res.status(200).json({ message: "Hall updated successfully", hall });
  } catch (error) {
    if (transaction) await transaction.rollback();
    return res
      .status(500)
      .json({ message: "Update failed", error: error.message });
  }
};

export const deleteHall = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;

    console.log(id);
    const hall = await HallModel.findByPk(id);
    if (!hall) {
      await transaction.rollback();
      return res.status(404).json({ message: "Hall not found" });
    }

    await hall.destroy({ transaction });

    await transaction.commit();
    return res
      .status(200)
      .json({ message: "Hall permanently removed from archive" });
  } catch (error) {
    if (transaction) await transaction.rollback();
    return res
      .status(500)
      .json({ message: "Delete failed", error: error.message });
  }
};

export const getAllHalls = async (req, res) => {
  try {
    const halls = await HallModel.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      halls,
    });
  } catch (error) {
    console.error("Get All Halls Error:", error);
    return res.status(500).json({
      message: "Failed to fetch halls",
      error: error.message,
    });
  }
};

// 3. Add Showtime
export const addShowTime = async (req, res) => {
  try {
    const { movie_id, hall_id, show_date, show_time, language, price } =
      req.body;

    console.log(req.body);
    const movie = await Movie.findOne({
      where: { id: movie_id },
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const newShowTime = await ShowTime.create({
      movie_id,
      hall_id,
      show_date,
      show_time,
      price,
      language,
    });

    return res
      .status(201)
      .json({ message: "Showtime scheduled", showtime: newShowTime });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getShowTimes = async (req, res) => {
  try {
    const showtimes = await ShowTime.findAll({
      // include allows you to get the full Movie and Hall objects
      include: [
        {
          model: Movie,
        },
        {
          model: HallModel,
        },
      ],
      // We sort by date first, then by time
      order: [
        ["show_date", "ASC"],
        ["show_time", "ASC"],
      ],
    });

    // If no showtimes, return empty array with 200 (standard REST practice)
    if (!showtimes || showtimes.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(showtimes);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching showtimes",
      error: error.message,
    });
  }
};