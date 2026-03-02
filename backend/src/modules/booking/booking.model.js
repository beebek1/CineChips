import { DataTypes } from "sequelize";
import { sequelize } from "../../db/database.js";

const Booking = sequelize.define(
  "Booking",
  {
    booking_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    movie_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    hall_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    show_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    show_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    booked_seats: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Comma-separated list of seat labels",
    },

    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("expired", "unchecked", "checked"),
      defaultValue: "unchecked",
      allowNull: false,
    },
  },
  {
    tableName: "bookings",
    timestamps: true,
  },
);

export default Booking;
