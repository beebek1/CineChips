import React from "react";
import MovieCard from "./MovieCard";
import type { MovieCardItem } from "../user.types";

type Props = {
  indexLabel: string;
  smallTitle: string;
  titleLeft: string;
  titleRight: string;
  movies: MovieCardItem[];
  isUpcoming?: boolean;
  emptyText: string;
  withTopBorder?: boolean;
};

const MovieSection: React.FC<Props> = ({
  indexLabel,
  smallTitle,
  titleLeft,
  titleRight,
  movies,
  isUpcoming = false,
  emptyText,
  withTopBorder = false,
}) => {
  return (
    <section className={`max-w-7xl mx-auto px-8 py-24 ${withTopBorder ? "border-t border-white/5" : ""}`}>
      <div className="flex items-end space-x-4 mb-16">
        <h2 className="text-8xl font-black text-white/[0.03] tracking-tighter leading-none select-none uppercase">{indexLabel}</h2>
        <div className="pb-2">
          <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">{smallTitle}</h3>
          <h4 className="text-white text-3xl font-light tracking-tighter uppercase italic">
            {titleLeft} <span className="font-black">{titleRight}</span>
          </h4>
        </div>
      </div>

      {movies.length <= 1 ? (
        <p className="text-gray-600 text-xs uppercase tracking-widest">{emptyText}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {movies.map((movie) => (
            <MovieCard key={String(movie.movie_id)} movie={movie} isUpcoming={isUpcoming} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MovieSection;