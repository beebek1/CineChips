import React from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

type Props = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
};

const MovieAdminHeader: React.FC<Props> = ({
  searchTerm,
  onSearchChange,
  onAddClick,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div>
        <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">
          Central Archive
        </h3>
        <h4 className="text-white text-3xl font-light tracking-tighter uppercase">
          Movie <span className="font-black italic">Library</span>
        </h4>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="SEARCH CATALOG..."
            value={searchTerm}
            className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-[10px] font-black tracking-widest focus:outline-none focus:border-[#d4af37]/40 w-64 transition-all"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <button
          onClick={onAddClick}
          className="cursor-pointer bg-[#d4af37] text-black font-black px-8 py-3 rounded-xl text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 hover:scale-105 transition-all active:scale-95"
        >
          <FaPlus /> Add New Premiere
        </button>
      </div>
    </div>
  );
};

export default MovieAdminHeader;