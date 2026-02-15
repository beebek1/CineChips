import User from "./auth/auth.model.js";
import Movie from "./movie/movie.model.js";
import HallModel from "./cinema/models/halls.model.js";
import SeatModel from "./cinema/models/seats.model.js";
import ShowTime from "./cinema/models/showtimes.model.js";
import Booking from "./cinema/models/bookings.model.js";
import { sequelize } from "../db/database.js";

// Movie <-> ShowTime
Movie.hasMany(ShowTime, { foreignKey: "movie_id", onDelete: "CASCADE" });
ShowTime.belongsTo(Movie, { foreignKey: "movie_id" });

// Hall <-> ShowTime
HallModel.hasMany(ShowTime, { foreignKey: "hall_id", onDelete: "CASCADE" });
ShowTime.belongsTo(HallModel, { foreignKey: "hall_id" });

// Hall <-> Seat
HallModel.hasMany(SeatModel, { foreignKey: "hall_id", onDelete: "CASCADE" });
SeatModel.belongsTo(HallModel, { foreignKey: "hall_id" });

// ShowTime <-> Booking
ShowTime.hasMany(Booking, { foreignKey: "showtime_id", onDelete: "CASCADE" });
Booking.belongsTo(ShowTime, { foreignKey: "showtime_id" });

// Seat <-> Booking
SeatModel.hasMany(Booking, { foreignKey: "seat_id", onDelete: "CASCADE" });
Booking.belongsTo(SeatModel, { foreignKey: "seat_id" });

// User <-> Booking
User.hasMany(Booking, { foreignKey: "user_id", onDelete: "CASCADE" });
Booking.belongsTo(User, { foreignKey: "user_id" });

// 3. Centralized Export
export {
  User,
  Movie,
  HallModel,
  SeatModel,
  ShowTime,
  Booking,
  sequelize, 
};
