import { DataTypes } from "sequelize";
import { sequelize } from "../../db/database.js"; // Ensure the .js extension is present

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    trailerLink: {
      type: DataTypes.STRING,
      allowNull: true
    },

    coverPic: {
      type: DataTypes.STRING,
      allowNull: true
    },

    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "movies",
    timestamps: true,
  },
);

export default Movie;
