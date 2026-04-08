import React from "react";
import type { HallUsageItem } from "../adminDashboard.types";

type Props = {
  hallUsage: HallUsageItem[];
};

const HallUsageCard: React.FC<Props> = ({ hallUsage }) => {
  return (
    <div className="bg-[#111] border border-white/5 rounded-[35px] p-8">
      <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.4em] mb-6">Hall Usage</p>
      <div className="space-y-4">
        {hallUsage.length === 0 ? (
          <p className="text-gray-600 text-[10px] uppercase">No data.</p>
        ) : (
          hallUsage.map((item) => (
            <div key={item.name}>
              <div className="flex justify-between mb-1.5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 truncate pr-2">{item.name}</p>
                <p className="text-[10px] font-black text-white shrink-0">{item.count} shows</p>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#d4af37] rounded-full" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HallUsageCard;