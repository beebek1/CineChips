export type Slot = {
  time: string;
  showtimeId: string | number;
};

export type Showing = {
  language: string;
  slots: Slot[];
};

export type HallSchedule = {
  hallId: string | number;
  name: string;
  location: string;
  price: number;
  showings: Showing[];
};

export type DateSchedule = {
  fullDate: string;
  halls: HallSchedule[];
};

export type MovieLite = {
  movie_id: string | number;
  title: string;
  genre: string;
  duration: number | string;
  description: string;
  coverPic?: string;
};

export type ActiveBooking = {
  movieId: string | number;
  movieTitle: string;
  genre: string;
  schedule: DateSchedule;
  hall: HallSchedule ;
  showing: Showing ;
  slot: Slot ;
  showtimeId: string | number;
};

export type ShowtimeSeat = {
  showtime_seat_id: string | number;
  seat_name: string;
  seat_type: "vip" | "standard" | string;
  status: "available" | "selected" | "booked" | "reserved" | string;
};

export type SeatRow = {
  row_label: string;
  seats: ShowtimeSeat[];
};

export type HallInfo = {
  vipPrice?: number;
};

export type BookingTicket = {
  id: string;
  title: string;
  date: string;
  time: string;
  theater: string;
  seats: string;
  show_date: string;
  show_time: string;
  totalPrice: number;
  language: string;
  image: string;
};

export type BookingSummary = {
  booking_id: string;
  movie_name: string;
  hall_name?: string;
  show_time: string;
  show_date: string;
  booked_seats: string;
  total_price: number;
  showtime_id: string | number;
};
