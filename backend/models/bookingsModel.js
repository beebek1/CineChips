const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/database");

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    status: {
      type: DataTypes.ENUM('available', 'booked', 'inoperative'),
      defaultValue : "available",
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "bookings",
    timestamps: true,
  },
);

module.exports = Booking;
