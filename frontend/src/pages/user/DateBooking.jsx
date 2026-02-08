import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { MdLocationOn, MdLanguage, MdAccessTime } from "react-icons/md";

const MovieBookingDashboard = () => {
  const location = useLocation();
  const movie = location.state?.movie; // Extracting the movie object passed via Link
    console.log(movie)

  // 1. STATE MANAGEMENT
  // We store the specific objects or strings to make it easier to drill down
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [selectedShowing, setSelectedShowing] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Helper to format the Date for the UI (e.g., "2026-02-14" -> {day: "SAT", date: "14"})
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return {
      day: days[d.getDay()],
      date: d.getDate(),
      month: months[d.getMonth()]
    };
  };

  // 2. RESET LOGIC (When parent selection changes, children must reset)
  const handleDateSelect = (schedule) => {
    setSelectedSchedule(schedule);
    setSelectedHall(null);
    setSelectedShowing(null);
    setSelectedSlot(null);
  };

  const handleHallSelect = (hall) => {
    setSelectedHall(hall);
    setSelectedShowing(null);
    setSelectedSlot(null);
  };

  const handleLanguageSelect = (showing) => {
    setSelectedShowing(showing);
    setSelectedSlot(null);
  };

  // Safety check if user refreshes page or navigates directly
  if (!movie) {
    return <div className="min-h-screen bg-[#080808] flex items-center justify-center text-white">No Movie Selected</div>;
  }

  const isAllSelected = selectedSchedule && selectedHall && selectedShowing && selectedSlot;

  return (
    <div className="min-h-screen bg-[#080808] text-gray-200 font-sans">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `linear-gradient(to bottom, transparent, #080808), url('${movie.poster}')` }}
        />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-10 items-end w-full">
            <div className="hidden md:block w-40 shrink-0 rounded-xl overflow-hidden border border-white/5 shadow-2xl">
              <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-left">
              <div className="flex gap-3 mb-4 text-[10px] font-bold uppercase tracking-widest">
                <span className="border border-[#d4af37]/40 text-[#d4af37] px-2 py-1 rounded">IMAX 2D</span>
                <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400">{movie.genre}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-2 tracking-tighter text-white uppercase">
                {movie.title}
              </h1>
              <p className="text-gray-500 max-w-2xl text-sm leading-relaxed italic">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-12 text-left">
            
            {/* 1. DATE SELECTION */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600 italic">01. Select Date</h2>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {movie.schedules.map((schedule, idx) => {
                  const f = formatDate(schedule.fullDate);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleDateSelect(schedule)}
                      className={`flex-shrink-0 w-16 py-4 rounded-xl transition-all border ${
                        selectedSchedule?.fullDate === schedule.fullDate ? "bg-white text-black border-white" : "bg-white/5 border-white/5 text-gray-500 hover:border-white/20"
                      }`}
                    >
                      <div className="text-[9px] font-bold uppercase mb-1">{f.day}</div>
                      <div className="text-xl font-bold">{f.date}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 2. CINEMA HALL SELECTION */}
            <section className={!selectedSchedule ? "opacity-20 pointer-events-none" : ""}>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600 italic">02. Cinema Halls</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSchedule?.halls.map((hall, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleHallSelect(hall)}
                    className={`p-6 rounded-2xl text-left transition-all border ${
                      selectedHall?.name === hall.name ? "bg-[#111] border-[#d4af37]/60" : "bg-white/5 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`font-bold ${selectedHall?.name === hall.name ? 'text-[#d4af37]' : 'text-white'}`}>{hall.name}</h3>
                      <span className="text-xs font-bold text-gray-500">Rs. {hall.price}</span>
                    </div>
                    <p className="text-xs text-gray-600 uppercase tracking-widest">{hall.location}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* 3. LANGUAGE SELECTION */}
            <section className={!selectedHall ? "opacity-20 pointer-events-none" : ""}>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600 italic">03. Language</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedHall?.showings.map((show, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLanguageSelect(show)}
                    className={`p-4 rounded-xl transition-all border flex items-center gap-4 ${
                      selectedShowing?.language === show.language ? "bg-[#111] border-[#d4af37]/60" : "bg-white/5 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs ${
                      selectedShowing?.language === show.language ? "bg-[#d4af37] text-black" : "bg-white/5 text-gray-500"
                    }`}>
                      {show.language.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-none">{show.language}</h3>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* 4. SHOWTIMES */}
            <section className={!selectedShowing ? "opacity-20 pointer-events-none" : ""}>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600 italic">04. Slots</h2>
              <div className="flex flex-wrap gap-3">
                {selectedShowing?.slots.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest transition-all border ${
                      selectedSlot === slot ? "bg-[#d4af37] border-[#d4af37] text-black" : "bg-transparent border-white/10 text-gray-500 hover:border-[#d4af37]/50"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* 5. DYNAMIC CHECKOUT CARD */}
          <div className="lg:col-span-4 text-left">
            <div className="sticky top-24 bg-[#111] rounded-3xl p-8 border border-white/5">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-600 mb-10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span> Summary
              </h3>

              <div className="space-y-8 mb-12">
                <div>
                   <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Cinema Hall</p>
                   <p className="text-white font-medium">{selectedHall ? `${selectedHall.name}, ${selectedHall.location}` : "—"}</p>
                </div>
                <div>
                   <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Language Option</p>
                   <p className="text-white font-medium">{selectedShowing?.language || "—"}</p>
                </div>
                <div>
                   <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Date & Time</p>
                   <p className="text-white font-medium">
                    {selectedSchedule && selectedSlot ? 
                      `${formatDate(selectedSchedule.fullDate).date} ${formatDate(selectedSchedule.fullDate).month}, ${selectedSlot}` : "—"}
                   </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-between items-end mb-10">
                <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Ticket Price</span>
                <span className="text-3xl font-light text-white">Rs. {selectedHall?.price || "0"}</span>
              </div>

              <button
                disabled={!isAllSelected}
                className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                  isAllSelected ? "bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20" : "bg-white/5 text-gray-700 cursor-not-allowed"
                }`}
              >
                Proceed to Seats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBookingDashboard;