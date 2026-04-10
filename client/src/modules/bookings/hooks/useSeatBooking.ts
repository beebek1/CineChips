import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { addStripeApi, bookSeatApi, getSeatsByShowtime } from "../booking.api";
import getUserInfo from "../../../app/guards/authRole";
import type {
  ActiveBooking,
  HallInfo,
  SeatRow,
  ShowtimeSeat,
} from "../booking.types";
import { useNavigate } from "react-router-dom";

const MAX_SEATS = 10;
const SERVICE_FEE_RATE = 0.05;

export const useSeatBooking = (booking: ActiveBooking | null) => {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const [rows, setRows] = useState<SeatRow[]>([]);
  const [hall, setHall] = useState<HallInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState<ShowtimeSeat[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const closePaymentModal = () => setClientSecret("");

  // Fetch seats on mount or showtime change
  useEffect(() => {
    const showtimeId = booking?.showtimeId;
    if (!showtimeId) return;

    const fetchSeats = async () => {
      setLoading(true);
      try {
        const res = await getSeatsByShowtime(showtimeId);
        const data = res.data?.data;
        setRows(data?.rows ?? []);
        setHall(data?.hall ?? null);
      } catch (err) {
        toast.error("Failed to load seating arrangement.");
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, [booking?.showtimeId]);

  // Pricing Logic
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

  // UI Interaction: Toggle Seats
  const handleSeatClick = (
    rowIdx: number,
    seatIdx: number,
    seat: ShowtimeSeat,
  ) => {
    if (["booked", "reserved"].includes(seat.status)) return;

    const isSelected = selectedSeats.some(
      (s) => s.showtime_seat_id === seat.showtime_seat_id,
    );

    if (!isSelected && selectedSeats.length >= MAX_SEATS) {
      toast.error(`You can only select up to ${MAX_SEATS} seats.`);
      return;
    }

    // Update Grid UI
    setRows((prev) =>
      prev.map((row, rI) =>
        rI !== rowIdx
          ? row
          : {
              ...row,
              seats: row.seats.map((s, sI) =>
                sI !== seatIdx
                  ? s
                  : {
                      ...s,
                      status:
                        s.status === "available" ? "selected" : "available",
                    },
              ),
            },
      ),
    );

    // Update Selection List
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

  // Payment Initialization
  const handlePayClick = async () => {
    if (selectedSeats.length === 0) return;
    const userInfo = await getUserInfo();

    if(!userInfo?.role){
      navigate("/login");
      return
    }

    setConfirming(true);
    try {
      const response = await addStripeApi({ finalAmount });
      setClientSecret(response.data.clientSecret);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Payment initialization failed.",
      );
    } finally {
      setConfirming(false);
    }
  };


  const confirmBooking = async () => {
    const user = getUserInfo(); 
    if (!user || !booking?.showtimeId) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    setClientSecret(""); 
    setConfirming(true);

    try {
      await bookSeatApi({
        showtimeSeatId: Number(booking.showtimeId),
        seatIds: selectedSeats.map((s) => Number(s.showtime_seat_id)),
      });

      const newBookingId = "CHIP-" + Date.now().toString().slice(-8);
      setBookingId(newBookingId);
      setBookingComplete(true);
      toast.success("Seats secured!");

      // Mark selected seats as booked in the UI
      setRows((prev) =>
        prev.map((row) => ({
          ...row,
          seats: row.seats.map((s) =>
            s.status === "selected" ? { ...s, status: "booked" } : s,
          ),
        })),
      );
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Booking failed.";
      toast.error(msg);
      console.error("Booking Error:", err);
    } finally {
      setConfirming(false);
    }
  };

  return {
    clientSecret,
    MAX_SEATS,
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
    closePaymentModal,
  };
};
