import React from "react";
import {
  FaTimes,
  FaSpinner,
  FaTag,
  FaExclamationTriangle,
  FaFilm,
  FaUniversity,
  FaCalendarAlt,
  FaClock,
  FaGlobe,
} from "react-icons/fa";
import type { Hall, Movie, ScheduleFormData } from "../schedules.types";
import { LANGUAGES } from "../schedules.utils";

interface Props {
  isOpen: boolean;
  isEditing: boolean;
  submitting: boolean;
  error: string;
  formData: ScheduleFormData;
  movies: Movie[];
  halls: Hall[];
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFormChange: <K extends keyof ScheduleFormData>(key: K, value: ScheduleFormData[K]) => void;
  onHallChange: (hallId: string) => void;
}

const ScheduleFormModal: React.FC<Props> = ({
  isOpen,
  isEditing,
  submitting,
  error,
  formData,
  movies,
  halls,
  onClose,
  onSubmit,
  onFormChange,
  onHallChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl my-auto animate-in zoom-in duration-300">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl shadow-black/80">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

          <div className="px-10 pt-8 pb-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-[#d4af37] uppercase tracking-[0.4em] mb-1">
                {isEditing ? "Modify Existing" : "Create New"}
              </p>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                Configure <span className="text-[#d4af37]">Showtime</span>
              </h2>
            </div>
            <button
              onClick={onClose}
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

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                    <FaFilm size={8} className="text-[#d4af37]" /> Movie
                  </label>
                  <select
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-xs text-white font-bold outline-none focus:border-[#d4af37]/50 transition-colors"
                    value={formData.movieId}
                    onChange={(e) => onFormChange("movieId", e.target.value)}
                  >
                    <option value="" className="bg-[#111]">Select movie</option>
                    {movies
                      .filter((m) => m.status?.toLowerCase() !== "upcoming")
                      .map((m) => (
                        <option key={m.movie_id} value={m.movie_id} className="bg-[#111]">
                          {m.title}
                        </option>
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
                    onChange={(e) => onFormChange("language", e.target.value)}
                  >
                    {LANGUAGES.map((l) => (
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
                    onChange={(e) => onHallChange(e.target.value)}
                  >
                    <option value="" className="bg-[#111]">Select hall</option>
                    {halls.map((h) => (
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
                    onChange={(e) => onFormChange("price", e.target.value)}
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
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white font-bold [color-scheme:dark] outline-none focus:border-[#d4af37]/50 transition-colors"
                    value={formData.showDate}
                    onChange={(e) => onFormChange("showDate", e.target.value)}
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
                    onChange={(e) => onFormChange("showTime", e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="cursor-pointer w-full bg-white text-black font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <FaSpinner className="animate-spin" /> Processing...
                  </>
                ) : isEditing ? (
                  "Finalize Changes"
                ) : (
                  "Deploy Schedule"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleFormModal;