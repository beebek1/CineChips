import React, { useState, useMemo } from 'react';
import { FaFilter, FaThLarge, FaChevronDown, FaBell, FaInfoCircle, FaCalendarAlt } from 'react-icons/fa';

const UpcomingPage = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample Data for Upcoming
  const upcomingData = useMemo(() => [
    { id: 1, title: "THE MARS MISSION", date: "MAR 12", genre: "SCI-FI", image: "https://picsum.photos/300/450?random=41" },
    { id: 2, title: "GOTHAM NIGHTS", date: "MAR 28", genre: "ACTION", image: "https://picsum.photos/300/450?random=42" },
    { id: 3, title: "SILENT ECHO", date: "APR 05", genre: "DRAMA", image: "https://picsum.photos/300/450?random=43" },
    { id: 4, title: "NEON VELOCITY", date: "APR 12", genre: "THRILLER", image: "https://picsum.photos/300/450?random=44" },
    { id: 5, title: "VOID RUNNER", date: "MAY 02", genre: "SCI-FI", image: "https://picsum.photos/300/450?random=45" },
    { id: 6, title: "LAST SURVIVOR", date: "MAY 15", genre: "ACTION", image: "https://picsum.photos/300/450?random=46" },
    { id: 7, title: "PIANO MAN", date: "JUN 01", genre: "DRAMA", image: "https://picsum.photos/300/450?random=47" },
    { id: 8, title: "COLD PURSUIT", date: "JUN 10", genre: "THRILLER", image: "https://picsum.photos/300/450?random=48" },
  ], []);

  const genres = ['ALL', 'ACTION', 'SCI-FI', 'DRAMA', 'THRILLER'];

  const filteredMovies = activeFilter === 'ALL' 
    ? upcomingData 
    : upcomingData.filter(movie => movie.genre === activeFilter);

  return (
    <div className="min-h-screen bg-[#080808] font-sans text-white pt-32 pb-24">
      
      {/* Page Header */}
      <header className="max-w-7xl mx-auto px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-end space-x-4 mb-4">
              <h1 className="text-8xl font-black text-white/[0.03] tracking-tighter leading-none select-none">CC</h1>
              <div className="pb-2">
                <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">Coming Soon</h3>
                <h2 className="text-white text-5xl font-light tracking-tighter">FUTURE <span className="font-black">RELEASES</span></h2>
              </div>
            </div>
            <p className="text-gray-500 text-sm max-w-md tracking-wide">
              Secure your spot for the most anticipated titles of 2026. Set reminders and stay ahead of the premiere.
            </p>
          </div>

          {/* Filter Bar */}
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

      {/* Movie Grid */}
      <main className="max-w-7xl mx-auto px-8">
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
                {/* Poster Container */}
                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 transition-all duration-700 hover:border-[#d4af37]/40 mb-5">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent opacity-90"></div>
                  
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center space-x-2">
                    <FaCalendarAlt className="text-[#d4af37] text-[10px]" />
                    <span className="text-white text-[9px] font-black tracking-widest uppercase">{movie.date}</span>
                  </div>

                  {/* Dual Action Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/50 backdrop-blur-[2px]">
                     <button className="cursor-pointer bg-white text-black font-black text-[9px] tracking-[0.2em] w-36 py-3 rounded-lg uppercase shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all hover:bg-[#d4af37] flex items-center justify-center space-x-2">
                       <FaInfoCircle className="text-[10px]" />
                       <span>View Details</span>
                     </button>
                     <button className="cursor-pointer bg-white/10 text-white font-black text-[9px] tracking-[0.2em] w-36 py-3 rounded-lg uppercase backdrop-blur-md border border-white/10 transform translate-y-6 group-hover:translate-y-0 transition-all hover:bg-white hover:text-black flex items-center justify-center space-x-2">
                       <FaBell className="text-[10px]" />
                       <span>Remind Me</span>
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
            <p className="text-gray-600 font-black tracking-[0.5em] uppercase text-xs">No Upcoming Releases Found</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default UpcomingPage;