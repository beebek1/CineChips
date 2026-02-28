import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { getShowTimes } from "../../services/api";

const IMAGE_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');

const getCoverUrl = (filename) => {
  if (!filename) return null;
  if (filename.startsWith('http')) return filename;
  return `${IMAGE_BASE}/uploads/${filename}`;
};

// Transform flat showtime records for one movie into the nested structure the UI needs:
// schedules = [ { fullDate, halls: [ { name, location, price, hallId, showings: [ { language, slots: [ { time, showtimeId } ] } ] } ] } ]
const buildSchedules = (showtimes) => {
  const dateMap = {};

  showtimes.forEach(s => {
    const date = s.show_date.split('T')[0]; // YYYY-MM-DD
    if (!dateMap[date]) dateMap[date] = {};

    const hallKey = s.hall_id;
    if (!dateMap[date][hallKey]) {
      dateMap[date][hallKey] = {
        hallId:   s.hall_id,
        name:     s.hallModel?.name     ?? `Hall ${s.hall_id}`,
        location: s.hallModel?.location ?? '',
        price:    s.price,
        langMap:  {}
      };
    }

    const lang = s.language;
    if (!dateMap[date][hallKey].langMap[lang]) {
      dateMap[date][hallKey].langMap[lang] = [];
    }
    dateMap[date][hallKey].langMap[lang].push({
      time:       s.show_time.slice(0, 5), // HH:MM
      showtimeId: s.id,
    });
  });

  return Object.entries(dateMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([fullDate, hallsMap]) => ({
      fullDate,
      halls: Object.values(hallsMap).map(h => ({
        hallId:   h.hallId,
        name:     h.name,
        location: h.location,
        price:    h.price,
        showings: Object.entries(h.langMap).map(([language, slots]) => ({
          language,
          slots,
        })),
      })),
    }));
};

const formatTime = (t) => {
  const [h, m] = t.split(':');
  const hour = parseInt(h);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
};

const MovieBookingDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const movie    = location.state?.movie;

  const [schedules, setSchedules]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedHall, setSelectedHall]         = useState(null);
  const [selectedShowing, setSelectedShowing]   = useState(null);
  const [selectedSlot, setSelectedSlot]         = useState(null);

  // Fetch and transform showtimes for this movie
  useEffect(() => {
    if (!movie) return;

    const fetch = async () => {
      setLoading(true);
      try {
        const res  = await getShowTimes();
        const raw  = res?.data?.showtimes ?? res?.data?.schedules ?? res?.data ?? [];
        const mine = raw.filter(s => String(s.movie_id) === String(movie.id));
        const built = buildSchedules(mine);
        setSchedules(built);

        // Auto-select first date
        if (built.length > 0) setSelectedSchedule(built[0]);
      } catch {
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [movie]);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    const days   = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    return { day: days[d.getDay()], date: d.getDate(), month: months[d.getMonth()] };
  };

  const onclickHandler = () => {
    const bookingSummary = {
      movieId:    movie.id,
      movieTitle: movie.title,
      genre:      movie.genre,
      schedule:   selectedSchedule,
      hall:       selectedHall,
      showing:    selectedShowing,
      slot:       selectedSlot,
      showtimeId: selectedSlot?.showtimeId,
    };
    localStorage.setItem('activeBooking', JSON.stringify(bookingSummary));
    navigate(`/seatbooking/${movie.id}`);
  };

  if (!movie) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <button onClick={() => navigate('/')} className="text-[#d4af37] border border-[#d4af37] px-6 py-2 rounded cursor-pointer">
        No Movie Selected. Return Home
      </button>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
    </div>
  );

  if (schedules.length === 0) return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500 text-xs uppercase tracking-widest font-black">No showtimes available for this movie.</p>
      <button onClick={() => navigate(-1)} className="text-[#d4af37] border border-[#d4af37]/40 px-6 py-2 rounded cursor-pointer text-xs uppercase tracking-widest font-black">
        Go Back
      </button>
    </div>
  );

  const isAllSelected = selectedSchedule && selectedHall && selectedShowing && selectedSlot;
  const posterUrl     = getCoverUrl(movie.coverPic);

  return (
    <div className="min-h-screen bg-[#080808] text-gray-200 font-sans pb-20">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-50 p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white cursor-pointer hover:bg-[#d4af37] hover:text-black transition-all active:scale-90"
      >
        <MdArrowBack size={24} />
      </button>

      {/* Hero Section */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, #080808), url('${posterUrl ?? 'https://picsum.photos/1920/1080?random=1'}')`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-10 items-end w-full text-left">
            {posterUrl && (
              <div className="hidden md:block w-48 shrink-0 rounded-xl overflow-hidden border border-white/5 shadow-2xl">
                <img
                  src={posterUrl}
                  alt="Poster"
                  className="w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex gap-3 mb-4 text-[10px] font-bold uppercase tracking-widest">
                <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400">{movie.genre}</span>
                <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400">{movie.duration} min</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-light mb-2 tracking-tight text-white uppercase leading-tight capitalize">
                {movie.title.includes(':') ? (
                  <>{movie.title.split(':')[0]}:<br /><span className="font-bold">{movie.title.split(':')[1]}</span></>
                ) : movie.title}
              </h1>
              <p className="text-gray-500 max-w-2xl text-sm leading-relaxed italic">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          <div className="lg:col-span-8 space-y-12 text-left">

            {/* 01. DATE */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600">01. Select Date</h2>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {schedules.map((schedule, idx) => {
                  const f = formatDate(schedule.fullDate);
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedSchedule(schedule);
                        setSelectedHall(null);
                        setSelectedShowing(null);
                        setSelectedSlot(null);
                      }}
                      className={`cursor-pointer flex-shrink-0 w-16 py-4 rounded-xl transition-all border active:scale-95 ${
                        selectedSchedule?.fullDate === schedule.fullDate
                          ? "bg-white text-black border-white"
                          : "bg-white/5 border-white/5 text-gray-500 hover:border-white/20"
                      }`}
                    >
                      <div className="text-[9px] font-bold uppercase mb-1">{f.day}</div>
                      <div className="text-xl font-bold">{f.date}</div>
                      <div className="text-[9px] font-bold uppercase mt-0.5 opacity-60">{f.month}</div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 02. CINEMAS */}
            <section className={!selectedSchedule ? "opacity-20 pointer-events-none" : ""}>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600">02. Cinemas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSchedule?.halls.map((hall, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedHall(hall); setSelectedShowing(null); setSelectedSlot(null); }}
                    className={`cursor-pointer p-6 rounded-2xl text-left transition-all border active:scale-[0.98] ${
                      selectedHall?.hallId === hall.hallId
                        ? "bg-[#111] border-[#d4af37]/60"
                        : "bg-white/5 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`font-bold ${selectedHall?.hallId === hall.hallId ? 'text-[#d4af37]' : 'text-white'}`}>
                        {hall.name}
                      </h3>
                      <span className="text-xs font-bold text-gray-500">Rs. {hall.price}</span>
                    </div>
                    <p className="text-xs text-gray-600">{hall.location}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* 03. LANGUAGE */}
            <section className={!selectedHall ? "opacity-20 pointer-events-none" : ""}>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600">03. Language</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedHall?.showings.map((show, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedShowing(show); setSelectedSlot(null); }}
                    className={`cursor-pointer p-4 rounded-xl transition-all border flex items-center gap-4 active:scale-95 ${
                      selectedShowing?.language === show.language
                        ? "bg-[#111] border-[#d4af37]/60"
                        : "bg-white/5 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs ${
                      selectedShowing?.language === show.language ? "bg-[#d4af37] text-black" : "bg-white/5 text-gray-500"
                    }`}>
                      {show.language.substring(0, 2).toUpperCase()}
                    </div>
                    <h3 className="text-sm font-bold text-white leading-none">{show.language}</h3>
                  </button>
                ))}
              </div>
            </section>

            {/* 04. SHOWTIMES */}
            <section className={!selectedShowing ? "opacity-20 pointer-events-none" : ""}>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600">04. Showtimes</h2>
              <div className="flex flex-wrap gap-3">
                {selectedShowing?.slots.map((slot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSlot(slot)}
                    className={`cursor-pointer px-8 py-3 rounded-full text-xs font-bold tracking-widest transition-all border active:scale-90 ${
                      selectedSlot?.showtimeId === slot.showtimeId
                        ? "bg-[#d4af37] border-[#d4af37] text-black"
                        : "bg-transparent border-white/10 text-gray-500 hover:border-[#d4af37]/50"
                    }`}
                  >
                    {formatTime(slot.time)}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* CHECKOUT CARD */}
          <div className="lg:col-span-4 text-left">
            <div className="sticky top-24 bg-[#111] rounded-3xl p-8 border border-white/5 shadow-2xl">
              <div className="flex items-center gap-2 mb-10">
                <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500">Booking Summary</h3>
              </div>

              <div className="space-y-8 mb-12">
                <div>
                  <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Cinema</p>
                  <p className="text-white font-medium">
                    {selectedHall ? `${selectedHall.name}, ${selectedHall.location}` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Language</p>
                  <p className="text-white font-medium">{selectedShowing?.language ?? "—"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Date & Time</p>
                  <p className="text-white font-medium">
                    {selectedSchedule && selectedSlot
                      ? `${formatDate(selectedSchedule.fullDate).date} ${formatDate(selectedSchedule.fullDate).month}, ${formatTime(selectedSlot.time)}`
                      : "—"}
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-between items-end mb-10">
                <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Price</span>
                <span className="text-3xl font-light text-white">Rs. {selectedHall?.price ?? "0"}</span>
              </div>

              <button
                disabled={!isAllSelected}
                onClick={onclickHandler}
                className={`cursor-pointer w-full py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 active:scale-95 ${
                  isAllSelected
                    ? "bg-white text-black hover:bg-[#d4af37]"
                    : "bg-white/5 text-gray-700 cursor-not-allowed border border-white/5"
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