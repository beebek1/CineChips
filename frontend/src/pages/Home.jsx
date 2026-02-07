import { FaPlay, FaInfoCircle, FaStar, FaClock, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

const MovieHome = () => {
  return (
    <div className="min-h-screen bg-[#080808] font-sans text-white">
      
      {/* 00. THE HERO POSTER */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&fit=crop"
            alt="Hero" 
            className='w-full h-full object-cover opacity-60'
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent"></div>
        </div>

        <div className='relative h-full max-w-7xl mx-auto px-8 flex items-center pt-20'>
          <div className='max-w-2xl space-y-8'>
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse"></span>
              <span className='text-gray-400 text-[10px] font-black tracking-[0.3em] uppercase'>Featured Premiere</span>
            </div>

            <h1 className='text-white text-6xl md:text-8xl font-light tracking-tighter leading-none'>
              DUNE: <span className='font-black'>PART II</span>
            </h1>

            <div className='flex items-center space-x-8 text-[11px] font-black tracking-[0.2em] text-gray-500 uppercase'>
              <div className='flex items-center space-x-2'>
                <FaStar className='text-[#d4af37]' />
                <span className='text-white'>8.9</span>
              </div>
              <div className='flex items-center space-x-2'>
                <FaClock className='text-[#d4af37]' />
                <span>2h 46min</span>
              </div>
              <div className='flex items-center space-x-2'>
                <FaCalendarAlt className='text-[#d4af37]' />
                <span>2024</span>
              </div>
            </div>

            <p className='text-gray-500 text-sm leading-relaxed max-w-lg font-medium'>
              The mythic journey of Paul Atreides as he unites with Chani and the Fremen on a warpath of revenge against the conspirators who destroyed his family.
            </p>

            <div className='flex space-x-5 pt-4'>
              <button className='cursor-pointer flex items-center space-x-3 bg-[#d4af37] text-black font-black px-10 py-4 rounded-xl text-[10px] tracking-[0.2em] uppercase transition-all hover:bg-[#b8962d]'>
                <FaPlay className='w-3 h-3' />
                <span>Book Now</span>
              </button>
              <button className='cursor-pointer flex items-center space-x-3 bg-white/5 text-white font-black px-10 py-4 rounded-xl border border-white/10 text-[10px] tracking-[0.2em] uppercase hover:bg-white/10'>
                <FaInfoCircle className='w-3 h-3' />
                <span>Details</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 01. NOW SHOWING (With See More on last card) */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex items-end space-x-4 mb-16">
          <h2 className="text-8xl font-black text-white/[0.03] tracking-tighter leading-none select-none">01</h2>
          <div className="pb-2">
            <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">In Theaters</h3>
            <h4 className="text-white text-3xl font-light tracking-tighter">NOW <span className="font-black">SHOWING</span></h4>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="relative group cursor-pointer aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 transition-all duration-700 hover:border-[#d4af37]/40">
              <img src={`https://picsum.photos/300/450?random=${item}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" alt="movie" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent"></div>
              <div className="absolute bottom-0 p-5">
                <h3 className="text-white font-bold text-xs tracking-widest uppercase">MOVIE TITLE {item}</h3>
              </div>

              {/* SEE MORE OVERLAY FOR NOW SHOWING (Card 5) */}
              {item === 5 && (
                <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/90 transition-all duration-500 flex flex-col items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex flex-col items-center">
                    <span className="text-black font-black text-[11px] tracking-[0.4em] uppercase mb-4">View All</span>
                    <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
                      <FaArrowRight className="text-black text-xl" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 02. UPCOMING RELEASES (With See More on last card) */}
      <section className="max-w-7xl mx-auto px-8 py-24 border-t border-white/5">
        <div className="flex items-end space-x-4 mb-16">
          <h2 className="text-8xl font-black text-white/[0.03] tracking-tighter leading-none select-none">02</h2>
          <div className="pb-2">
            <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">Coming Soon</h3>
            <h4 className="text-white text-3xl font-light tracking-tighter">UPCOMING <span className="font-black">RELEASES</span></h4>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="relative group cursor-pointer aspect-[2/3] rounded-2xl overflow-hidden border border-white/5 transition-all duration-700 hover:border-[#d4af37]/40">
              <img src={`https://picsum.photos/300/450?random=${item + 10}`} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" alt="upcoming" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent opacity-80"></div>
              
              <div className="absolute bottom-0 p-5">
                <span className="text-[#d4af37] text-[9px] font-black tracking-[0.2em] uppercase">FEB {15 + item}</span>
                <h3 className="text-white font-bold text-xs tracking-widest uppercase mt-1">UPCOMING {item}</h3>
              </div>

              {/* SEE MORE OVERLAY FOR UPCOMING (Card 5) */}
              {item === 5 && (
                <div className="absolute inset-0 bg-[#d4af37]/0 group-hover:bg-[#d4af37]/90 transition-all duration-500 flex flex-col items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex flex-col items-center">
                    <span className="text-black font-black text-[11px] tracking-[0.4em] uppercase mb-4">See More</span>
                    <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center">
                      <FaArrowRight className="text-black text-xl" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default MovieHome;