import React from "react";
import { FaUniversity, FaCalendarAlt, FaTag } from "react-icons/fa";

type Props = {
  hallCount: number;
  upcomingShowCount: number;
  avgTicketPrice: number;
};

const AdminSecondaryStats: React.FC<Props> = ({ hallCount, upcomingShowCount, avgTicketPrice }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div className="bg-[#111] border border-white/5 p-8 rounded-[30px] flex items-center gap-6 hover:border-[#d4af37]/20 transition-all">
        <div className="p-5 bg-white/5 rounded-2xl text-[#d4af37]"><FaUniversity size={22} /></div>
        <div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Halls</p>
          <p className="text-4xl font-black">{hallCount}</p>
        </div>
      </div>

      <div className="bg-[#111] border border-white/5 p-8 rounded-[30px] flex items-center gap-6 hover:border-[#d4af37]/20 transition-all">
        <div className="p-5 bg-white/5 rounded-2xl text-blue-400"><FaCalendarAlt size={22} /></div>
        <div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Upcoming Shows</p>
          <p className="text-4xl font-black">{upcomingShowCount}</p>
        </div>
      </div>

      <div className="bg-[#111] border border-white/5 p-8 rounded-[30px] flex items-center gap-6 hover:border-[#d4af37]/20 transition-all">
        <div className="p-5 bg-white/5 rounded-2xl text-green-400"><FaTag size={22} /></div>
        <div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Avg Ticket Price</p>
          <p className="text-4xl font-black">Rs. {avgTicketPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSecondaryStats;