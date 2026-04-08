import React from "react";
import { Link } from "react-router-dom";
import { FaPlay, FaArrowRight, FaTicketAlt } from "react-icons/fa";
import type { MovieCardItem } from "../user.types";
import { formatDate, getCoverUrl } from "../user.utils";

type Props = {
  movie: MovieCardItem;
  isUpcoming?: boolean;
};

const MovieCard: React.FC<Props> = ({ movie, isUpcoming = false }) => {
  if (movie.isViewAll) {
    const to = isUpcoming ? "/upcoming" : "/showing";
    return (
      <Link
        to={to}
        className="relative group cursor-pointer aspect-[2/3] rounded-[32px] overflow-hidden border border-[#d4af37]/30 bg-[#111] transition-all duration-500 hover:bg-[#d4af37] flex flex-col items-center justify-center"
      >
        <span className="text-[#d4af37] group-hover:text-black font-black text-[11px] tracking-[0.4em] uppercase mb-4 transition-colors">
          View All
        </span>
        <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] group-hover:border-black flex items-center justify-center transition-colors">
          <FaArrowRight className="text-[#d4af37] group-hover:text-black text-xl" />
        </div>
      </Link>
    );
  }

  return (
    <div className="relative group cursor-pointer aspect-[2/3] rounded-[32px] overflow-hidden border border-white/5 bg-[#111] transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10 hover:border-[#d4af37]/30">
      <img
        src={getCoverUrl(movie.coverPic)}
        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 group-hover:blur-[4px] transition-all duration-700"
        alt={movie.title}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = `https://picsum.photos/500/750?random=${movie.movie_id}`;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90 group-hover:opacity-20 transition-opacity" />

      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 px-4">
        <div className="space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 w-full flex flex-col items-center">
          {isUpcoming ? (
            <button className="cursor-pointer w-full max-w-[140px] bg-[#d4af37] text-black font-black py-3 rounded-xl text-[9px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:scale-105 transition-transform">
              <FaTicketAlt size={10} /> Notify Me
            </button>
          ) : (
            <>
              {movie.trailerLink?.startsWith("http") && (
                <a
                  href={movie.trailerLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all"
                >
                  <FaPlay className="ml-1 text-[10px]" />
                </a>
              )}
              <Link
                to={`/datebooking/${movie.movie_id}`}
                state={{ movie }}
                className="cursor-pointer w-full max-w-[140px] bg-[#d4af37] text-black font-black py-3 rounded-xl text-[9px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              >
                <FaTicketAlt size={10} /> Book Now
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
        {isUpcoming ? (
          <span className="text-[#d4af37] text-[9px] font-black tracking-widest uppercase mb-1 block">
            {formatDate(movie.releaseDate)}
          </span>
        ) : (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white text-[10px] font-bold">{movie.duration} min</span>
          </div>
        )}
        <h3 className="text-white font-black text-xs tracking-widest uppercase truncate capitalize">{movie.title}</h3>
      </div>
    </div>
  );
};

export default MovieCard;