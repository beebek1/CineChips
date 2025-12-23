const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/database");

const Movie = sequelize.define(
    "Movie",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true

        },

        title : {
            type: DataTypes.STRING,
            allowNull : false
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false
        },

        duration: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        genre: {
            type:DataTypes.STRING,
            allowNull : true
        },

        releaseDate: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName : "movies",
        timestamps : true
    }
);

module.exports = Movie;

