import React from "react";
import { FaImage, FaLink, FaSpinner, FaTimes } from "react-icons/fa";
import type { MovieFormState, MovieStatus } from "../movies.types";

type Props = {
  isOpen: boolean;
  isEditing: boolean;
  submitting: boolean;
  formData: MovieFormState;
  preview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFieldChange: <K extends keyof MovieFormState>(
    key: K,
    value: MovieFormState[K]
  ) => void;
};

const statusOptions: MovieStatus[] = ["Showing", "Upcoming"];

const MovieModal: React.FC<Props> = ({
  isOpen,
  isEditing,
  submitting,
  formData,
  preview,
  fileInputRef,
  onClose,
  onSubmit,
  onFileChange,
  onFieldChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
        onClick={() => !submitting && onClose()}
      />
      <div className="relative bg-[#080808] border border-white/10 w-full max-w-2xl rounded-[40px] p-10 shadow-2xl my-auto">
        <header className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            {isEditing ? "Update" : "Register"} <span className="text-[#d4af37]">Premiere</span>
          </h2>
          <button onClick={onClose} className="cursor-pointer text-gray-600 hover:text-white">
            <FaTimes />
          </button>
        </header>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer aspect-[3/4] rounded-3xl border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center overflow-hidden relative group"
            >
              {preview ? (
                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
              ) : (
                <FaImage className="text-3xl text-gray-700" />
              )}

              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-[10px] font-black uppercase tracking-widest">
                  {preview ? "Change Image" : "Upload Image"}
                </p>
              </div>

              <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={onFileChange} />
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Title</label>
                <input
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-[#d4af37]/40"
                  value={formData.title}
                  onChange={(e) => onFieldChange("title", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="Genre"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-[#d4af37]/40"
                  value={formData.genre}
                  onChange={(e) => onFieldChange("genre", e.target.value)}
                />
                <input
                  placeholder="Duration (min)"
                  type="number"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-[#d4af37]/40"
                  value={formData.duration}
                  onChange={(e) => onFieldChange("duration", e.target.value)}
                />
              </div>

              <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl">
                {statusOptions.map((opt) => (
                  <label
                    key={opt}
                    className={`flex-1 cursor-pointer py-3 rounded-xl text-[10px] font-black uppercase text-center transition-all ${
                      formData.status === opt ? "bg-[#d4af37] text-black" : "text-gray-500 hover:text-white"
                    }`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      checked={formData.status === opt}
                      onChange={() => onFieldChange("status", opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => onFieldChange("featured", !formData.featured)}
                  className={`w-10 h-5 rounded-full transition-all ${formData.featured ? "bg-[#d4af37]" : "bg-white/10"}`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-all ${formData.featured ? "ml-5" : "ml-0.5"}`}
                  />
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Featured (Hero)</span>
              </label>

              <div>
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Trailer Link</label>
                <div className="relative">
                  <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" />
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-xs text-white outline-none focus:border-[#d4af37]/40"
                    value={formData.trailerLink}
                    onChange={(e) => onFieldChange("trailerLink", e.target.value)}
                  />
                </div>
              </div>

              <input
                type="date"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white [color-scheme:dark] outline-none focus:border-[#d4af37]/40"
                value={formData.releaseDate}
                onChange={(e) => onFieldChange("releaseDate", e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Synopsis</label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-[#d4af37]/40 h-28 resize-none"
              placeholder="Describe the cinematic experience..."
              value={formData.description}
              onChange={(e) => onFieldChange("description", e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="cursor-pointer w-full bg-[#d4af37] text-black font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <FaSpinner className="animate-spin" /> Processing...
              </>
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Commit to Archive"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MovieModal;