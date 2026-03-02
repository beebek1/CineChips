import React, { useState, useEffect } from 'react';
import { 
  FaTrash, FaEdit, FaTimes, FaSpinner, FaTag, FaExclamationTriangle,
  FaFilm, FaUniversity, FaCalendarAlt, FaClock, FaGlobe
} from 'react-icons/fa';
import { addShowTimeApi, deleteSchedule, getShowTimes, getAllHalls, getAllMovie } from '../../services/api';
import toast from 'react-hot-toast';

const LANGUAGES = ['English', 'Nepali', 'Hindi'];

const defaultForm = {
  movieId: '',
  hallId: '',
  showDate: '',
  showTime: '',
  language: 'English',
  price: ''
};

// ── FORMAT HELPERS ─────────────────────────────────────────────────────────────
const formatDate = (raw) => {
  if (!raw) return '—';
  return new Date(raw).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).toUpperCase();
};

const formatTime = (raw) => {
  if (!raw) return '—';
  const [h, m] = raw.slice(0, 5).split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, '0')} ${ampm}`;
};

// "HH:MM" or "HH:MM:SS" → total minutes from midnight
const toMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [h, m] = timeStr.slice(0, 5).split(':').map(Number);
  return h * 60 + m;
};

const ScheduleAdminMaster = () => {
  const [schedules, setSchedules]     = useState([]);
  const [movies, setMovies]           = useState([]);
  const [halls, setHalls]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [submitting, setSubmitting]   = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId]     = useState(null);
  const [error, setError]             = useState('');
  const [formData, setFormData]       = useState(defaultForm);

  // ── FETCH ──────────────────────────────────────────────────────────────────
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [showRes, hallRes, movieRes] = await Promise.all([
        getShowTimes(),
        getAllHalls(),
        getAllMovie(),
      ]);
      const raw = showRes?.data?.showtimes ?? showRes?.data?.schedules ?? showRes?.data ?? [];
      setSchedules(Array.isArray(raw) ? raw : []);
      setHalls(hallRes?.data?.halls ?? []);
      setMovies(movieRes?.data?.movies ?? movieRes?.data ?? []);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  // ── HELPERS ────────────────────────────────────────────────────────────────
  const toForm = (s) => ({
    movieId:  String(s.movie_id ?? s.movieId ?? ''),
    hallId:   String(s.hall_id  ?? s.hallId  ?? ''),
    showDate: (s.show_date ?? s.showDate ?? '').split('T')[0],
    showTime: (s.show_time ?? s.showTime ?? '').slice(0, 5),
    language: s.language ?? 'English',
    price:    s.price    ?? '',
  });

  const toPayload = (f) => ({
    movie_id:  f.movieId,
    hall_id:   f.hallId,
    show_date: f.showDate,
    show_time: f.showTime,
    language:  f.language,
    price:     Number(f.price),
  });

  const getMovieTitle = (id) =>
    movies.find(m => String(m.movie_id) === String(id))?.title ?? '—';

  const getHallName = (id) =>
    halls.find(h => String(h.hall_id) === String(id))?.name ?? '—';

  // ── COLLISION CHECK ────────────────────────────────────────────────────────
  const getConflict = (hallId, date, time, movieId, excludeId) => {
    const newStart    = toMinutes(time);
    const newDuration = Number(movies.find(m => String(m.movie_id) === String(movieId))?.duration ?? 0);
    const newEnd      = newStart + newDuration;

    return schedules.find(s => {
      if (s.showtime_id === excludeId) return false;
      if (String(s.hall_id ?? s.hallId) !== String(hallId)) return false;

      const sDate = (s.show_date ?? s.showDate ?? '').split('T')[0];
      if (sDate !== date) return false;

      const existingStart    = toMinutes(s.show_time ?? s.showTime ?? '00:00');
      const existingDuration = Number(s.Movie?.duration ?? s.movie?.duration ?? 0);
      const existingEnd      = existingStart + existingDuration + 15;

      return newStart < existingEnd && newEnd > existingStart;
    }) ?? null;
  };

  const isPastDateTime = (date, time) => {
    if (!date || !time) return false;
    return new Date(`${date}T${time}`) < new Date();
  };

  // ── MODAL ──────────────────────────────────────────────────────────────────
  const handleOpenModal = (schedule = null) => {
    setError('');
    if (schedule) {
      setEditingId(schedule.showtime_id);
      setFormData(toForm(schedule));
    } else {
      setEditingId(null);
      setFormData(defaultForm);
    }
    setIsModalOpen(true);
  };

  // ── SAVE ───────────────────────────────────────────────────────────────────
  const handleSaveSchedule = async (e) => {
    e.preventDefault();
    setError('');

    if (isPastDateTime(formData.showDate, formData.showTime)) {
      setError('Cannot schedule a showtime in the past.');
      return;
    }

    const conflict = getConflict(
      formData.hallId,
      formData.showDate,
      formData.showTime,
      formData.movieId,
      editingId
    );

    if (conflict) {
      const blocker = conflict.Movie?.title ?? conflict.movie?.title ?? 'another movie';
      const bTime   = formatTime(conflict.show_time ?? conflict.showTime);
      const bDur    = Number(conflict.Movie?.duration ?? conflict.movie?.duration ?? 0);
      setError(`COLLISION: "${blocker}" plays at ${bTime} (${bDur} min + 15 min buffer).`);
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        setSchedules(prev =>
          prev.map(s => s.showtime_id === editingId
            ? { ...s, ...toPayload(formData), showtime_id: editingId }
            : s
          )
        );
        toast.success('Schedule updated');
      } else {
        const res = await addShowTimeApi(toPayload(formData));
        const created = res?.data?.showtime ?? res?.data;
        setSchedules(prev => [...prev, created]);
        toast.success(res?.data?.message ?? 'Showtime added');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(<b>{err?.response?.data?.message ?? 'Failed to save schedule'}</b>);
    } finally {
      setSubmitting(false);
    }
  };

  // ── DELETE ─────────────────────────────────────────────────────────────────
  const deleteScheduleHandler = async (showtime_id) => {
    if (!window.confirm('Delete this showtime? This cannot be undone.')) return;
    try {
      await deleteSchedule(showtime_id);
      setSchedules(prev => prev.filter(s => s.showtime_id !== showtime_id));
      toast.success('Showtime removed');
    } catch (err) {
      toast.error(<b>{err?.response?.data?.message ?? 'Failed to delete showtime'}</b>);
    }
  };

  // ── AUTO PRICE ON HALL SELECT ──────────────────────────────────────────────
  const updateHallAndPrice = (hId) => {
    const selected = halls.find(h => String(h.hall_id) === String(hId));
    setFormData(prev => ({
      ...prev,
      hallId: hId,
      price:  selected?.basePrice ?? selected?.base_price ?? ''
    }));
  };

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">Operations</h3>
          <h4 className="text-3xl font-light uppercase tracking-tighter">
            Showtime <span className="font-black italic">Scheduling</span>
          </h4>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="cursor-pointer bg-[#d4af37] text-black font-black px-8 py-4 rounded-xl text-[10px] uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center gap-3 shadow-lg shadow-[#d4af37]/20"
        >
          + Add New Schedule
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="flex justify-center py-20">
          <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
        </div>
      ) : (
        <div className="bg-[#111] border border-white/5 rounded-[30px] overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
              <tr>
                <th className="px-8 py-5">Movie & Language</th>
                <th className="px-8 py-5">Hall</th>
                <th className="px-8 py-5">Date & Time</th>
                <th className="px-8 py-5">Price</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {schedules.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-gray-600 text-xs uppercase tracking-widest">
                    No showtimes scheduled yet.
                  </td>
                </tr>
              )}
              {schedules.map(s => (
                <tr key={s.showtime_id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-5">
                    <p className="font-bold text-sm uppercase capitalize">
                      {s.Movie?.title ?? s.movie?.title ?? getMovieTitle(s.movie_id ?? s.movieId)}
                    </p>
                    <span className="text-[10px] text-[#d4af37] font-black">{s.language}</span>
                  </td>
                  <td className="px-8 py-5 font-bold text-gray-400 text-sm">
                    {s.hallModel?.name ?? s.hall?.name ?? getHallName(s.hall_id ?? s.hallId)}
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold">{formatTime(s.show_time ?? s.showTime)}</p>
                    <p className="text-[10px] text-gray-500 uppercase">{formatDate(s.show_date ?? s.showDate)}</p>
                  </td>
                  <td className="px-8 py-5 text-[#d4af37] font-black text-sm">Rs. {s.price}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenModal(s)}
                        className="cursor-pointer p-3 bg-white/5 rounded-xl text-gray-500 hover:text-white transition-colors"
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => deleteScheduleHandler(s.showtime_id)}
                        className="cursor-pointer p-3 bg-red-500/5 rounded-xl text-red-500/50 hover:text-red-500 transition-colors"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => !submitting && setIsModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl my-auto animate-in zoom-in duration-300">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl shadow-black/80">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
              <div className="px-10 pt-8 pb-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-black text-[#d4af37] uppercase tracking-[0.4em] mb-1">
                    {editingId ? 'Modify Existing' : 'Create New'}
                  </p>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                    Configure <span className="text-[#d4af37]">Showtime</span>
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <FaTimes size={12} />
                </button>
              </div>

              <div className="px-10 py-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-[10px] font-black uppercase tracking-wider">
                    <FaExclamationTriangle className="shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSaveSchedule} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                        <FaFilm size={8} className="text-[#d4af37]" /> Movie
                      </label>
                      <select
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-white font-bold outline-none focus:border-[#d4af37]/50 transition-colors"
                        value={formData.movieId}
                        onChange={e => setFormData({ ...formData, movieId: e.target.value })}
                      >
                        <option value="" className="bg-[#111]">Select movie</option>
                        {movies
                          .filter(m => m.status?.toLowerCase() !== 'upcoming')
                          .map(m => (
                            <option key={m.movie_id} value={m.movie_id} className="bg-[#111]">{m.title}</option>
                          ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                        <FaGlobe size={8} className="text-[#d4af37]" /> Language
                      </label>
                      <select
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-white font-bold outline-none focus:border-[#d4af37]/50 transition-colors"
                        value={formData.language}
                        onChange={e => setFormData({ ...formData, language: e.target.value })}
                      >
                        {LANGUAGES.map(l => (
                          <option key={l} value={l} className="bg-[#111]">{l}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                        <FaUniversity size={8} className="text-[#d4af37]" /> Hall
                      </label>
                      <select
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-white font-bold outline-none focus:border-[#d4af37]/50 transition-colors"
                        value={formData.hallId}
                        onChange={e => updateHallAndPrice(e.target.value)}
                      >
                        <option value="" className="bg-[#111]">Select hall</option>
                        {halls.map(h => (
                          <option key={h.hall_id} value={h.hall_id} className="bg-[#111]">{h.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                        <FaTag size={8} className="text-[#d4af37]" /> Ticket Price (Rs.)
                      </label>
                      <input
                        required
                        type="number"
                        min="0"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-white font-bold outline-none focus:border-[#d4af37]/50 transition-colors"
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="bg-white/[0.03] border border-white/5 rounded-[28px] p-6 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[9px] font-black text-[#d4af37] uppercase tracking-widest">
                        <FaCalendarAlt size={8} /> Show Date
                      </label>
                      <input
                        required
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-bold [color-scheme:dark] outline-none focus:border-[#d4af37]/50 transition-colors"
                        value={formData.showDate}
                        onChange={e => setFormData({ ...formData, showDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-[9px] font-black text-[#d4af37] uppercase tracking-widest">
                        <FaClock size={8} /> Show Time
                      </label>
                      <input
                        required
                        type="time"
                        className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-bold [color-scheme:dark] outline-none focus:border-[#d4af37]/50 transition-colors"
                        value={formData.showTime}
                        onChange={e => setFormData({ ...formData, showTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="cursor-pointer w-full bg-white text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting
                      ? <><FaSpinner className="animate-spin" /> Processing...</>
                      : editingId ? 'Finalize Changes' : 'Deploy Schedule'
                    }
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleAdminMaster;