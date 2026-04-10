import { useEffect, useState } from "react";
import { getBookingApi } from "../booking.api";
import type { BookingTicket } from "../booking.types";

export const useMyBookings = () => {
  const [selectedTicket, setSelectedTicket] = useState<BookingTicket | null>(
    null,
  );
  const [bookings, setBookings] = useState<BookingTicket[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getBookingApi();
        if ((res as any)?.data?.data) {
          const mapped = (res as any).data.data.map((b: any) => ({
            id: b.booking_id,
            title: b.movie_name,
            date: new Date(b.show_date)
              .toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              .toUpperCase(),
            time: b.show_time,
            theater: b.hall_name,
            seats: b.booked_seats,
            show_date: b.show_date,
            show_time: b.show_time,
            totalPrice: b.total_price,
            language: b.showtimes?.language || "—",
            image: b.showtimes?.movies?.coverPic
              ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${
                  b.showtimes.movies.coverPic
                }`
              : `https://picsum.photos/400/600?random=${Math.abs(
                  Number(String(b.booking_id).replace(/\D/g, "")) % 100,
                )}`,
          }));
          setBookings(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchBookings();
    const timer = setInterval(() => {}, 60000);
    return () => clearInterval(timer);
  }, []);

  return { selectedTicket, setSelectedTicket, bookings };
};
