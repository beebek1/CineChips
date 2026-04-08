import React from "react";
import { FaUniversity, FaEdit, FaTrash, FaMapMarkerAlt, FaCouch } from "react-icons/fa";
import type { Hall } from "../halls.types";
import { numberToAlpha } from "../halls.utils";

interface Props {
  hall: Hall;
  onEdit: (hall: Hall) => void;
  onDelete: (id: number) => void;
}

const HallCard: React.FC<Props> = ({ hall, onEdit, onDelete }) => (
  <div className="bg-[#111] border border-white/5 rounded-[40px] p-8 hover:border-[#d4af37]/30 transition-all group overflow-hidden">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#d4af37] border border-white/5">
        <FaUniversity size={18} />
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onEdit(hall)} className="cursor-pointer p-3 bg-white/5 rounded-xl text-gray-500 hover:text-white transition-colors">
          <FaEdit size={12} />
        </button>
        <button onClick={() => onDelete(hall.hall_id)} className="cursor-pointer p-3 bg-red-500/5 rounded-xl text-red-500/50 hover:text-red-500 transition-colors">
          <FaTrash size={12} />
        </button>
      </div>
    </div>

    <div className="mb-6">
      <h5 className="text-white text-2xl font-black tracking-tight uppercase mb-1">{hall.name}</h5>
      <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
        <FaMapMarkerAlt className="text-[#d4af37]" /> {hall.location}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5 mb-6">
      <div>
        <p className="text-gray-600 text-[8px] font-black uppercase tracking-widest mb-1">Rows (Alphabetical)</p>
        <p className="text-white font-bold text-sm tracking-widest">A - {numberToAlpha(hall.total_rows)}</p>
      </div>
      <div>
        <p className="text-gray-600 text-[8px] font-black uppercase tracking-widest mb-1">Columns (Numerical)</p>
        <p className="text-white font-bold text-sm tracking-widest">1 - {hall.total_columns}</p>
      </div>
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <FaCouch className="text-gray-700" size={14} />
        <span className="text-white font-black text-xs">{hall.total_rows * hall.total_columns} Seats</span>
      </div>
      <div className="text-right">
        <p className="text-[#d4af37] text-[10px] font-black tracking-tighter">BASE: Rs.{hall.basePrice}</p>
        <p className="text-white text-[10px] font-black tracking-tighter uppercase">VIP: Rs.{hall.vipPrice}</p>
      </div>
    </div>
  </div>
);

export default HallCard;