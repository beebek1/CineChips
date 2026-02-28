import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaPlay, FaStar, FaClock,
  FaCalendarAlt, FaArrowRight, FaTicketAlt, FaSpinner
} from 'react-icons/fa';
import { getAllMovie, getShowTimes, getAllHalls } from '../../services/api';

const IMAGE_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

const getCoverUrl = (filename) => {
  if (!filename) return 'https://picsum.photos/500/750?random=1';
  if (filename.startsWith('http')) return filename;
  return `${IMAGE_BASE}/uploads/${filename}`;
};

const formatYear = (iso) => iso ? new Date(iso).getFullYear() : '—';

const formatDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase() : '—';

// --- MOVIE CARD ---
const MovieCard = ({ movie, isUpcoming = false }) => {
  if (movie.isViewAll) {
    const to = isUpcoming ? '/upcoming' : '/now-showing';
    return (
      <Link to={to} className="relative group cursor-pointer aspect-[2/3] rounded-[32px] overflow-hidden border border-[#d4af37]/30 bg-[#111] transition-all duration-500 hover:bg-[#d4af37] flex flex-col items-center justify-center">
        <span className="text-[#d4af37] group-hover:text-black font-black text-[11px] tracking-[0.4em] uppercase mb-4 transition-colors">View All</span>
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
        onError={e => { e.target.src = `https://picsum.photos/500/750?random=${movie.id}`; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90 group-hover:opacity-20 transition-opacity" />

      {/* Action Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 px-4">
        <div className="space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 w-full flex flex-col items-center">
          {isUpcoming ? (
            <button className="cursor-pointer w-full max-w-[140px] bg-[#d4af37] text-black font-black py-3 rounded-xl text-[9px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:scale-105 transition-transform">
              <FaTicketAlt size={10} /> Notify Me
            </button>
          ) : (
            <>
              {movie.trailerLink?.startsWith('http') && (
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
                to={`/datebooking/${movie.id}`}
                state={{ movie }}
                className="cursor-pointer w-full max-w-[140px] bg-[#d4af37] text-black font-black py-3 rounded-xl text-[9px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              >
                <FaTicketAlt size={10} /> Book Now
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Bottom Info */}
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

// --- MAIN HOME ---
const MovieHome = () => {
  const [nowShowing, setNowShowing] = useState([]);
  const [upcoming, setUpcoming]     = useState([]);
  const [hero, setHero]             = useState(null);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const [movieRes, showRes] = await Promise.all([
          getAllMovie(),
          getShowTimes(),
          getAllHalls()
        ]);

        const movies    = movieRes?.data?.movies ?? movieRes?.data ?? [];
        const showtimes = showRes?.data?.showtimes ?? showRes?.data?.schedules ?? showRes?.data ?? [];

        // Hero: find the movie with featured true from showtime nested data
        // Deduplicate by movie_id, pick the first one with featured true
        const featuredShowtime = showtimes.find(s => s.Movie?.featured === true);
        const featuredMovie    = featuredShowtime?.Movie ?? movies.find(m => m.featured === true) ?? null;
        setHero(featuredMovie);

        const showing  = movies.filter(m => m.status === 'Showing');
        const upcomingMovies = movies.filter(m => m.status === 'Upcoming');

        setNowShowing([...showing.slice(0, 4),       { id: 'view-all-showing',  isViewAll: true }]);
        setUpcoming([...upcomingMovies.slice(0, 4),  { id: 'view-all-upcoming', isViewAll: true }]);
      } catch {
        setNowShowing([]);
        setUpcoming([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] font-sans text-white">

      {/* HERO */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hero ? getCoverUrl(hero.coverPic) : 'https://picsum.photos/1920/1080?random=1'}
            className="w-full h-full object-cover opacity-60"
            alt={hero?.title ?? 'Featured'}
            onError={e => { e.target.src = 'https://picsum.photos/1920/1080?random=1'; }}
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
                {hero.title.split(' ').slice(0, -1).join(' ')}{' '}
                <span className="font-black">{hero.title.split(' ').slice(-1)}</span>
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
                  to={`/datebooking/${hero.id}`}
                  state={{ movie: hero }}
                  className="cursor-pointer flex items-center space-x-3 bg-[#d4af37] text-black font-black px-10 py-4 rounded-xl text-[10px] tracking-[0.2em] uppercase transition-all hover:bg-[#b8962d]"
                >
                  <FaTicketAlt className="w-2.5 h-2.5" /> <span>Book Now</span>
                </Link>
                {hero.trailerLink?.startsWith('http') && (
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

      {/* NOW SHOWING */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex items-end space-x-4 mb-16">
          <h2 className="text-8xl font-black text-white/[0.03] tracking-tighter leading-none select-none uppercase">01</h2>
          <div className="pb-2">
            <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">In Theaters</h3>
            <h4 className="text-white text-3xl font-light tracking-tighter uppercase italic">Now <span className="font-black">Showing</span></h4>
          </div>
        </div>
        {nowShowing.length <= 1 ? (
          <p className="text-gray-600 text-xs uppercase tracking-widest">No movies currently showing.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {nowShowing.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      {/* UPCOMING */}
      <section className="max-w-7xl mx-auto px-8 py-24 border-t border-white/5">
        <div className="flex items-end space-x-4 mb-16">
          <h2 className="text-8xl font-black text-white/[0.03] tracking-tighter leading-none select-none uppercase">02</h2>
          <div className="pb-2">
            <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">Coming Soon</h3>
            <h4 className="text-white text-3xl font-light tracking-tighter uppercase italic">Upcoming <span className="font-black">Releases</span></h4>
          </div>
        </div>
        {upcoming.length <= 1 ? (
          <p className="text-gray-600 text-xs uppercase tracking-widest">No upcoming releases.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {upcoming.map(movie => (
              <MovieCard key={movie.id} movie={movie} isUpcoming />
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

export default MovieHome;