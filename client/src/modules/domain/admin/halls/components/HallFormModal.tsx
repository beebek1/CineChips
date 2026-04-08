import React from "react";
import { FaTimes, FaSpinner } from "react-icons/fa";
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

const HallFormModal: React.FC<Props> = ({ isOpen, isEditing, submitting, formData, onClose, onSubmit, onChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#080808] border border-white/10 w-full max-w-2xl rounded-[40px] p-12 shadow-2xl my-auto animate-in zoom-in duration-300">
        <button onClick={onClose} className="cursor-pointer absolute top-10 right-10 text-gray-600 hover:text-white transition-colors">
          <FaTimes />
        </button>

        <header className="mb-10">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
            {isEditing ? "Update" : "Define"} <span className="text-[#d4af37]">Hall</span>
          </h2>
        </header>

        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
          <input required value={formData.name} onChange={(e) => onChange("name", e.target.value)} />
          <button type="submit" className="cursor-pointer w-full bg-white text-black font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all flex items-center justify-center gap-3">
            {submitting ? <FaSpinner className="animate-spin" /> : isEditing ? "Finalize Changes" : "Deploy Architecture"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HallFormModal;