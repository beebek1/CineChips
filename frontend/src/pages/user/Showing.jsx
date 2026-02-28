import React, { useState, useEffect, useMemo } from 'react';
import { FaFilter, FaThLarge, FaChevronDown, FaCalendarAlt, FaSpinner, FaTicketAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getAllMovie } from '../../services/api';

const IMAGE_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

const NowShowingPage = () => {
  const [allMovies, setAllMovies]     = useState([]);
  const [loading, setLoading]         = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await getAllMovie();
        const raw = res?.data?.movies ?? res?.data ?? [];
        // Only keep movies with status "Showing"
        const showing = raw.filter(m => m.status === 'Showing');
        setAllMovies(showing);
      } catch {
        setAllMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // Build genre list from fetched data
  const genres = useMemo(() => {
    const unique = [...new Set(allMovies.map(m => m.genre?.toUpperCase()).filter(Boolean))];
    return ['ALL', ...unique];
  }, [allMovies]);

  const filteredMovies = useMemo(() => {
    if (activeFilter === 'ALL') return allMovies;
    return allMovies.filter(m => m.genre?.toUpperCase() === activeFilter);
  }, [allMovies, activeFilter]);

  const getCoverUrl = (filename) => {
    if (!filename) return 'https://picsum.photos/300/450?random=99';
    if (filename.startsWith('http')) return filename;
    return `${IMAGE_BASE}/uploads/${filename}`;
  };

  const formatReleaseYear = (iso) => {
    if (!iso) return '';
    return new Date(iso).getFullYear();
  };

  return (
    <div className="min-h-screen bg-[#080808] font-sans text-white pt-32 pb-24">

      {/* Page Header */}
      <header className="max-w-7xl mx-auto px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-end space-x-4 mb-4">
              <h1 className="text-8xl font-black text-white/[0.03] tracking-tighter leading-none select-none">CC</h1>
              <div className="pb-2">
                <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">Cinema Collection</h3>
                <h2 className="text-white text-5xl font-light tracking-tighter">NOW <span className="font-black">SHOWING</span></h2>
              </div>
            </div>
            <p className="text-gray-500 text-sm max-w-md tracking-wide">
              {activeFilter === 'ALL'
                ? `${filteredMovies.length} film${filteredMovies.length !== 1 ? 's' : ''} currently in halls.`
                : `${filteredMovies.length} ${activeFilter} film${filteredMovies.length !== 1 ? 's' : ''} in halls.`
              }
            </p>
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center space-x-4 relative">
            <div
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="group cursor-pointer flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-3 rounded-xl hover:border-[#d4af37]/50 transition-all select-none"
            >
              <FaFilter className="text-[#d4af37] text-[10px]" />
              <span className="text-[10px] font-black tracking-widest uppercase">{activeFilter}</span>
              <FaChevronDown className={`text-gray-600 text-[10px] transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </div>

            {isFilterOpen && (
              <div className="absolute top-full mt-2 right-12 w-48 bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden z-20 shadow-2xl">
                {genres.map((genre) => (
                  <div
                    key={genre}
                    onClick={() => { setActiveFilter(genre); setIsFilterOpen(false); }}
                    className={`px-6 py-3 text-[10px] font-black tracking-[0.2em] cursor-pointer transition-colors hover:bg-[#d4af37] hover:text-black ${activeFilter === genre ? 'text-[#d4af37] bg-white/5' : 'text-gray-400'}`}
                  >
                    {genre}
                  </div>
                ))}
              </div>
            )}

            <div className="cursor-pointer bg-[#d4af37] text-black p-3.5 rounded-xl">
              <FaThLarge className="text-sm" />
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-8">
        {loading ? (
          <div className="flex justify-center py-32">
            <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
          </div>
        ) : filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">

                {/* Poster */}
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 transition-all duration-700 hover:border-[#d4af37]/40 mb-5">
                  <img
                    src={getCoverUrl(movie.coverPic)}
                    alt={movie.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    onError={e => { e.target.src = `https://picsum.photos/300/450?random=${movie.id}`; }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />

                  {/* Hover detail overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37]">
                        <FaCalendarAlt size={8} />
                        <span className="text-[9px] font-black uppercase tracking-widest">
                          {formatReleaseYear(movie.releaseDate)}
                        </span>
                        <span className="text-gray-500 text-[9px] font-black">·</span>
                        <span className="text-[9px] font-black text-gray-400">{movie.duration} min</span>
                      </div>
                      <p className="text-white text-[10px] leading-relaxed line-clamp-3 font-normal">
                        {movie.description}
                      </p>
                      <Link
                        to={`/datebooking/${movie.id}`}
                        state={{ movie }}
                        className="mt-1 w-full flex items-center justify-center gap-2 bg-[#d4af37] text-black font-black text-[9px] tracking-[0.2em] uppercase py-2.5 rounded-xl hover:bg-white transition-colors"
                      >
                        <FaTicketAlt size={9} /> Book Now
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <p className="text-[#d4af37] text-[9px] font-black tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">{movie.genre}</p>
                  <h3 className="text-white font-bold text-sm tracking-tight group-hover:text-[#d4af37] transition-colors duration-300 capitalize">{movie.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-600 font-black tracking-[0.5em] uppercase text-xs">
              {allMovies.length === 0 ? 'No movies currently showing.' : 'No movies found in this genre.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NowShowingPage;