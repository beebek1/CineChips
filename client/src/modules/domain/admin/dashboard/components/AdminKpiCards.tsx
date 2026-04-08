import React from "react";
import { FaWallet, FaChair, FaFilm, FaCircle } from "react-icons/fa";

type Props = {
  totalRevenue: number;
  totalSeats: number;
  showtimeCount: number;
  uniqueMovieCount: number;
  totalMoviesInLibrary: number;
  liveShows: number;
};

const AdminKpiCards: React.FC<Props> = ({
  totalRevenue,
  totalSeats,
  showtimeCount,
  uniqueMovieCount,
  totalMoviesInLibrary,
  liveShows,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div className="bg-[#111] border border-white/5 p-8 rounded-[35px] hover:border-[#d4af37]/30 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="p-4 bg-[#d4af37]/10 rounded-2xl text-[#d4af37]"><FaWallet size={18} /></div>
          <span className="text-[#d4af37] text-[9px] font-black bg-[#d4af37]/10 px-3 py-1 rounded-full uppercase tracking-widest">Projected</span>
        </div>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Revenue (NPR)</p>
        <p className="text-3xl font-black mt-1">Rs. {totalRevenue.toLocaleString()}</p>
        <p className="text-[9px] text-gray-600 mt-1 uppercase tracking-widest">Based on full house capacity</p>
      </div>

      <div className="bg-[#111] border border-white/5 p-8 rounded-[35px] hover:border-[#d4af37]/30 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400"><FaChair size={18} /></div>
          <span className="text-blue-400 text-[9px] font-black bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest">Capacity</span>
        </div>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Seats Scheduled</p>
        <p className="text-3xl font-black mt-1">{totalSeats.toLocaleString()}</p>
        <p className="text-[9px] text-gray-600 mt-1 uppercase tracking-widest">Across {showtimeCount} shows</p>
      </div>

      <div className="bg-[#111] border border-white/5 p-8 rounded-[35px] hover:border-[#d4af37]/30 transition-all">
        <div className="flex justify-between items-start mb-4">
          <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400"><FaFilm size={18} /></div>
          <span className="text-purple-400 text-[9px] font-black bg-purple-500/10 px-3 py-1 rounded-full uppercase tracking-widest">Active</span>
        </div>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Movies Scheduled</p>
        <p className="text-3xl font-black mt-1">{uniqueMovieCount}</p>
        <p className="text-[9px] text-gray-600 mt-1 uppercase tracking-widest">{totalMoviesInLibrary} total in library</p>
      </div>

      <div className="bg-[#d4af37] p-8 rounded-[35px] text-black shadow-xl shadow-[#d4af37]/10 relative overflow-hidden group">
        <FaCircle className="absolute -top-4 -right-4 text-black/10 text-9xl group-hover:scale-110 transition-transform duration-700" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <FaCircle className="text-red-600 animate-pulse" size={8} />
            <span className="text-[10px] font-black uppercase tracking-widest">Today</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Shows Today</p>
          <p className="text-5xl font-black mt-1 tracking-tighter">{liveShows}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminKpiCards;