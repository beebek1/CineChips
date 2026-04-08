import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import type { UserAccount } from "../user.types";

interface Props {
  user: UserAccount | null;
  tier: string;
  getInitials: (name?: string) => string;
}

const AccountHeader: React.FC<Props> = ({ user, tier, getInitials }) => {
  return (
    <header className="mb-16 relative">
      <h1 className="text-white/[0.03] text-[120px] font-black leading-none absolute -top-20 -left-6 select-none uppercase">
        CC
      </h1>
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-[40px] bg-[#d4af37] flex items-center justify-center text-[#080808] text-5xl font-black shadow-2xl shadow-[#d4af37]/20">
          {getInitials(user?.username)}
        </div>
        <div className="text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-3">
            <FaCheckCircle /> <span>{tier}</span>
          </div>
          <h2 className="text-5xl font-black tracking-tighter uppercase mb-2">{user?.username || "—"}</h2>
          <p className="text-gray-500 text-xs font-bold tracking-widest uppercase italic">
            ID: CC-ACC-{user?.user_id || "—"}-2026
          </p>
        </div>
      </div>
    </header>
  );
};

export default AccountHeader;