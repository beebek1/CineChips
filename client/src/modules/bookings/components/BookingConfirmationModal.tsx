import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdEventSeat } from "react-icons/md";
import toast from "react-hot-toast";
import { addBookingApi } from "../booking.api";
import type { ActiveBooking, ShowtimeSeat } from "../booking.types";

type Props = {
  isOpen: boolean;
  bookingId: string;
  booking: ActiveBooking;
  selectedSeats: ShowtimeSeat[];
  finalAmount: number;
};

const BookingConfirmationModal: React.FC<Props> = ({
  isOpen,
  bookingId,
  booking,
  selectedSeats,
  finalAmount,
}) => {
  console.log("i reached here")
  const navigate = useNavigate();
  const hasCalledApi = useRef(false);

  const formatTimeSafe = (time?: string) => {
    if (!time) return "N/A";
    try {
      return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return time;
    }
  };

  const onClickHandler = () => {
    localStorage.removeItem("activeBooking");
    navigate("/");
  };

  useEffect(() => {
    console.log("i reached here")
    if (isOpen && !hasCalledApi.current && booking?.schedule) {
      hasCalledApi.current = true;

      const fetchData = async () => {
        const bookingSummary = {
          booking_id: bookingId,
          movie_name: booking.movieTitle,
          hall_name: booking.hall?.name,
          show_time: formatTimeSafe(booking.slot?.time),
          show_date: booking.schedule?.fullDate,
          booked_seats: selectedSeats?.map((s) => s.seat_name).join(", "),
          total_price: finalAmount,
          showtime_id: booking.showtimeId,
        };

        try {
          const response = await addBookingApi(bookingSummary);
          toast.success((response as any)?.data?.message || "Booking Saved!");
        } catch (err: any) {
          toast.error(err?.response?.data?.message || "Connection error. Please contact support.");
        }
      };

      fetchData();
    }
  }, [isOpen, bookingId, booking, selectedSeats, finalAmount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MdEventSeat className="text-[#d4af37]" size={32} />
          </div>

          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Booking Confirmed</h2>
          <p className="text-gray-500 text-sm mb-8 tracking-wide">Your seats are secured.</p>

          <div className="bg-white/5 rounded-2xl p-6 mb-8 space-y-4 text-left">
            <div className="flex justify-between text-[10px] uppercase tracking-widest border-b border-white/5 pb-2">
              <span className="text-gray-500">Receipt</span>
              <span className="font-bold text-[#d4af37]">{bookingId}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Movie</span>
              <span className="text-white font-bold">{booking.movieTitle}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Date</span>
              <span className="text-white font-bold">{booking.schedule?.fullDate}</span>
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Seats</span>
              <span className="text-white font-bold text-right max-w-[150px]">
                {selectedSeats?.map((s) => s.seat_name).join(", ")}
              </span>
            </div>

            <div className="flex justify-between text-sm border-t border-white/5 pt-4">
              <span className="text-gray-400 font-bold">Total Paid</span>
              <span className="text-[#d4af37] font-black underline decoration-double">Rs. {finalAmount}</span>
            </div>
          </div>

          <button
            onClick={onClickHandler}
            className="cursor-pointer w-full bg-white text-black font-black py-4 rounded-xl transition-all active:scale-95 uppercase text-xs tracking-[0.2em] hover:bg-[#d4af37] hover:tracking-[0.3em]"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;