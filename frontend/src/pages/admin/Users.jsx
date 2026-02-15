import React, { useState, useEffect } from 'react';
import { 
  FaUserCircle, FaEnvelope, FaCalendarAlt, FaTicketAlt, 
  FaSearch, FaSpinner, FaHistory, FaCrown, FaBan 
} from 'react-icons/fa';

const UserAdminMaster = () => {
  // --- STATE ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // --- MOCK API DATA (JSON) ---
  const mockUserData = [
    { 
      id: "u1", 
      name: "Aarav Sharma", 
      email: "aarav@example.com", 
      joinedDate: "2024-01-15", 
      totalBookings: 12, 
      totalSpent: 6500,
      lastActive: "2 minutes ago",
      status: "Active"
    },
    { 
      id: "u2", 
      name: "Sita Thapa", 
      email: "sita.t@domain.np", 
      joinedDate: "2024-02-01", 
      totalBookings: 3, 
      totalSpent: 1800,
      lastActive: "1 hour ago",
      status: "Active"
    },
    { 
      id: "u3", 
      name: "John Doe", 
      email: "john@web.com", 
      joinedDate: "2023-12-10", 
      totalBookings: 45, 
      totalSpent: 22400,
      lastActive: "Online Now",
      status: "Active"
    }
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      await new Promise(r => setTimeout(r, 800)); // API Simulation
      setUsers(mockUserData);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // --- FILTERS ---
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">Customer Database</h3>
          <h4 className="text-white text-3xl font-light uppercase tracking-tighter italic">User <span className="font-black not-italic text-[#d4af37]">Insights</span></h4>
        </div>

        <div className="relative">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="bg-[#161616] border-2 border-white/10 rounded-2xl py-4 pl-14 pr-8 text-sm text-white focus:border-[#d4af37] outline-none w-80 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- STATS OVERVIEW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#111] border-2 border-white/5 p-8 rounded-[30px] flex items-center justify-between">
            <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Members</p>
                <p className="text-3xl font-black mt-1">{users.length}</p>
            </div>
            <FaUserCircle className="text-[#d4af37] text-4xl opacity-20" />
        </div>
        <div className="bg-[#111] border-2 border-white/5 p-8 rounded-[30px] flex items-center justify-between">
            <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Bookings Today</p>
                <p className="text-3xl font-black mt-1 text-[#d4af37]">24</p>
            </div>
            <FaTicketAlt className="text-[#d4af37] text-4xl opacity-20" />
        </div>
        <div className="bg-[#111] border-2 border-white/5 p-8 rounded-[30px] flex items-center justify-between">
            <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Premium Users</p>
                <p className="text-3xl font-black mt-1">8</p>
            </div>
            <FaCrown className="text-[#d4af37] text-4xl opacity-20" />
        </div>
      </div>

      {/* --- USER TABLE --- */}
      
      <div className="bg-[#111] border-2 border-white/10 rounded-[35px] overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-[11px] font-black uppercase tracking-widest text-gray-400">
              <th className="px-10 py-6">Customer Profile</th>
              <th className="px-10 py-6">Engagement</th>
              <th className="px-10 py-6">Total Spent</th>
              <th className="px-10 py-6">Status</th>
              <th className="px-10 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan="5" className="py-20 text-center"><FaSpinner className="animate-spin text-[#d4af37] text-3xl mx-auto" /></td></tr>
            ) : filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-white/[0.03] transition-colors group">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-full flex items-center justify-center border border-white/10">
                      <FaUserCircle className="text-gray-500 text-2xl group-hover:text-[#d4af37] transition-colors" />
                    </div>
                    <div>
                      <p className="text-base font-black text-white">{user.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-2 mt-1 lowercase"><FaEnvelope size={10}/> {user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8">
                  <p className="text-sm font-bold text-white">{user.totalBookings} Tickets</p>
                  <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mt-1 italic">Last active {user.lastActive}</p>
                </td>
                <td className="px-10 py-8">
                  <p className="text-lg font-black text-[#d4af37]">Rs. {user.totalSpent}</p>
                  <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Lifetime Value</p>
                </td>
                <td className="px-10 py-8">
                  <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {user.status}
                  </span>
                </td>
                <td className="px-10 py-8 text-right">
                   <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="cursor-pointer p-4 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-all" title="View History">
                        <FaHistory size={16} />
                      </button>
                      <button className="cursor-pointer p-4 bg-red-500/5 rounded-2xl text-red-500/50 hover:text-red-500 transition-all" title="Ban User">
                        <FaBan size={16} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAdminMaster;