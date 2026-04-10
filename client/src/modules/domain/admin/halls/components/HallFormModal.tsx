import React from "react";
import { FaTimes, FaSpinner, FaDollarSign } from "react-icons/fa";
import type { HallFormData } from "../halls.types";

interface Props {
  isOpen: boolean;
  isEditing: boolean;
  submitting: boolean;
  formData: HallFormData;
  onClose: () => void;
  onSubmit: () => void;
  onChange: <K extends keyof HallFormData>(key: K, value: HallFormData[K]) => void;
}

const numberToAlpha = (num: number): string => String.fromCharCode(64 + num);

const HallFormModal: React.FC<Props> = ({
  isOpen,
  isEditing,
  submitting,
  formData,
  onClose,
  onSubmit,
  onChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative bg-[#080808] border border-white/10 w-full max-w-2xl rounded-[40px] p-12 shadow-2xl my-auto animate-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-10 right-10 text-gray-600 hover:text-white transition-colors"
        >
          <FaTimes />
        </button>

        <header className="mb-10">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            {isEditing ? "Update" : "Define"} <span className="text-[#d4af37]">Hall</span>
          </h2>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="space-y-6"
        >
          {/* Name and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Hall Name
              </label>
              <input
                required
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white focus:border-[#d4af37]/40 outline-none"
                value={formData.name}
                onChange={(e) => onChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">
                Physical Location
              </label>
              <input
                required
                type="text"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white focus:border-[#d4af37]/40 outline-none"
                placeholder="e.g. 4th Floor"
                value={formData.location}
                onChange={(e) => onChange("location", e.target.value)}
              />
            </div>
          </div>

          {/* Seating Grid Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white/5 rounded-[30px] border border-white/5">
            <div>
              <label className="text-[9px] font-black text-[#d4af37] uppercase tracking-widest block mb-4">
                Total Rows (A-{numberToAlpha(formData.rowCount)})
              </label>
              <select
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]/40"
                value={formData.rowCount}
                onChange={(e) => onChange("rowCount", parseInt(e.target.value))}
              >
                {[...Array(26)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1} Rows (Up to {numberToAlpha(i + 1)})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[9px] font-black text-[#d4af37] uppercase tracking-widest block mb-4">
                Columns per Row (1-{formData.colCount})
              </label>
              <input
                type="number"
                min="1"
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#d4af37]/40"
                value={formData.colCount}
                onChange={(e) => onChange("colCount", parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                Standard Price <FaDollarSign size={8} />
              </label>
              <input
                type="number"
                min="0"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-[#d4af37]/40"
                value={formData.basePrice}
                onChange={(e) => onChange("basePrice", parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                VIP (Last Row) Price <FaDollarSign size={8} />
              </label>
              <input
                type="number"
                min="0"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-[#d4af37]/40"
                value={formData.vipPrice}
                onChange={(e) => onChange("vipPrice", parseInt(e.target.value))}
              />
            </div>
          </div>

          {/* Seat Count */}
          <div className="text-center p-4">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.5em]">
              This will generate{" "}
              <span className="text-[11px] font-black text-[#d4af37]">
                {formData.rowCount * formData.colCount}
              </span>{" "}
              virtual seat records
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="cursor-pointer w-full bg-white text-black font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {submitting ? (
              <FaSpinner className="animate-spin" />
            ) : isEditing ? (
              "Finalize Changes"
            ) : (
              "Deploy Architecture"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HallFormModal;