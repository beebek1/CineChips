import React, { useState, useEffect } from 'react';
import {
  FaWallet, FaTicketAlt, FaFilm, FaArrowUp,
  FaChartLine, FaRegClock, FaCircle, FaUniversity,
  FaSpinner, FaChair, FaCalendarAlt, FaTag
} from 'react-icons/fa';
import { getShowTimes, getAllHalls, getAllMovie } from '../../services/api';

const OverviewMaster = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [halls, setHalls]         = useState([]);
  const [movies, setMovies]       = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [stRes, hRes, mRes] = await Promise.all([
          getShowTimes(),
          getAllHalls(),
          getAllMovie(),
        ]);
        setShowtimes(stRes?.data?.showtimes ?? stRes?.data?.schedules ?? stRes?.data ?? []);
        setHalls(hRes?.data?.halls ?? []);
        setMovies(mRes?.data?.movies ?? mRes?.data ?? []);
      } catch {
        // cards show zeros on failure
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // ── DERIVED STATS FROM SHOWTIME DATA ────────────────────────────────────────
  const now = new Date();

  // Total potential revenue: sum of (price * total_seats) per showtime
  const totalRevenue = showtimes.reduce((acc, s) => {
    const seats = (s.hallModel?.total_rows ?? 0) * (s.hallModel?.total_columns ?? 0);
    return acc + (Number(s.price) * seats);
  }, 0);

  // Total seat capacity across all scheduled shows
  const totalSeats = showtimes.reduce((acc, s) => {
    return acc + (s.hallModel?.total_rows ?? 0) * (s.hallModel?.total_columns ?? 0);
  }, 0);

  // Unique movies scheduled
  const uniqueMovieIds = new Set(showtimes.map(s => s.movie_id));

  // Live shows: show_date is today and show_time hasn't passed yet
  const liveShows = showtimes.filter(s => {
    const showDate = new Date(s.show_date);
    return (
      showDate.toDateString() === now.toDateString()
    );
  }).length;

  // Upcoming shows: show_date is in the future
  const upcomingShows = showtimes
    .filter(s => new Date(s.show_date) > now)
    .sort((a, b) => new Date(a.show_date) - new Date(b.show_date));

  // Genre breakdown from movies nested in showtimes
  const genreMap = {};
  showtimes.forEach(s => {
    if (s.Movie?.genre) {
      genreMap[s.Movie.genre] = (genreMap[s.Movie.genre] ?? 0) + 1;
    }
  });
  const topGenres = Object.entries(genreMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  // Hall usage: how many shows per hall
  const hallUsageMap = {};
  showtimes.forEach(s => {
    const name = s.hallModel?.name ?? `Hall ${s.hall_id}`;
    hallUsageMap[name] = (hallUsageMap[name] ?? 0) + 1;
  });
  const hallUsage = Object.entries(hallUsageMap).sort((a, b) => b[1] - a[1]);

  // Language breakdown
  const langMap = {};
  showtimes.forEach(s => {
    langMap[s.language] = (langMap[s.language] ?? 0) + 1;
  });
  const languages = Object.entries(langMap).sort((a, b) => b[1] - a[1]);

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatTime = (t) => {
    if (!t) return '—';
    const [h, m] = t.split(':');
    const hour = parseInt(h);
    return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
  };

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">

      {/* HEADER */}
      <div className="mb-12">
        <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">System Overview</h3>
        <h4 className="text-4xl font-light uppercase tracking-tighter">
          Welcome Back, <span className="font-black italic text-white">Admin</span>
        </h4>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        {/* Revenue */}
        <div className="bg-[#111] border border-white/5 p-8 rounded-[35px] hover:border-[#d4af37]/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 bg-[#d4af37]/10 rounded-2xl text-[#d4af37]"><FaWallet size={18} /></div>
            <span className="text-[#d4af37] text-[9px] font-black bg-[#d4af37]/10 px-3 py-1 rounded-full uppercase tracking-widest">
              Projected
            </span>
          </div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Revenue (NPR)</p>
          <p className="text-3xl font-black mt-1">Rs. {totalRevenue.toLocaleString()}</p>
          <p className="text-[9px] text-gray-600 mt-1 uppercase tracking-widest">Based on full house capacity</p>
        </div>

        {/* Total Seats */}
        <div className="bg-[#111] border border-white/5 p-8 rounded-[35px] hover:border-[#d4af37]/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-400"><FaChair size={18} /></div>
            <span className="text-blue-400 text-[9px] font-black bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest">
              Capacity
            </span>
          </div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Seats Scheduled</p>
          <p className="text-3xl font-black mt-1">{totalSeats.toLocaleString()}</p>
          <p className="text-[9px] text-gray-600 mt-1 uppercase tracking-widest">Across {showtimes.length} shows</p>
        </div>

        {/* Movies */}
        <div className="bg-[#111] border border-white/5 p-8 rounded-[35px] hover:border-[#d4af37]/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400"><FaFilm size={18} /></div>
            <span className="text-purple-400 text-[9px] font-black bg-purple-500/10 px-3 py-1 rounded-full uppercase tracking-widest">
              Active
            </span>
          </div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Movies Scheduled</p>
          <p className="text-3xl font-black mt-1">{uniqueMovieIds.size}</p>
          <p className="text-[9px] text-gray-600 mt-1 uppercase tracking-widest">{movies.length} total in library</p>
        </div>

        {/* Today's Shows */}
        <div className="bg-[#d4af37] p-8 rounded-[35px] text-black shadow-xl shadow-[#d4af37]/10 relative overflow-hidden group">
          <FaCircle className="absolute -top-4 -right-4 text-black/10 text-9xl group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <FaCircle className="text-red-600 animate-pulse" size={8} />
              <span className="text-[10px] font-black uppercase tracking-widest">Today</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Shows Today</p>
            <p className="text-5xl font-black mt-1 tracking-tighter">{liveShows}</p>
          </div>
        </div>
      </div>

      {/* SECONDARY ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Hall count */}
        <div className="bg-[#111] border border-white/5 p-8 rounded-[30px] flex items-center gap-6 hover:border-[#d4af37]/20 transition-all">
          <div className="p-5 bg-white/5 rounded-2xl text-[#d4af37]"><FaUniversity size={22} /></div>
          <div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Halls</p>
            <p className="text-4xl font-black">{halls.length}</p>
          </div>
        </div>

        {/* Upcoming shows count */}
        <div className="bg-[#111] border border-white/5 p-8 rounded-[30px] flex items-center gap-6 hover:border-[#d4af37]/20 transition-all">
          <div className="p-5 bg-white/5 rounded-2xl text-blue-400"><FaCalendarAlt size={22} /></div>
          <div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Upcoming Shows</p>
            <p className="text-4xl font-black">{upcomingShows.length}</p>
          </div>
        </div>

        {/* Avg ticket price */}
        <div className="bg-[#111] border border-white/5 p-8 rounded-[30px] flex items-center gap-6 hover:border-[#d4af37]/20 transition-all">
          <div className="p-5 bg-white/5 rounded-2xl text-green-400"><FaTag size={22} /></div>
          <div>
            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Avg Ticket Price</p>
            <p className="text-4xl font-black">
              Rs. {showtimes.length
                ? Math.round(showtimes.reduce((a, s) => a + Number(s.price), 0) / showtimes.length)
                : 0}
            </p>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* UPCOMING SHOWS TABLE */}
        <div className="lg:col-span-2 bg-[#111] border border-white/5 rounded-[40px] p-10">
          <div className="flex items-center justify-between mb-8">
            <h5 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
              <FaChartLine className="text-[#d4af37]" /> Upcoming Shows
            </h5>
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
              {upcomingShows.length} scheduled
            </span>
          </div>

          {upcomingShows.length === 0 ? (
            <p className="text-gray-600 text-xs uppercase tracking-widest text-center py-10">No upcoming shows.</p>
          ) : (
            <div className="space-y-1">
              {upcomingShows.slice(0, 6).map(s => (
                <div key={s.id} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group">
                  <div className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shrink-0" />
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight text-white">
                        {s.Movie?.title ?? '—'}
                      </p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">
                        {s.hallModel?.name ?? `Hall ${s.hall_id}`} · {s.language}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-white flex items-center gap-2 justify-end">
                      <FaRegClock size={9} className="text-[#d4af37]" />
                      {formatTime(s.show_time)}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase mt-0.5">
                      {formatDate(s.show_date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">

          {/* Hall Usage */}
          <div className="bg-[#111] border border-white/5 rounded-[35px] p-8">
            <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.4em] mb-6">Hall Usage</p>
            <div className="space-y-4">
              {hallUsage.length === 0 ? (
                <p className="text-gray-600 text-[10px] uppercase">No data.</p>
              ) : hallUsage.map(([name, count]) => {
                const pct = Math.round((count / showtimes.length) * 100);
                return (
                  <div key={name}>
                    <div className="flex justify-between mb-1.5">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 truncate pr-2">{name}</p>
                      <p className="text-[10px] font-black text-white shrink-0">{count} shows</p>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#d4af37] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Language Breakdown */}
          <div className="bg-[#111] border border-white/5 rounded-[35px] p-8">
            <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.4em] mb-6">Languages</p>
            <div className="space-y-3">
              {languages.map(([lang, count]) => (
                <div key={lang} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    <p className="text-xs font-black uppercase tracking-widest">{lang}</p>
                  </div>
                  <span className="text-[10px] font-black text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                    {count} show{count > 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OverviewMaster;