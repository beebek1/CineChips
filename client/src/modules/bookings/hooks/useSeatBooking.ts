import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  addStripeApi,
  bookSeatApi,
  getSeatsByShowtime,
} from "../booking.api";
import type {
  ActiveBooking,
  HallInfo,
  SeatRow,
  ShowtimeSeat,
} from "../booking.types";

const MAX_SEATS = 10;
const SERVICE_FEE_RATE = 0.05;

export const useSeatBooking = (booking: ActiveBooking | null) => {
  const [clientSecret, setClientSecret] = useState("");
  const [rows, setRows] = useState<SeatRow[]>([]);
  const [hall, setHall] = useState<HallInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<ShowtimeSeat[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const closePaymentModal = () => setClientSecret("");

  useEffect(() => {
    if (!booking?.showtimeId) return;

    const showtimeId = booking.showtimeId;

    const fetchSeats = async () => {
      setLoading(true);
      try {
        const res = await getSeatsByShowtime(showtimeId);
        setRows((res as any)?.data?.rows ?? []);
        setHall((res as any)?.data?.hall ?? null);
      } catch {
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [booking?.showtimeId]);

  const basePrice = Number(booking?.hall?.price ?? 0);
  const vipPrice = Number(hall?.vipPrice ?? basePrice);

  const subtotal = useMemo(
    () =>
      selectedSeats.reduce((sum, s) => {
        return sum + (s.seat_type === "vip" ? vipPrice : basePrice);
      }, 0),
    [selectedSeats, vipPrice, basePrice],
  );

  const serviceFee = Math.round(subtotal * SERVICE_FEE_RATE);
  const finalAmount = subtotal + serviceFee;

  const handleSeatClick = (
    rowIdx: number,
    seatIdx: number,
    seat: ShowtimeSeat,
  ) => {
    if (seat.status === "booked" || seat.status === "reserved") return;

    const isSelected = selectedSeats.some(
      (s) => s.showtime_seat_id === seat.showtime_seat_id,
    );
    if (!isSelected && selectedSeats.length >= MAX_SEATS) {
      alert(`Max ${MAX_SEATS} seats per booking.`);
      return;
    }

    setRows((prev) =>
      prev.map((row, rI) => {
        if (rI !== rowIdx) return row;
        return {
          ...row,
          seats: row.seats.map((s, sI) => {
            if (sI !== seatIdx) return s;
            return {
              ...s,
              status: s.status === "available" ? "selected" : "available",
            };
          }),
        };
      }),
    );

    setSelectedSeats((prev) =>
      isSelected
        ? prev.filter((s) => s.showtime_seat_id !== seat.showtime_seat_id)
        : [...prev, seat],
    );
  };

  const cancelSelection = () => {
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        seats: row.seats.map((s) =>
          s.status === "selected" ? { ...s, status: "available" } : s,
        ),
      })),
    );
    setSelectedSeats([]);
  };

  const handlePayClick = async () => {
    setConfirming(true);
    try {
      const response = await addStripeApi({ finalAmount });
      setClientSecret((response as any).data.clientSecret);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          err.message ||
          "Payment failed to initialize.",
      );
    } finally {
      setConfirming(false);
    }
  };

  const confirmBooking = async () => {
    setTimeout(() => setClientSecret(""), 1000);
    setConfirming(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user?.id ?? null;
      if (!userId) {
        toast.error("You must be logged in to book seats.");
        return;
      }

      await Promise.all(
        selectedSeats.map((s) =>
          bookSeatApi({
            showtimeId: s.showtime_seat_id,
            seatIds: userId,
          }),
        ),
      );

      const newBookingId = "CHIP-" + Date.now().toString().slice(-8);
      setBookingId(newBookingId);
      setBookingComplete(true);

      setRows((prev) =>
        prev.map((row) => ({
          ...row,
          seats: row.seats.map((s) =>
            s.status === "selected" ? { ...s, status: "booked" } : s,
          ),
        })),
      );
    } catch (err: any) {
      alert(
        err?.response?.data?.message ?? "Booking failed. Please try again.",
      );
    } finally {
      setConfirming(false);
    }
  };

  return {
    MAX_SEATS,
    clientSecret,
    rows,
    hall,
    loading,
    selectedSeats,
    confirming,
    bookingComplete,
    bookingId,
    basePrice,
    vipPrice,
    serviceFee,
    finalAmount,
    handleSeatClick,
    cancelSelection,
    handlePayClick,
    confirmBooking,
    closePaymentModal
  };
};
