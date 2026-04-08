import React from "react";
import { FaShieldAlt } from "react-icons/fa";

const SecurityTab: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[#d4af37]">
        <FaShieldAlt size={30} />
      </div>
      <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">Security</h3>
      <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase">Encrypted Session: Active</p>
    </div>
  );
};

export default SecurityTab;