const{ DataTypes } = require("sequelize");
const { sequelize } = require("../../db/database");

const SeatModel = sequelize.define(
    "seat",
    {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },

        seat_code: {
        type: DataTypes.STRING,
        allowNull: false,
        },

        row: {
            type: DataTypes.STRING,
            allowNull: false
        },

        type: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Golden/Platinum/Bronze"
        }
    },
    {
        tableName: "seats",
        timestamps: true
    }
)

module.exports = SeatModel;