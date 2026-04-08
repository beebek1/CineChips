import React from "react";
import type { LanguageItem } from "../adminDashboard.types"
type Props = {
  languages: LanguageItem[];
};

const LanguageBreakdownCard: React.FC<Props> = ({ languages }) => {
  return (
    <div className="bg-[#111] border border-white/5 rounded-[35px] p-8">
      <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.4em] mb-6">Languages</p>
      <div className="space-y-3">
        {languages.map((item) => (
          <div key={item.lang} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
              <p className="text-xs font-black uppercase tracking-widest">{item.lang}</p>
            </div>
            <span className="text-[10px] font-black text-gray-500 bg-white/5 px-3 py-1 rounded-full">
              {item.count} show{item.count > 1 ? "s" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageBreakdownCard;