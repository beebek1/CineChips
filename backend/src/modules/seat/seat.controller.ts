// import {
//   SeatModel,
//   ShowtimeSeat,
//   HallModel,
//   ShowTime,
// } from "../associations.js";

// const rowNumToLabel = (n) => String.fromCharCode(64 + n);

// export const generateSeatsForHall = async (
//   hall_id,
//   total_rows,
//   total_columns,
//   tx
// ) => {
//   const seats = [];

//   for (let r = 1; r <= total_rows; r++) {
//     const row_label = rowNumToLabel(r);
//     const is_vip = r === total_rows; // last row is VIP

//     for (let c = 1; c <= total_columns; c++) {
//       seats.push({
//         hall_id,
//         seat_name: `${row_label}${c}`,
//         row_label,
//         col_number: c,
//         seat_type: is_vip ? "vip" : "standard",
//       });
//     }
//   }

//   await SeatModel.bulkCreate(seats);
// };

// export const generateShowtimeSeats = async (showtime_id, hall_id) => {
//   const seats = await SeatModel.findAll({ where: { hall_id } });

//   if (!seats.length) {
//     throw new Error(
//       `No seats found for hall ${hall_id}. Hall may not have been seeded.`,
//     );
//   }

//   const showtimeSeats = seats.map((seat) => ({
//     showtime_id,
//     seat_id: seat.seat_id,
//     status: "available",
//     booked_by: null,
//   }));

//   await ShowtimeSeat.bulkCreate(showtimeSeats);
// };

// export const getSeatsByShowtime = async (req, res) => {
//   try {
//     const { showtimeId } = req.params;

//     const showtime = await ShowTime.findByPk(showtimeId, {
//       include: [{ model: HallModel, as: "hallModel" }],
//     });

//     if (!showtime) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Showtime not found." });
//     }

//     const showtimeSeats = await ShowtimeSeat.findAll({
//       where: { showtime_id: showtimeId },
//       include: [
//         {
//           model: SeatModel,
//           as: "Seat",
//           attributes: [
//             "seat_id",
//             "seat_name",
//             "row_label",
//             "col_number",
//             "seat_type",
//           ],
//         },
//       ],
//       order: [
//         [{ model: SeatModel, as: "Seat" }, "row_label", "ASC"],
//         [{ model: SeatModel, as: "Seat" }, "col_number", "ASC"],
//       ],
//     });

//     // Group seats by row label for easy frontend grid rendering
//     const rowMap = {};
//     showtimeSeats.forEach((ss) => {
//       const seat = ss.Seat;
//       if (!rowMap[seat.row_label]) rowMap[seat.row_label] = [];
//       rowMap[seat.row_label].push({
//         showtime_seat_id: ss.showtime_seat_id,
//         seat_id: seat.seat_id,
//         seat_name: seat.seat_name,
//         col_number: seat.col_number,
//         seat_type: seat.seat_type,
//         status: ss.status,
//         booked_by: ss.booked_by,
//       });
//     });

//     const rows = Object.entries(rowMap).map(([row_label, seats]) => ({
//       row_label,
//       seats,
//     }));

//     return res.status(200).json({
//       success: true,
//       showtime_id: Number(showtimeId),
//       hall: showtime.hallModel,
//       rows,
//     });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };



// export const bookSeat = async (req, res) => {
//   try {
//     const { showtime_seat_id, user_id } = req.body;

//     const showtimeSeat = await ShowtimeSeat.findByPk(showtime_seat_id);
//     if (!showtimeSeat) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Seat not found." });
//     }
//     if (showtimeSeat.status !== "available") {
//       return res.status(409).json({
//         success: false,
//         message: "Seat is already booked or reserved.",
//       });
//     }

//     await showtimeSeat.update({ status: "booked", booked_by: user_id });

//     return res.status(200).json({
//       success: true,
//       message: "Seat booked successfully.",
//       showtimeSeat,
//     });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };



// export const releaseSeat = async (req, res) => {
//   try {
//     const { showtime_seat_id } = req.body;

//     const showtimeSeat = await ShowtimeSeat.findByPk(showtime_seat_id);
//     if (!showtimeSeat) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Seat not found." });
//     }

//     await showtimeSeat.update({ status: "available", booked_by: null });

//     return res.status(200).json({
//       success: true,
//       message: "Seat released successfully.",
//     });
//   } catch (err) {
//     return res.status(500).json({ success: false, message: err.message });
//   }
// };
