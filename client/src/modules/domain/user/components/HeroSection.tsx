import React from "react";
import { Link } from "react-router-dom";
import { FaClock, FaCalendarAlt, FaPlay, FaTicketAlt } from "react-icons/fa";
import type { Movie } from "../user.types";
import { formatYear, getCoverUrl } from "../user.utils";

type Props = {
  hero: Movie | null;
};

const HeroSection: React.FC<Props> = ({ hero }) => {
  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={hero ? getCoverUrl(hero.coverPic) : "https://picsum.photos/1920/1080?random=1"}
          className="w-full h-full object-cover opacity-60"
          alt={hero?.title ?? "Featured"}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "https://picsum.photos/1920/1080?random=1";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
      </div>

      {hero && (
        <div className="relative h-full max-w-7xl mx-auto px-8 flex items-center pt-20">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse" />
              <span className="text-gray-400 text-[10px] font-black tracking-[0.3em] uppercase">Featured Premiere</span>
            </div>

            <h1 className="text-white text-6xl md:text-8xl font-light tracking-tighter leading-none uppercase capitalize">
              {hero.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="font-black">{hero.title.split(" ").slice(-1)}</span>
            </h1>

            <div className="flex items-center space-x-8 text-[11px] font-black tracking-[0.2em] text-gray-500 uppercase">
              <div className="flex items-center space-x-2">
                <FaClock className="text-[#d4af37]" />
                <span>{hero.duration} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-[#d4af37]" />
                <span>{formatYear(hero.releaseDate)}</span>
              </div>
              {hero.genre && (
                <div className="flex items-center space-x-2">
                  <span className="text-white">{hero.genre}</span>
                </div>
              )}
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-lg font-medium italic line-clamp-3">
              {hero.description}
            </p>

            <div className="flex space-x-5 pt-4">
              <Link
                to={`/datebooking/${hero.movie_id}`}
                state={{ movie: hero }}
                className="cursor-pointer flex items-center space-x-3 bg-[#d4af37] text-black font-black px-10 py-4 rounded-xl text-[10px] tracking-[0.2em] uppercase transition-all hover:bg-[#b8962d]"
              >
                <FaTicketAlt className="w-2.5 h-2.5" /> <span>Book Now</span>
              </Link>
              {hero.trailerLink?.startsWith("http") && (
                <a
                  href={hero.trailerLink}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer flex items-center space-x-3 bg-white/5 text-white font-black px-10 py-4 rounded-xl border border-white/10 text-[10px] tracking-[0.2em] uppercase hover:bg-white/10"
                >
                  <FaPlay className="w-2.5 h-2.5" /> <span>Watch Trailer</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;