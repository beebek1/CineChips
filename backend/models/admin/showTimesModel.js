const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/database");

const ShowTime = sequelize.define(
  "showTime",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "showtimes",
    timestamps: true,
  },
);

module.exports = ShowTime;
