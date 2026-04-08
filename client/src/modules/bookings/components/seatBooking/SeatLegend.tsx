import React from "react";
import { MdEventSeat } from "react-icons/md";
import { FaCrown } from "react-icons/fa";

type Props = {
  vipPrice: number;
};

const SeatLegend: React.FC<Props> = ({ vipPrice }) => {
  return (
    <div className="flex flex-wrap gap-6 md:gap-10 mt-20 border-t border-white/5 pt-6 justify-center">
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
        <MdEventSeat className="text-gray-600" size={18} /> Available
      </div>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
        <MdEventSeat className="text-[#d4af37]" size={18} /> Selected
      </div>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
        <MdEventSeat className="text-white/10" size={18} /> Booked
      </div>
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
        <div className="relative">
          <MdEventSeat className="text-amber-600/60" size={18} />
          <FaCrown size={6} className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-amber-600/60" />
        </div>
        VIP (Rs. {vipPrice})
      </div>
    </div>
  );
};

export default SeatLegend;