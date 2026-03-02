import { Booking, ShowTime, Movie, SeatModel } from "../associations.js"; // Adjust the path to your model

// ── CREATE NEW BOOKING ──────────────────────────────────────────────────────
export const addBooking = async (req, res) => {
  try {
    const {
      movie_name,
      hall_name,
      show_time,
      show_date,
      booked_seats,
      total_price,
      showtime_id,
    } = req.body;

    // const { userId } = req.user.id;

    const generatedId = "CHIP-" + Date.now().toString().slice(-6)

    const existing = await Booking.findByPk(generatedId);

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Booking ID already exists.",
      });
    }

    // 2. Create the record
    const newBooking = await Booking.create({
      user_id: 1,
      showtime_id,
      booking_id : generatedId,
      movie_name,
      hall_name,
      show_time,
      show_date,
      booked_seats, // Expecting a string like "A1, A2"
      total_price,
      status: "unchecked", // Default starting status
    });

    return res.status(201).json({
      success: true,
      message: "Booking Done",
      data: newBooking,
    });
  } catch (error) {
    console.error("Add Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while creating booking.",
    });
  }
};

// ── DELETE BOOKING ──────────────────────────────────────────────────────────
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params; // or req.body.booking_id depending on your route

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    await booking.destroy();

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while deleting booking.",
    });
  }
};

// ── GET ALL BOOKINGS (Optional but helpful) ─────────────────────────────────
export const getBookingsByUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || id === "undefined") {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const bookings = await Booking.findAll({
      where: { user_id: id },
      include: [
        {
          model: ShowTime,
          attributes: ["language"],
          include: [
            {
              model: Movie,
              attributes: ["coverPic"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ success: true, bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
