import { FaCalendarAlt, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatReleaseDate, formatReleaseYear, getCoverUrl } from "../utils/movies.utils";
import type { Movie } from "../hooks/useMoviesByStatus";

type Props = {
  movies: Movie[];
  showBookButton?: boolean;
  showFullDate?: boolean;
};

export default function MovieGrid({
  movies,
  showBookButton = false,
  showFullDate = false,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
      {movies.map((movie) => (
        <div key={movie.movie_id} className="group cursor-pointer">
          <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 transition-all duration-700 hover:border-[#d4af37]/40 mb-5">
            <img
              src={getCoverUrl(movie.coverPic, movie.movie_id)}
              alt={movie.title}
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black via-black/80 to-transparent">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 space-y-2">
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <FaCalendarAlt size={8} />

                  <span className="text-[9px] font-black uppercase tracking-widest">
                    {showFullDate
                      ? formatReleaseDate(movie.releaseDate)
                      : formatReleaseYear(movie.releaseDate)}
                  </span>

                  <span className="text-gray-500 text-[9px] font-black">·</span>

                  <span className="text-[9px] font-black text-gray-400">
                    {movie.duration} min
                  </span>
                </div>

                <p className="text-white text-[10px] leading-relaxed line-clamp-3 font-normal">
                  {movie.description}
                </p>

                {showBookButton && (
                  <Link
                    to={`/datebooking/${movie.movie_id}`}
                    state={{ movie }}
                    className="mt-1 w-full flex items-center justify-center gap-2 bg-[#d4af37] text-black font-black text-[9px] tracking-[0.2em] uppercase py-2.5 rounded-xl hover:bg-white transition-colors"
                  >
                    <FaTicketAlt size={9} /> Book Now
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1 px-1">
            <p className="text-[#d4af37] text-[9px] font-black tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
              {movie.genre}
            </p>

            <h3 className="text-white font-bold text-sm tracking-tight group-hover:text-[#d4af37] transition-colors duration-300 capitalize">
              {movie.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}