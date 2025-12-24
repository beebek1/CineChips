const {DataTypes} = require("sequelize");
const {sequelize} = require("../db/database");
const Movie = require("./movieModel");

const ShowTime = sequelize.define(
    "ShowTime",
    {
        movieId: {
            type: DataTypes.INTEGER,
            references:{
                model: Movie,
                key: "id",
            },
            onDelete: "CASCADE",
            allowNull: false
        },

        theaterId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        date: {
            type: DataTypes.DATE,
            allowNull: false
        },

        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },

        endTime: {
            type: DataTypes.TIME,
            allowNull: false
        }
    },
    {
        tableName: "MovieShowTime",
        timestamps: true,
    }
);

Movie.hasMany(ShowTime, { foreignKey: "movieId", onDelete: "CASCADE" });
ShowTime.belongsTo(Movie, { foreignKey: "movieId" });

module.exports = ShowTime;