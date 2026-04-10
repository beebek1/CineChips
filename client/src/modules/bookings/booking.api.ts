import apiClient from "../../shared/services/apiClient";
import type {
  DateSchedule,
  SeatRow,
  BookingTicket,
  MovieLite,
  BookingSummary,
} from "./booking.types";

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const getShowTimes = () => apiClient.get<DateSchedule[]>("api/showtime");

// FIXED: Defining the structure so res.data.data works correctly
export const getSeatsByShowtime = (showtimeId: string | number) =>
  apiClient.get<ApiResponse<{ rows: SeatRow[]; hall: { vipPrice?: number } }>>(
    `api/seat/${showtimeId}`,
  );

export const bookSeatApi = (data: {
  showtimeSeatId: string | number;
  seatIds: (string | number)[];
}) => apiClient.patch<ApiResponse<null>>("api/seat/book", data);

export const releaseSeatApi = (data: {
  showtimeId: string | number;
  seatIds: (string | number)[];
}) => apiClient.patch<ApiResponse<null>>("api/seat/release", data);


export const addStripeApi = (data: { finalAmount: number }) =>
  apiClient.post<{ clientSecret: string }>("/api/payment", data);

export const getBookingApi = () =>
  apiClient.get<BookingTicket>(`api/booking`);

export const addBookingApi = (data: BookingSummary) =>
  apiClient.post<ApiResponse<null>>("api/booking", data);

export const deleteBookingApi = (editingId: string | number) =>
  apiClient.delete<ApiResponse<null>>(`api/booking/${editingId}`);

export const getAllMoviesApi = () => apiClient.get<MovieLite[]>("api/movies");
