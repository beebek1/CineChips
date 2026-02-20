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

export default ShowTime;
