import React from "react";
import { FaUser, FaCreditCard, FaBell, FaLock, FaSignOutAlt, FaChevronRight } from "react-icons/fa";
import type { AccountMenuItem, AccountTab } from "../user.types";

interface Props {
  activeTab: AccountTab;
  onTabChange: (tab: AccountTab) => void;
  onSignOut: () => void;
}

const menuItems: AccountMenuItem[] = [
  { id: "Personal Info", label: "Personal Info", icon: <FaUser size={12} /> },
  { id: "Security", label: "Security", icon: <FaLock size={12} /> },
  { id: "Payment Methods", label: "Payment Methods", icon: <FaCreditCard size={12} /> },
  { id: "Notifications", label: "Notifications", icon: <FaBell size={12} /> },
];

const AccountSidebar: React.FC<Props> = ({ activeTab, onTabChange, onSignOut }) => {
  return (
    <div className="lg:col-span-1 space-y-2">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onTabChange(item.id)}
          className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all flex items-center justify-between group cursor-pointer ${
            activeTab === item.id
              ? "bg-[#d4af37] text-black shadow-xl shadow-[#d4af37]/20"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          <div className="flex items-center gap-3">{item.icon} {item.label}</div>
          <FaChevronRight className={`text-[10px] transition-transform ${activeTab === item.id ? "translate-x-1" : "opacity-0 group-hover:opacity-100"}`} />
        </button>
      ))}

      <button
        onClick={onSignOut}
        className="w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase bg-red-500/5 text-red-500 mt-10 hover:bg-red-500 hover:text-white transition-all flex items-center gap-3 cursor-pointer"
      >
        <FaSignOutAlt /> Sign Out
      </button>
    </div>
  );
};

export default AccountSidebar;