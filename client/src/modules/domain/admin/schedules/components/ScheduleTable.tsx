import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import type { Hall, Movie, Schedule } from "../schedules.types";
import { formatDate, formatTime } from "../schedules.utils";

interface Props {
  schedules: Schedule[];
  movies: Movie[];
  halls: Hall[];
  onEdit: (schedule: Schedule) => void;
  onDelete: (id: number) => void;
}

const SchedulesTable: React.FC<Props> = ({ schedules, movies, halls, onEdit, onDelete }) => {
  const getMovieTitle = (id: number | string) =>
    movies.find((m) => String(m.movie_id) === String(id))?.title ?? "—";

  const getHallName = (id: number | string) =>
    halls.find((h) => String(h.hall_id) === String(id))?.name ?? "—";

  return (
    <div className="bg-[#111] border border-white/5 rounded-[30px] overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
          <tr>
            <th className="px-8 py-5">Movie & Language</th>
            <th className="px-8 py-5">Hall</th>
            <th className="px-8 py-5">Date & Time</th>
            <th className="px-8 py-5">Price</th>
            <th className="px-8 py-5 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/5">
          {schedules.length === 0 && (
            <tr>
              <td colSpan={5} className="px-8 py-12 text-center text-gray-600 text-xs uppercase tracking-widest">
                No showtimes scheduled yet.
              </td>
            </tr>
          )}

          {schedules.map((s) => (
            <tr key={s.showtime_id} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-8 py-5">
                <p className="font-bold text-sm uppercase capitalize">
                  {s.Movie?.title ?? s.movie?.title ?? getMovieTitle(s.movie_id)}
                </p>
                <span className="text-[10px] text-[#d4af37] font-black">{s.language}</span>
              </td>

              <td className="px-8 py-5 font-bold text-gray-400 text-sm">
                {s.hallModel?.name ?? s.hall?.name ?? getHallName(s.hall_id)}
              </td>

              <td className="px-8 py-5">
                <p className="text-sm font-bold">{formatTime(s.show_time)}</p>
                <p className="text-[10px] text-gray-500 uppercase">{formatDate(s.show_date)}</p>
              </td>

              <td className="px-8 py-5 text-[#d4af37] font-black text-sm">Rs. {s.price}</td>

              <td className="px-8 py-5 text-right">
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => onEdit(s)}
                    className="cursor-pointer p-3 bg-white/5 rounded-xl text-gray-500 hover:text-white transition-colors"
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    onClick={() => onDelete(s.showtime_id)}
                    className="cursor-pointer p-3 bg-red-500/5 rounded-xl text-red-500/50 hover:text-red-500 transition-colors"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulesTable;