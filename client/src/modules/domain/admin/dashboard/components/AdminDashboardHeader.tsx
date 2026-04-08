import React from "react";

const AdminDashboardHeader: React.FC = () => {
  return (
    <div className="mb-12">
      <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">System Overview</h3>
      <h4 className="text-4xl font-light uppercase tracking-tighter">
        Welcome Back, <span className="font-black italic text-white">Admin</span>
      </h4>
    </div>
  );
};

export default AdminDashboardHeader;