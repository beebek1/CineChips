import React from 'react';
import {Link} from 'react-router-dom'
import { 
  FaPlay, FaInfoCircle, FaStar, FaClock, 
  FaCalendarAlt, FaArrowRight, FaTicketAlt 
} from 'react-icons/fa';

// --- FAKE API DATA ---
const MOVIES_DATA = {
  nowShowing: [
    {
      "id": 1,
      "title": "DUNE: PART II",
      "genre": "action, Thriller",
      "description": "this is god level movie you should watch",
      "poster": "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500",
      "schedules": [
        {
          "fullDate": "2026-02-14",
          "halls": [
            {
              "name": "QFX",
              "location": "Bhaktapur",
              "price": 300,
              "showings": [
                { "language": "English", "slots": ["10:00 AM", "1:30 PM", "7:00 PM"] },
                { "language": "Nepali", "slots": ["4:00 PM"] }
              ]
            },
            {
              "name": "Fcube",
              "location": "Kirtipur",
              "price": 200,
              "showings": [
                { "language": "English", "slots": ["11:00 AM", "8:30 PM"] }
              ]
            }
          ]
        },
        {
          "fullDate": "2026-02-15",
          "halls": [
            {
              "name": "BigMovies",
              "location": "Sanothimi",
              "price": 400,
              "showings": [
                { "language": "Marathi", "slots": ["2:00 PM", "6:00 PM"] }
              ]
            }
          ]
        }
      ]
    },


    { id: 2, title: "The Batman", rating: "8.5", poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500", year: "2022" },
    { id: 3, title: "Interstellar", rating: "8.7", poster: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=500", year: "2014" },
    { id: 4, title: "Top Gun: Maverick", rating: "8.3", poster: "https://images.unsplash.com/photo-1504462385-74843b233a73?w=500", year: "2022" },
    { id: 5, isViewAll: true }
  ],
  upcoming: [
    { id: 6, title: "Joker: Folie à Deux", date: "OCT 04", poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=500" },
    { id: 7, title: "Gladiator II", date: "NOV 22", poster: "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=500" },
    { id: 8, title: "Deadpool & Wolverine", date: "JUL 26", poster: "https://images.unsplash.com/photo-1620336655055-088d06e36bf0?w=500" },
    { id: 9, title: "Moana 2", date: "NOV 27", poster: "https://images.unsplash.com/photo-1559584839-0ca97af24836?w=500" },
    { id: 10, isViewAll: true }
  ]
};

// --- COMPONENT: MOVIE CARD ---
const MovieCard = ({ movie, isUpcoming = false }) => {
  // If this is the "View All" placeholder card
  if (movie.isViewAll) {
    return (
      <div className="relative group cursor-pointer aspect-[2/3] rounded-[32px] overflow-hidden border border-[#d4af37]/30 bg-[#111] transition-all duration-500 hover:bg-[#d4af37]">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[#d4af37] group-hover:text-black font-black text-[11px] tracking-[0.4em] uppercase mb-4 transition-colors">View All</span>
          <div className="w-12 h-12 rounded-full border-2 border-[#d4af37] group-hover:border-black flex items-center justify-center transition-colors">
            <FaArrowRight className="text-[#d4af37] group-hover:text-black text-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group cursor-pointer aspect-[2/3] rounded-[32px] overflow-hidden border border-white/5 bg-[#111] transition-all duration-500 hover:shadow-2xl hover:shadow-[#d4af37]/10 hover:border-[#d4af37]/30">
      <img 
        src={movie.poster} 
        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 group-hover:blur-[4px] transition-all duration-700" 
        alt={movie.title} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-90 group-hover:opacity-20 transition-opacity"></div>

      {/* Action Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 px-4">
        <div className="space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 w-full flex flex-col items-center">
          {isUpcoming ? 
            <> 
              <button className="cursor-pointer w-full max-w-[140px] bg-[#d4af37] text-black font-black py-3 rounded-xl text-[9px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                <FaTicketAlt size={10}/> <p> Notify Me </p>
              </button>
            </>:<>
              <button className="cursor-pointer w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all">
                <FaPlay className="ml-1 text-[10px]" />
              </button>
              <Link className="cursor-pointer w-full max-w-[140px] bg-[#d4af37] text-black font-black py-3 rounded-xl text-[9px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                to={`/datebooking/${movie.id}`}
                state={{movie}}
              >
                <FaTicketAlt size={10} />
                Book Now
              </Link>
            </>
          }
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 group-hover:opacity-0 transition-opacity duration-300">
        {isUpcoming ? (
           <span className="text-[#d4af37] text-[9px] font-black tracking-widest uppercase mb-1 block">{movie.date}</span>
        ) : (
          <div className="flex items-center gap-2 mb-1">
            <FaStar className="text-[#d4af37] text-[10px]" />
            <span className="text-white text-[10px] font-bold">{movie.rating}</span>
          </div>
        )}
        <h3 className="text-white font-black text-xs tracking-widest uppercase truncate">{movie.title}</h3>
      </div>
    </div>
  );
};

// --- MAIN HOME COMPONENT ---
const MovieHome = () => {
  return (
    <div className="min-h-screen bg-[#080808] font-sans text-white">
      
      {/* 00. HERO SECTION */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920&fit=crop" className='w-full h-full object-cover opacity-60' alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent"></div>
        </div>
        <div className='relative h-full max-w-7xl mx-auto px-8 flex items-center pt-20'>
          <div className='max-w-2xl space-y-8'>
            <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse"></span>
              <span className='text-gray-400 text-[10px] font-black tracking-[0.3em] uppercase'>Featured Premiere</span>
            </div>
            <h1 className='text-white text-6xl md:text-8xl font-light tracking-tighter leading-none uppercase'>DUNE: <span className='font-black'>PART II</span></h1>
            <div className='flex items-center space-x-8 text-[11px] font-black tracking-[0.2em] text-gray-500 uppercase'>
              <div className='flex items-center space-x-2'><FaStar className='text-[#d4af37]' /> <span className='text-white'>8.9</span></div>
              <div className='flex items-center space-x-2'><FaClock className='text-[#d4af37]' /> <span>2h 46min</span></div>
              <div className='flex items-center space-x-2'><FaCalendarAlt className='text-[#d4af37]' /> <span>2024</span></div>
            </div>
            <p className='text-gray-500 text-sm leading-relaxed max-w-lg font-medium italic'>The mythic journey of Paul Atreides as he unites with Chani and the Fremen on a warpath of revenge.</p>
            <div className='flex space-x-5 pt-4'>
              <button className='cursor-pointer flex items-center space-x-3 bg-[#d4af37] text-black font-black px-10 py-4 rounded-xl text-[10px] tracking-[0.2em] uppercase transition-all hover:bg-[#b8962d]'>
                <FaTicketAlt className='w-2.5 h-2.5' /> <span>Book Now</span>
              </button>
              <button className='cursor-pointer flex items-center space-x-3 bg-white/5 text-white font-black px-10 py-4 rounded-xl border border-white/10 text-[10px] tracking-[0.2em] uppercase hover:bg-white/10'>
                <FaPlay className='w-2.5 h-2.5' /> <span>Watch Trailer</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 01. NOW SHOWING */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex items-end space-x-4 mb-16">
          <h2 className="text-8xl font-black text-white/[0.03] tracking-tighter leading-none select-none uppercase">01</h2>
          <div className="pb-2">
            <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">In Theaters</h3>
            <h4 className="text-white text-3xl font-light tracking-tighter uppercase italic">Now <span className="font-black">Showing</span></h4>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {MOVIES_DATA.nowShowing.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* 02. UPCOMING RELEASES */}
      <section className="max-w-7xl mx-auto px-8 py-24 border-t border-white/5">
        <div className="flex items-end space-x-4 mb-16">
          <h2 className="text-8xl font-black text-white/[0.03] tracking-tighter leading-none select-none uppercase">02</h2>
          <div className="pb-2">
            <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">Coming Soon</h3>
            <h4 className="text-white text-3xl font-light tracking-tighter uppercase italic">Upcoming <span className="font-black">Releases</span></h4>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {MOVIES_DATA.upcoming.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isUpcoming={true} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MovieHome;