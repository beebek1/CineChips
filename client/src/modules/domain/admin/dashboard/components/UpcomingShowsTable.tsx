import React from "react";
import { FaChartLine, FaRegClock } from "react-icons/fa";
import type { Showtime } from "../adminDashboard.types";
import { formatDate, formatTime } from "../adminDashboard.utils";

type Props = {
  upcomingShows: Showtime[];
};

const UpcomingShowsTable: React.FC<Props> = ({ upcomingShows }) => {
  return (
    <div className="lg:col-span-2 bg-[#111] border border-white/5 rounded-[40px] p-10">
      <div className="flex items-center justify-between mb-8">
        <h5 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
          <FaChartLine className="text-[#d4af37]" /> Upcoming Shows
        </h5>
        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
          {upcomingShows.length} scheduled
        </span>
      </div>

      {upcomingShows.length === 0 ? (
        <p className="text-gray-600 text-xs uppercase tracking-widest text-center py-10">No upcoming shows.</p>
      ) : (
        <div className="space-y-1">
          {upcomingShows.slice(0, 6).map((s, idx) => (
            <div key={s.id ?? idx} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group">
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0" />
                <div>
                  <p className="text-sm font-black uppercase tracking-tight text-white">
                    {s.Movie?.title ?? "—"}
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                    {s.hallModel?.name ?? `Hall ${s.hall_id}`} · {s.language}
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-black text-white flex items-center gap-2 justify-end">
                  <FaRegClock size={9} className="text-[#d4af37]" />
                  {formatTime(s.show_time)}
                </p>
                <p className="text-[10px] text-gray-500 uppercase mt-0.5">
                  {formatDate(s.show_date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingShowsTable;