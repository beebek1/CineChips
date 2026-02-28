import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaChartPie, FaFilm, FaLayerGroup, FaCalendarCheck
  , FaSignOutAlt, FaChevronRight 
} from 'react-icons/fa';

const AdminSidebar = () => {
  const location = useLocation();

  const adminLinks = [
    { name: 'OVERVIEW', path: '/admin/dashboard', icon: <FaChartPie /> },
    { name: 'MOVIES', path: '/admin/movies', icon: <FaFilm /> },
    { name: 'HALLS', path: '/admin/halls', icon: <FaLayerGroup /> },
    { name: 'SCHEDULES', path: '/admin/schedules', icon: <FaCalendarCheck /> },
  ];

  return (
    <aside className="fixed top-0 left-0 h-screen w-72 bg-[#080808] border-r border-white/5 flex flex-col z-50">
      
      {/* 1. Branding Section */}
      <div className="p-10">
        <Link to="/" className="group outline-none">
          <h1 className="text-2xl font-light tracking-tighter text-white">
            CINE<span className="font-black text-[#d4af37]">CHIPS</span>
          </h1>
          <p className="text-[8px] font-black tracking-[0.5em] text-gray-600 mt-1 uppercase">
            Administrative Portal
          </p>
        </Link>
      </div>

      {/* 2. Navigation Links */}
      <nav className="flex-1 px-6 space-y-2">
        {adminLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-500 outline-none ${
                isActive 
                  ? 'bg-[#d4af37] text-black shadow-xl shadow-[#d4af37]/10' 
                  : 'text-gray-500 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-4">
                <span className={`text-sm ${isActive ? 'text-black' : 'text-[#d4af37]'}`}>
                  {link.icon}
                </span>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">
                  {link.name}
                </span>
              </div>
              
              {isActive && <FaChevronRight className="text-[8px] animate-pulse" />}
            </Link>
          );
        })}
      </nav>

      {/* 3. Footer / Account Section */}
      <div className="p-8 border-t border-white/5">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b8962d] flex items-center justify-center text-black font-black text-xs shadow-lg shadow-[#d4af37]/20">
            AD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-white text-[10px] font-black tracking-widest uppercase truncate">Admin User</p>
            <p className="text-gray-500 text-[8px] font-bold truncate">admin@cinechips.com</p>
          </div>
        </div>
      </div>

      {/* Subtle Glow Background Effect */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#d4af37]/5 to-transparent pointer-events-none -z-10"></div>
    </aside>
  );
};

export default AdminSidebar;