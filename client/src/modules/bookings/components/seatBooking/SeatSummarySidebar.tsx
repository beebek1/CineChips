import React from "react";
import { FaCrown, FaSpinner } from "react-icons/fa";
import type { ActiveBooking, ShowtimeSeat } from "../../booking.types";
import { formatDateCard, formatTime } from "../../booking.utils";

type Props = {
  booking: ActiveBooking;
  selectedSeats: ShowtimeSeat[];
  maxSeats: number;
  basePrice: number;
  vipPrice: number;
  serviceFee: number;
  finalAmount: number;
  confirming: boolean;
  onCancel: () => void;
  onPay: () => void;
};

const SeatSummarySidebar: React.FC<Props> = ({
  booking,
  selectedSeats,
  maxSeats,
  basePrice,
  vipPrice,
  serviceFee,
  finalAmount,
  confirming,
  onCancel,
  onPay,
}) => {
  const standardCount = selectedSeats.filter((s) => s.seat_type !== "vip").length;
  const vipCount = selectedSeats.filter((s) => s.seat_type === "vip").length;

  return (
    <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-full md:w-96 bg-[#0f0f0f] border-l border-white/10 p-6 md:p-8 shadow-2xl overflow-y-auto z-40 transition-all duration-500">
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-gray-500">Booking Summary</h3>

          <div className="mb-5 pb-5 border-b border-white/5 space-y-1">
            <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Movie</p>
            <p className="font-bold text-white capitalize">{booking.movieTitle}</p>
          </div>

          <div className="mb-5 pb-5 border-b border-white/5 space-y-1">
            <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Hall & Time</p>
            <p className="font-bold text-white text-sm">{booking.hall?.name}</p>
            <p className="text-gray-500 text-xs">
              {formatTime(booking.slot?.time)} ·{" "}
              {booking.schedule ? `${formatDateCard(booking.schedule.fullDate).date} ${formatDateCard(booking.schedule.fullDate).month}` : ""}
            </p>
          </div>

          <div className="mb-5 pb-5 border-b border-white/5 space-y-1">
            <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Language</p>
            <p className="font-bold text-white text-sm">{booking.showing?.language}</p>
          </div>

          <div className="mb-6 space-y-2">
            <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-3">
              Selected Seats ({selectedSeats.length}/{maxSeats})
            </p>
            <div className="flex gap-2 flex-wrap">
              {selectedSeats.map((s) => (
                <span
                  key={String(s.showtime_seat_id)}
                  className={`font-black px-3 py-1 rounded text-xs flex items-center gap-1 ${
                    s.seat_type === "vip"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-[#d4af37] text-black"
                  }`}
                >
                  {s.seat_type === "vip" && <FaCrown size={7} />}
                  {s.seat_name}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {standardCount > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Standard × {standardCount}</span>
                <span className="text-white font-bold">Rs. {standardCount * basePrice}</span>
              </div>
            )}
            {vipCount > 0 && (
              <div className="flex justify-between text-xs">
                <span className="text-amber-400/70">VIP × {vipCount}</span>
                <span className="text-amber-400 font-bold">Rs. {vipCount * vipPrice}</span>
              </div>
            )}
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Service Fee (5%)</span>
              <span className="text-white font-bold">Rs. {serviceFee}</span>
            </div>
            <div className="flex justify-between text-xl font-light border-t border-white/5 pt-5 mt-3">
              <span className="text-gray-400">Total</span>
              <span className="text-[#d4af37] font-bold">Rs. {finalAmount}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-10">
          <button
            onClick={onCancel}
            className="cursor-pointer w-full text-gray-500 hover:text-white font-bold py-3 text-xs uppercase tracking-widest transition-all"
          >
            Cancel Selection
          </button>
          <button
            disabled={confirming}
            onClick={onPay}
            className="cursor-pointer w-full bg-[#d4af37] hover:bg-[#c19d2d] text-black font-black py-4 rounded-xl transition-all active:scale-95 uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {confirming ? (
              <>
                <FaSpinner className="animate-spin" /> Confirming...
              </>
            ) : (
              "Confirm & Pay"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatSummarySidebar;