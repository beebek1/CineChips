import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/database.js"; // Added .js extension

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    status: {
      type: DataTypes.ENUM("available", "booked", "inoperative"),
      defaultValue: "available",
      allowNull: false,
    },
  },
  {
    tableName: "bookings",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["showtime_id", "seat_id"],
      },
    ],
  },
);

export default Booking;
