import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUndo, FaSearch, FaSpinner } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center p-8 overflow-hidden relative">
      
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37]/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#d4af37]/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grainy Film Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Big Glitchy 404 Text */}
        <div className="relative inline-block mb-8">
          <h1 className="text-white/[0.03] text-[180px] md:text-[250px] font-black leading-none select-none tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase italic">
              Lost <span className="text-[#d4af37]">Reel</span>
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#d4af37]/10 text-[#d4af37] px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-4 border border-[#d4af37]/20">
             <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
             </span>
             Scene Not Found
          </div>

          <p className="text-gray-500 text-xs font-bold tracking-widest uppercase max-w-sm mx-auto leading-relaxed">
            The page you are looking for has been cut from the final edit or never existed in the script.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
            <button 
              onClick={() => navigate(-1)}
              className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white/10 transition-all cursor-pointer group"
            >
              <FaUndo className="group-hover:-rotate-45 transition-transform" /> Rewind
            </button>

            <button 
              onClick={() => navigate('/')}
              className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-[#d4af37] text-black rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase hover:scale-105 transition-all shadow-xl shadow-[#d4af37]/10 cursor-pointer"
            >
              <FaHome size={14} /> Back to Lobby
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="pt-12">
            <p className="text-gray-600 text-[9px] font-black tracking-[0.3em] uppercase mb-4">Or try searching for a movie</p>
            <div className="relative max-w-xs mx-auto group">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-[#d4af37] transition-colors" />
              <input 
                type="text" 
                placeholder="SEARCH TITLES..."
                className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-[10px] font-black tracking-widest outline-none focus:border-[#d4af37]/50 transition-all text-white placeholder:text-gray-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 text-[10px] font-black tracking-[0.5em] text-white/10 uppercase select-none">
        CineChips Interactive Entertainment
      </div>
    </div>
  );
};

import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const LoaderButton = ({ 
  onClick, 
  isLoading, 
  text, 
  editingId, 
  type = "submit",
  className = "" 
}) => {
  const buttonLabel = editingId ? "Finalize Update" : "Commit to Archive";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`
        cursor-pointer w-full bg-[#d4af37] text-black font-black py-5 rounded-2xl 
        text-[10px] uppercase tracking-[0.3em] hover:bg-[#b8962d] transition-all 
        shadow-xl shadow-[#d4af37]/10 mt-4 
        disabled:opacity-50 disabled:cursor-not-allowed 
        flex items-center justify-center gap-3
        ${className}
      `}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin text-lg" />
      ) : (
        text || buttonLabel
      )}
    </button>
  );
};

export {NotFound, ScrollToTop, LoaderButton};




