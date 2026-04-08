import React from "react";
import { FaPlus } from "react-icons/fa";

interface Props {
  onCreate: () => void;
}

const HallsHeader: React.FC<Props> = ({ onCreate }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
    <div>
      <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">Infrastructure</h3>
      <h4 className="text-white text-3xl font-light tracking-tighter uppercase">
        Cinema <span className="font-black italic">Halls</span>
      </h4>
    </div>
    <button
      onClick={onCreate}
      className="cursor-pointer bg-[#d4af37] text-black font-black px-8 py-4 rounded-xl text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-[#d4af37]/20"
    >
      <FaPlus /> Initialize New Hall
    </button>
  </div>
);

export default HallsHeader;