import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { useMovieBookingDashboard } from "../hooks/useMovieBookingsDashboard";
import { formatDateCard, getCoverUrl } from "../booking.utils";
import type { MovieLite } from "../booking.types";

const MovieBookingDashboardPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = (location.state?.movie as MovieLite) || undefined;

  const {
    schedules,
    loading,
    selectedSchedule,
    selectedHall,
    selectedShowing,
    selectedSlot,
    setSelectedSlot,
    chooseSchedule,
    chooseHall,
    chooseShowing,
    isAllSelected,
  } = useMovieBookingDashboard(movie);

  const onProceed = () => {
    if (!movie) return;
    const bookingSummary = {
      movieId: movie.movie_id,
      movieTitle: movie.title,
      genre: movie.genre,
      schedule: selectedSchedule,
      hall: selectedHall,
      showing: selectedShowing,
      slot: selectedSlot,
      showtimeId: selectedSlot?.showtimeId,
    };
    localStorage.setItem("activeBooking", JSON.stringify(bookingSummary));
    navigate(`/seatbooking/${movie.movie_id}`);
  };

  if (!movie) return <div className="min-h-screen bg-[#080808] flex items-center justify-center"><button onClick={() => navigate("/")} className="text-[#d4af37] border border-[#d4af37] px-6 py-2 rounded cursor-pointer">No Movie Selected. Return Home</button></div>;
  if (loading) return <div className="min-h-screen bg-[#080808] flex items-center justify-center"><FaSpinner className="animate-spin text-[#d4af37] text-3xl" /></div>;
  if (schedules.length === 0) return <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-4"><p className="text-gray-500 text-xs uppercase tracking-widest font-black">No showtimes available for this movie.</p><button onClick={() => navigate(-1)} className="text-[#d4af37] border border-[#d4af37]/40 px-6 py-2 rounded cursor-pointer text-xs uppercase tracking-widest font-black">Go Back</button></div>;

  const posterUrl = getCoverUrl(movie.coverPic);

  return (
    <div className="min-h-screen bg-[#080808] text-gray-200 font-sans pb-20">
      <button onClick={() => navigate(-1)} className="fixed top-8 left-8 z-50 p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white cursor-pointer hover:bg-[#d4af37] hover:text-black transition-all active:scale-90"><MdArrowBack size={24} /></button>

      <div className="relative h-[55vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `linear-gradient(to bottom, transparent, #080808), url('${posterUrl ?? "https://picsum.photos/1920/1080?random=1"}')` }} />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-10 items-end w-full text-left">
            {posterUrl && <div className="hidden md:block w-48 shrink-0 rounded-xl overflow-hidden border border-white/5 shadow-2xl"><img src={posterUrl} alt="Poster" className="w-full h-full object-cover" /></div>}
            <div className="flex-1">
              <div className="flex gap-3 mb-4 text-[10px] font-bold uppercase tracking-widest">
                <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400">{movie.genre}</span>
                <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400">{movie.duration} min</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-light mb-2 tracking-tight text-white uppercase leading-tight capitalize">{movie.title}</h1>
              <p className="text-gray-500 max-w-2xl text-sm leading-relaxed italic">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12 text-left">
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600">01. Select Date</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {schedules.map((schedule, idx) => {
                  const f = formatDateCard(schedule.fullDate);
                  return (
                    <button key={idx} onClick={() => chooseSchedule(schedule)} className={`cursor-pointer flex-shrink-0 w-16 py-4 rounded-xl transition-all border active:scale-95 ${selectedSchedule?.fullDate === schedule.fullDate ? "bg-white text-black border-white" : "bg-white/5 border-white/5 text-gray-500 hover:border-white/20"}`}>
                      <div className="text-[9px] font-bold uppercase mb-1">{f.day}</div><div className="text-xl font-bold">{f.date}</div><div className="text-[9px] font-bold uppercase mt-0.5 opacity-60">{f.month}</div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 text-left">
            <div className="sticky top-24 bg-[#111] rounded-3xl p-8 border border-white/5 shadow-2xl">
              <button disabled={!isAllSelected} onClick={onProceed} className={`cursor-pointer w-full py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 active:scale-95 ${isAllSelected ? "bg-white text-black hover:bg-[#d4af37]" : "bg-white/5 text-gray-700 cursor-not-allowed border border-white/5"}`}>Proceed to Seats</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBookingDashboardPage;