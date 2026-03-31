
export const addShowTime = async (req, res) => {
  try {
    const { movie_id, hall_id, show_date, show_time, language, price } =
      req.body;

    const movie = await Movie.findByPk(movie_id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Create showtime first
    const newShowTime = await ShowTime.create({
      movie_id,
      hall_id,
      show_date,
      show_time,
      price,
      language,
    });

    // Then generate showtime seats — newShowTime is committed so FK is safe
    await generateShowtimeSeats(newShowTime.showtime_id, newShowTime.hall_id);

    return res
      .status(201)
      .json({ message: "Showtime scheduled", showtime: newShowTime });
  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
};

export const getShowTimes = async (req, res) => {
  try {
    const showtimes = await ShowTime.findAll({
      include: [{ model: Movie }, { model: HallModel }],
      order: [
        ["show_date", "ASC"],
        ["show_time", "ASC"],
      ],
    });

    return res.status(200).json(showtimes.length ? showtimes : []);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching showtimes", error: error.message });
  }
};

export const deleteShowTime = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ShowTime.destroy({
      where: { showtime_id: id },
    });

    if (deleted) {
      return res.status(200).json({ message: "Showtime deleted successfully" });
    }

    return res.status(404).json({ message: "Showtime not found" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting showtime",
      error: error.message,
    });
  }
};


export const internalDeleteShowtime = async (showtimeId) => {
  try {
    const result = await ShowTime.destroy({
      where: { showtime_id: showtimeId },
    });
    return result;
  } catch (error) {
    throw new Error(
      `Failed to delete showtime ${showtimeId}: ${error.message}`,
    );
  }
};

































// import { Router } from "express";
// import {
//   addHall,
//   addShowTime,
//   deleteHall,
//   deleteShowTime,
//   getAllHalls,
//   getShowTimes,
//   updateHall,
// } from "./cinema.controller.js";

// import {
//   getSeatsByShowtime,
//   bookSeat,
//   releaseSeat,
// } from "./seat.controller.js";

// const router = Router();

// // Hall Routes
// router.post("/add", addHall);
// router.put("/update/:id", updateHall);
// router.get("/get-all", getAllHalls);
// router.delete("/delete/:id", deleteHall);

// // Showtime Routes
// router.post("/showtimes", addShowTime);
// router.get("/get-showtime", getShowTimes);
// router.delete("/showtime/delete/:id", deleteShowTime);

// // Seat Routes
// router.get("/seats/showtime/:showtimeId", getSeatsByShowtime);
// router.patch("/seats/book", bookSeat);
// router.patch("/seats/release", releaseSeat);

// export default router;
