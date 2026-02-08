const{ DataTypes } = require("sequelize");
const { sequelize} = require('../../db/database');

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

    total_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    layout_config: {
        type: DataTypes.JSON,
        allowNull: false
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "CinemaHalls",
    timestamps: true,
  },
);

module.exports = HallModel;