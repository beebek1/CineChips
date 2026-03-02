import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/database.js";

const ShowtimeSeat = sequelize.define(
  "ShowtimeSeat",
  {
    showtime_seat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("available", "booked", "reserved"),
      defaultValue: "available",
    },
    booked_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "ShowtimeSeats",
    timestamps: true,
    indexes: [{ unique: true, fields: ["showtime_id", "seat_id"] }],
  },
);

export default ShowtimeSeat;
