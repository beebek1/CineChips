import { sequelize } from "../../db/database.js";
import { HallModel, SeatModel, ShowTime, Movie } from "../associations.js";
import {
  generateSeatsForHall,
  generateShowtimeSeats,
} from "./seat.controller.js";

export const addHall = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();

    const { name, location, rowCount, colCount, basePrice, vipRowPrice } =
      req.body;

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

    await generateSeatsForHall(
      newHall.hall_id,
      newHall.total_rows,
      newHall.total_columns,
    );

    return res.status(201).json({
      message: "Cinema Hall created successfully",
      hall: newHall,
    });
  } catch (error) {
    if (transaction && !transaction.finished) await transaction.rollback();
    console.error("Add Hall Error:", error);
    return res
      .status(500)
      .json({ message: "Failed to create hall", error: error.message });
  }
};

export const updateHall = async (req, res) => {
  let transaction;
  try {
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
    if (transaction && !transaction.finished) await transaction.rollback();
    return res
      .status(500)
      .json({ message: "Update failed", error: error.message });
  }
};

export const deleteHall = async (req, res) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const { id } = req.params;

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
    if (transaction && !transaction.finished) await transaction.rollback();
    return res
      .status(500)
      .json({ message: "Delete failed", error: error.message });
  }
};

export const getAllHalls = async (req, res) => {
  try {
    const halls = await HallModel.findAll({ order: [["createdAt", "DESC"]] });
    return res.status(200).json({ success: true, halls });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch halls", error: error.message });
  }
};
