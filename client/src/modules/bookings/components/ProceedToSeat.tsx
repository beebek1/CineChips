import React from "react";
import { MdCheckCircle } from "react-icons/md";
import type { DateSchedule, HallSchedule, Showing, Slot } from "../booking.types";

interface ProceedToSeatsProps {
  selectedSchedule: DateSchedule | null;
  selectedHall: HallSchedule | null;
  selectedShowing: Showing | null;
  selectedSlot: Slot | null;
  isAllSelected: boolean;
  onProceed: () => void;
}

const ProceedToSeats: React.FC<ProceedToSeatsProps> = ({
  selectedSchedule,
  selectedHall,
  selectedShowing,
  selectedSlot,
  isAllSelected,
  onProceed,
}) => {
  const formatDateCard = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.getDate(),
      month: date.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
      day: date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase(),
    };
  };

  const getFormattedTime = (time: string) => {
    if (!time) return '';
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  return (
    <div className="sticky top-24 bg-gradient-to-br from-[#111] to-[#0a0a0a] rounded-2xl p-8 border border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
      
      <div className="relative z-10">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8">Booking Summary</h3>

        <div className="space-y-4 mb-8 pb-8 border-b border-white/5">
          {selectedSchedule && (
            <div className="flex items-start gap-3">
              <MdCheckCircle className="flex-shrink-0 mt-0.5 text-[#d4af37]" size={16} />
              <div className="flex-1">
                <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Date</p>
                <p className="text-sm font-bold text-white">{formatDateCard(selectedSchedule.fullDate).date} {formatDateCard(selectedSchedule.fullDate).month}</p>
              </div>
            </div>
          )}

          {selectedHall && (
            <div className="flex items-start gap-3">
              <MdCheckCircle className="flex-shrink-0 mt-0.5 text-[#d4af37]" size={16} />
              <div className="flex-1">
                <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Hall</p>
                <p className="text-sm font-bold text-white">{selectedHall.name}</p>
                <p className="text-xs text-gray-500 mt-1">Rs. {selectedHall.price} per seat</p>
              </div>
            </div>
          )}

          {selectedShowing && (
            <div className="flex items-start gap-3">
              <MdCheckCircle className="flex-shrink-0 mt-0.5 text-[#d4af37]" size={16} />
              <div className="flex-1">
                <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Language</p>
                <p className="text-sm font-bold text-white">{selectedShowing.language}</p>
              </div>
            </div>
          )}

          {selectedSlot && (
            <div className="flex items-start gap-3">
              <MdCheckCircle className="flex-shrink-0 mt-0.5 text-[#d4af37]" size={16} />
              <div className="flex-1">
                <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Time</p>
                <p className="text-sm font-bold text-white">{getFormattedTime(selectedSlot.time)}</p>
              </div>
            </div>
          )}
        </div>

        <button 
          disabled={!isAllSelected} 
          onClick={onProceed} 
          className={`cursor-pointer w-full py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 active:scale-95 relative overflow-hidden group ${
            isAllSelected 
              ? 'bg-gradient-to-r from-[#d4af37] to-amber-400 text-black shadow-lg shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 hover:scale-105' 
              : 'bg-white/5 text-gray-700 cursor-not-allowed border border-white/5'
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isAllSelected ? (
              <>
                Proceed to Seats
                <MdCheckCircle size={16} />
              </>
            ) : (
              'Complete All Selections'
            )}
          </span>
          {isAllSelected && (
            <div className="absolute inset-0 bg-white/10 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-500 pointer-events-none" />
          )}
        </button>

        <p className="text-[9px] text-gray-600 text-center mt-4 uppercase tracking-widest">
          {isAllSelected ? 'Ready to select seats' : 'Select all options to continue'}
        </p>
      </div>
    </div>
  );
};

export default ProceedToSeats;