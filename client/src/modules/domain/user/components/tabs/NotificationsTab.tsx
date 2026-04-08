import React from "react";
import { FaBell } from "react-icons/fa";

interface Props {
  onEnable: () => void;
}

const NotificationsTab: React.FC<Props> = ({ onEnable }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 rounded-full bg-[#d4af37]/10 flex items-center justify-center mb-8 text-[#d4af37]">
        <FaBell size={32} className="animate-bounce" />
      </div>
      <h3 className="text-3xl font-black tracking-tighter uppercase mb-4">Stay Notified</h3>
      <p className="max-w-xs text-gray-500 text-[10px] font-black tracking-widest uppercase leading-relaxed mb-10">
        Receive real-time alerts for your upcoming showtimes and exclusive VIP offers.
      </p>
      <button
        onClick={onEnable}
        className="px-10 py-4 bg-[#d4af37] text-black rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-[#d4af37]/20"
      >
        Enable Browser Notifications
      </button>
    </div>
  );
};

export default NotificationsTab;