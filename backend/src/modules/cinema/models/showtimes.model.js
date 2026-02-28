import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/database.js"; // Note the .js extension

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

    show_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    show_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "showtimes",
    timestamps: true,
  },
);

export default ShowTime;
