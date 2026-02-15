import React, { useState, useEffect } from 'react';
import { 
  FaWallet, FaTicketAlt, FaUsers, FaFilm, 
  FaArrowUp, FaChartLine, FaRegClock, FaCircle 
} from 'react-icons/fa';

const OverviewMaster = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- MOCK API DATA (JSON) ---
  const mockDashboardData = {
    revenue: { total: "125,400", growth: "+12.5%" },
    bookings: { count: "1,240", growth: "+5.2%" },
    activeUsers: { count: "856", growth: "+18%" },
    liveShows: 4,
    recentActivity: [
      { id: 1, user: "Aarav S.", action: "Purchased 2 tickets", movie: "Dune: Part II", time: "Just now" },
      { id: 2, user: "Sita T.", action: "Cancelled booking", movie: "The Batman", time: "5 mins ago" },
      { id: 3, user: "John D.", action: "New Registration", movie: null, time: "12 mins ago" },
    ]
  };

  useEffect(() => {
    setTimeout(() => {
      setStats(mockDashboardData);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <div className="animate-pulse text-[#d4af37] font-black tracking-[0.5em] uppercase text-xs">Loading Intelligence...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">
      
      {/* --- WELCOME HEADER --- */}
      <div className="mb-12">
        <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">System Overview</h3>
        <h4 className="text-4xl font-light uppercase tracking-tighter">Welcome Back, <span className="font-black italic text-white">Admin</span></h4>
      </div>

      {/* --- KEY PERFORMANCE INDICATORS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        
        {/* Total Revenue */}
        <div className="bg-[#111] border-2 border-white/5 p-8 rounded-[35px] hover:border-[#d4af37]/30 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 bg-[#d4af37]/10 rounded-2xl text-[#d4af37]"><FaWallet size={20}/></div>
            <span className="text-green-500 text-[10px] font-black flex items-center gap-1 bg-green-500/10 px-3 py-1 rounded-full">
              <FaArrowUp size={8}/> {stats.revenue.growth}
            </span>
          </div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Revenue (NPR)</p>
          <p className="text-3xl font-black mt-1">Rs. {stats.revenue.total}</p>
        </div>

        {/* Total Tickets */}
        <div className="bg-[#111] border-2 border-white/5 p-8 rounded-[35px] hover:border-[#d4af37]/30 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500"><FaTicketAlt size={20}/></div>
            <span className="text-blue-500 text-[10px] font-black flex items-center gap-1 bg-blue-500/10 px-3 py-1 rounded-full">
              <FaArrowUp size={8}/> {stats.bookings.growth}
            </span>
          </div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Tickets Sold</p>
          <p className="text-3xl font-black mt-1">{stats.bookings.count}</p>
        </div>

        {/* Active Users */}
        <div className="bg-[#111] border-2 border-white/5 p-8 rounded-[35px] hover:border-[#d4af37]/30 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-500"><FaUsers size={20}/></div>
            <span className="text-purple-500 text-[10px] font-black flex items-center gap-1 bg-purple-500/10 px-3 py-1 rounded-full">
              <FaArrowUp size={8}/> {stats.activeUsers.growth}
            </span>
          </div>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Total Customers</p>
          <p className="text-3xl font-black mt-1">{stats.activeUsers.count}</p>
        </div>

        {/* Live Now */}
        <div className="bg-[#d4af37] p-8 rounded-[35px] text-black shadow-xl shadow-[#d4af37]/10 relative overflow-hidden group">
          <FaCircle className="absolute -top-4 -right-4 text-black/10 text-9xl group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 animate-pulse">
                <FaCircle className="text-red-600" size={8} />
                <span className="text-[10px] font-black uppercase tracking-widest">Live in Halls</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Ongoing Shows</p>
            <p className="text-5xl font-black mt-1 tracking-tighter">{stats.liveShows}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LIVE ACTIVITY FEED --- */}
        <div className="lg:col-span-2 bg-[#111] border-2 border-white/5 rounded-[40px] p-10">
          <div className="flex items-center justify-between mb-8">
            <h5 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
              <FaChartLine className="text-[#d4af37]" /> Recent Activity
            </h5>
            <button className="cursor-pointer text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors">View All Logs</button>
          </div>

          <div className="space-y-6">
            {stats.recentActivity.map(log => (
              <div key={log.id} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                  <div>
                    <p className="text-sm font-bold text-white">
                      {log.user} <span className="font-normal text-gray-500 lowercase">{log.action}</span>
                    </p>
                    {log.movie && <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest mt-1">{log.movie}</p>}
                  </div>
                </div>
                <p className="text-[10px] font-bold text-gray-600 uppercase italic flex items-center gap-2">
                   <FaRegClock size={10}/> {log.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- QUICK ACTIONS & STATUS --- */}
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#111] to-black border-2 border-white/5 rounded-[40px] p-10 text-center">
                <FaFilm className="text-[#d4af37] text-4xl mx-auto mb-4 opacity-50" />
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">System Status</p>
                <p className="text-lg font-bold text-white uppercase">All Servers <span className="text-green-500">Online</span></p>
                <div className="h-1 bg-white/5 rounded-full mt-6 overflow-hidden">
                    <div className="h-full bg-green-500 w-[98%] shadow-[0_0_10px_#22c55e]" />
                </div>
            </div>

            <div className="bg-[#d4af37]/5 border-2 border-[#d4af37]/20 rounded-[40px] p-8">
                <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest mb-4">Quick Shortcuts</p>
                <div className="grid grid-cols-2 gap-3">
                    <button className="cursor-pointer bg-white/5 hover:bg-[#d4af37] hover:text-black py-4 rounded-2xl text-[9px] font-black uppercase transition-all">Add Movie</button>
                    <button className="cursor-pointer bg-white/5 hover:bg-[#d4af37] hover:text-black py-4 rounded-2xl text-[9px] font-black uppercase transition-all">New Schedule</button>
                    <button className="cursor-pointer bg-white/5 hover:bg-[#d4af37] hover:text-black py-4 rounded-2xl text-[9px] font-black uppercase transition-all">View Users</button>
                    <button className="cursor-pointer bg-white/5 hover:bg-[#d4af37] hover:text-black py-4 rounded-2xl text-[9px] font-black uppercase transition-all">Export Report</button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default OverviewMaster;