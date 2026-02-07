import React, { useState, useMemo } from 'react';
import { FaStar, FaFilter, FaThLarge, FaChevronDown, FaPlay, FaTicketAlt } from 'react-icons/fa';

const NowShowingPage = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample Data
  const moviesData = useMemo(() => [
    { id: 1, title: "INTERSTELLAR", rating: "9.2", genre: "SCI-FI", image: "https://picsum.photos/300/450?random=21" },
    { id: 2, title: "THE DARK KNIGHT", rating: "8.8", genre: "ACTION", image: "https://picsum.photos/300/450?random=22" },
    { id: 3, title: "JOKER", rating: "8.1", genre: "DRAMA", image: "https://picsum.photos/300/450?random=23" },
    { id: 4, title: "TENET", rating: "7.9", genre: "THRILLER", image: "https://picsum.photos/300/450?random=24" },
    { id: 5, title: "DUNE", rating: "8.5", genre: "SCI-FI", image: "https://picsum.photos/300/450?random=25" },
    { id: 6, title: "INCEPTION", rating: "9.0", genre: "ACTION", image: "https://picsum.photos/300/450?random=26" },
    { id: 7, title: "PARASITE", rating: "8.6", genre: "THRILLER", image: "https://picsum.photos/300/450?random=27" },
    { id: 8, title: "WHIPLASH", rating: "8.4", genre: "DRAMA", image: "https://picsum.photos/300/450?random=28" },
    { id: 9, title: "MAD MAX", rating: "8.7", genre: "ACTION", image: "https://picsum.photos/300/450?random=29" },
    { id: 10, title: "ARRIVAL", rating: "8.0", genre: "SCI-FI", image: "https://picsum.photos/300/450?random=30" },
  ], []);

  const genres = ['ALL', 'ACTION', 'SCI-FI', 'DRAMA', 'THRILLER'];

  // Basic Filter Logic
  const filteredMovies = activeFilter === 'ALL' 
    ? moviesData 
    : moviesData.filter(movie => movie.genre === activeFilter);

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
              {activeFilter === 'ALL' ? 'Showing all world-class cinema.' : `Filtered by ${activeFilter} experiences.`}
            </p>
          </div>

          {/* Functional Filter Dropdown */}
          <div className="flex items-center space-x-4 relative">
            <div 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="group cursor-pointer flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-3 rounded-xl hover:border-[#d4af37]/50 transition-all select-none"
            >
              <FaFilter className="text-[#d4af37] text-[10px]" />
              <span className="text-[10px] font-black tracking-widest uppercase">{activeFilter}</span>
              <FaChevronDown className={`text-gray-600 text-[10px] transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
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

      {/* Movie Grid */}
      <main className="max-w-7xl mx-auto px-8">
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
                {/* Poster Container */}
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 transition-all duration-700 hover:border-[#d4af37]/40 mb-5">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80"></div>
                  
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg flex items-center space-x-1.5">
                    <FaStar className="text-[#d4af37] text-[10px]" />
                    <span className="text-white text-[10px] font-black tracking-tighter">{movie.rating}</span>
                  </div>

                  {/* Dual Action Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 backdrop-blur-[2px]">
                     <button className="cursor-pointer bg-white text-black font-black text-[9px] tracking-[0.2em] w-32 py-3 rounded-lg uppercase shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all hover:bg-[#d4af37] flex items-center justify-center space-x-2">
                       <FaTicketAlt className="text-[10px]" />
                       <span>Book Now</span>
                     </button>
                     <button className="cursor-pointer bg-white/10 text-white font-black text-[9px] tracking-[0.2em] w-32 py-3 rounded-lg uppercase backdrop-blur-md border border-white/10 transform translate-y-6 group-hover:translate-y-0 transition-all hover:bg-white hover:text-black flex items-center justify-center space-x-2">
                       <FaPlay className="text-[10px]" />
                       <span>Trailer</span>
                     </button>
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <p className="text-[#d4af37] text-[9px] font-black tracking-[0.2em] uppercase transition-opacity opacity-60 group-hover:opacity-100">{movie.genre}</p>
                  <h3 className="text-white font-bold text-sm tracking-tight group-hover:text-[#d4af37] transition-colors duration-300">{movie.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-600 font-black tracking-[0.5em] uppercase text-xs">No Movies Found In This Genre</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default NowShowingPage;