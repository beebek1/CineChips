import React from "react";
import { MdEventSeat } from "react-icons/md";
import { FaCrown } from "react-icons/fa";
import type { SeatRow, ShowtimeSeat } from "../../booking.types";

type Props = {
  rows: SeatRow[];
  onSeatClick: (rowIdx: number, seatIdx: number, seat: ShowtimeSeat) => void;
};

const SeatGrid: React.FC<Props> = ({ rows, onSeatClick }) => {
  return (
    <div className="flex flex-col gap-8 items-center w-full">
      {rows.map((row, rowIdx) => {
        const totalSeats = row.seats.length;

        return (
          <div key={row.row_label} className="flex items-center gap-3 md:gap-4">
            <span className="text-gray-600 text-[10px] font-black w-4 text-right">{row.row_label}</span>

            <div className="flex gap-1 md:gap-5">
              {row.seats.map((seat, seatIdx) => {
                const x = totalSeats > 1 ? seatIdx / (totalSeats - 1) : 0.5;
                const archHeight = 50;
                const translateY = -archHeight * 4 * (x - 0.5) * (x - 0.5) + archHeight;
                const rotationZ = -(2 * x - 1) * 20;
                const isSelected = seat.status === "selected";
                const isBooked = seat.status === "booked" || seat.status === "reserved";
                const isVip = seat.seat_type === "vip";

                return (
                  <div
                    key={seat.seat_name}
                    onClick={() => onSeatClick(rowIdx, seatIdx, seat)}
                    title={`${seat.seat_name} · ${seat.seat_type} · ${seat.status}`}
                    className={`relative transition-all duration-300 cursor-pointer
                      ${isBooked ? "text-white/10 cursor-not-allowed" : ""}
                      ${!isBooked && !isSelected && !isVip ? "text-gray-600 hover:text-white hover:scale-110" : ""}
                      ${!isBooked && !isSelected && isVip ? "text-amber-600/60 hover:text-amber-400 hover:scale-110" : ""}
                      ${isSelected && !isVip ? "text-[#d4af37] scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" : ""}
                      ${isSelected && isVip ? "text-amber-300 scale-110 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" : ""}
                    `}
                    style={{ transform: `translateY(${translateY}px) rotateZ(${rotationZ}deg)` }}
                  >
                    <MdEventSeat size={window.innerWidth < 768 ? 22 : 28} />
                    {isVip && !isBooked && (
                      <FaCrown
                        size={7}
                        className={`absolute -top-1.5 left-1/2 -translate-x-1/2 ${
                          isSelected ? "text-amber-300" : "text-amber-600/60"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <span className="text-gray-600 text-[10px] font-black w-4">{row.row_label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default SeatGrid;