import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/database.js"; // Note the .js extension

const HallModel = sequelize.define(
  "hallModel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    total_rows: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    total_columns: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    basePrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    vipPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "CinemaHalls",
    timestamps: true,
  },
);

export default HallModel;
