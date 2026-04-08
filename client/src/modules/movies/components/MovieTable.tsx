import React from "react";
import { FaEdit, FaImage, FaSpinner, FaTrash } from "react-icons/fa";
import type { Movie } from "../movies.types";
import { getCoverUrl } from "../utils/movies.utils";

type Props = {
  loading: boolean;
  movies: Movie[];
  onEdit: (movie: Movie) => void;
  onDelete: (id: string) => void;
};

const MovieTable: React.FC<Props> = ({ loading, movies, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
      </div>
    );
  }

  return (
    <div className="bg-[#111] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
            <th className="px-8 py-6">Movie Details</th>
            <th className="px-8 py-6">Genre</th>
            <th className="px-8 py-6">Duration</th>
            <th className="px-8 py-6">Status</th>
            <th className="px-8 py-6 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/5">
          {movies.length === 0 && (
            <tr>
              <td colSpan={5} className="px-8 py-12 text-center text-gray-600 text-xs uppercase tracking-widest">
                No movies found.
              </td>
            </tr>
          )}

          {movies.map((movie) => (
            <tr key={movie.movie_id} className="group hover:bg-white/[0.02] transition-colors">
              <td className="px-8 py-6 flex items-center gap-4">
                {movie.coverPic ? (
                  <img
                    src={getCoverUrl(movie.coverPic, movie.movie_id)}
                    className="w-10 h-14 object-cover rounded bg-white/5"
                    alt={movie.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-10 h-14 rounded bg-white/5 flex items-center justify-center">
                    <FaImage className="text-gray-700 text-xs" />
                  </div>
                )}
                <div>
                  <p className="text-white font-black text-xs uppercase">{movie.title}</p>
                  <p className="text-[9px] text-gray-600 font-bold uppercase truncate max-w-[150px]">
                    {movie.description}
                  </p>
                </div>
              </td>

              <td className="px-8 py-6 text-gray-400 text-[11px] font-bold uppercase">{movie.genre}</td>
              <td className="px-8 py-6 text-gray-400 text-[11px] font-bold">{movie.duration} min</td>

              <td className="px-8 py-6">
                <span
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                    movie.status === "Showing"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {movie.status}
                </span>
              </td>

              <td className="px-8 py-6 text-right">
                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => onEdit(movie)}
                    className="cursor-pointer p-2 bg-white/5 rounded-lg text-gray-400 hover:text-[#d4af37]"
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    onClick={() => onDelete(movie.movie_id)}
                    className="cursor-pointer p-2 bg-red-500/5 rounded-lg text-red-500/50 hover:text-red-500"
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

export default MovieTable;