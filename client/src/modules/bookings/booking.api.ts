import apiClient from "../../shared/services/apiClient";
import type {
  DateSchedule,
  SeatRow,
  BookingTicket,
  MovieLite,
} from "./booking.types";

export const getShowTimes = () =>
  apiClient.get<DateSchedule[]>("api/cinema/get-showtime");

export const getSeatsByShowtime = (showtimeId: string | number) =>
  apiClient.get<SeatRow[]>(`api/cinema/seats/showtime/${showtimeId}`);

export const bookSeatApi = (data: {
  showtimeId: string | number;
  seatIds: (string | number)[];
}) => apiClient.patch<void>("api/cinema/seats/book", data);

export const addStripeApi = (data: any) =>
  apiClient.post("/api/payment/stripe", data);

export const getBookingApi = (id: string | number) =>
  apiClient.get<BookingTicket>(`api/booking/get/${id}`);

export const addBookingApi = (data: any) =>
  apiClient.post<{ id: string }>("api/booking/add", data);

export const getAllMoviesApi = () =>
  apiClient.get<MovieLite[]>("api/movie/getall");

export const deleteBookingApi = (editingId: string | number) =>
  apiClient.delete<void>(`api/booking/delete/${editingId}`);

export const releaseSeatApi = (data: {
  showtimeId: string | number;
  seatIds: (string | number)[];
}) => apiClient.patch<void>("api/cinema/seats/release", data);
