import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/database.js";

const Seat = sequelize.define(
  "Seat",
  {
    seat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    seat_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    row_label: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    col_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    seat_type: {
      type: DataTypes.ENUM("standard", "vip"),
      defaultValue: "standard",
    },
  },
  {
    tableName: "Seats",
    timestamps: true,
  },
);

export default Seat;
