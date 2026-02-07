import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCamera, FaShieldAlt, FaSignOutAlt, FaCheckCircle, FaChevronRight } from 'react-icons/fa';

const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "ALEXANDER CHIP",
    email: "alex.chip@cinema.com",
    phone: "+1 (555) 000-1234",
    location: "Los Angeles, CA",
    memberSince: "JAN 2024",
    tier: "PLATINUM MEMBER"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-32 pb-24 px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-16 relative">
          <h1 className="text-white/[0.03] text-[120px] font-black leading-none absolute -top-20 -left-6 select-none uppercase">ID</h1>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[40px] overflow-hidden border-2 border-[#d4af37] p-1">
                <img 
                  src="https://picsum.photos/200" 
                  className="w-full h-full object-cover rounded-[35px]" 
                  alt="Profile" 
                />
              </div>
              <button className="absolute -bottom-2 -right-2 bg-[#d4af37] text-black p-3 rounded-2xl border-4 border-[#080808] hover:scale-110 transition-transform cursor-pointer">
                <FaCamera size={14} />
              </button>
            </div>
            
            <div className="text-center md:text-left">
              <div className="inline-flex items-center space-x-2 bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-3">
                <FaCheckCircle /> <span>{user.tier}</span>
              </div>
              <h2 className="text-5xl font-black tracking-tighter uppercase mb-2">{user.name}</h2>
              <p className="text-gray-500 text-xs font-bold tracking-widest uppercase italic">Member Since {user.memberSince}</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* SIDEBAR NAVIGATION */}
          <div className="space-y-2">
            {[
              { label: 'Personal Info', active: true },
              { label: 'Security', active: false },
              { label: 'Payment Methods', active: false },
              { label: 'Notification Settings', active: false },
            ].map((item) => (
              <button 
                key={item.label}
                className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all flex items-center justify-between group ${item.active ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/10' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
              >
                {item.label}
                <FaChevronRight className={item.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
              </button>
            ))}
            
            <button className="w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase bg-red-500/10 text-red-500 mt-8 hover:bg-red-500 hover:text-white transition-all flex items-center gap-3">
              <FaSignOutAlt /> Sign Out
            </button>
          </div>

          {/* MAIN CONTENT FORM */}
          <div className="md:col-span-2">
            <div className="bg-[#111] border border-white/5 rounded-[40px] p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black tracking-tighter uppercase">Profile Settings</h3>
                <button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="text-[#d4af37] text-[10px] font-black tracking-widest uppercase hover:underline cursor-pointer"
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={12} />
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={user.name}
                        onChange={(e) => setUser({...user, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-[#d4af37] transition-colors outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={12} />
                      <input 
                        type="email" 
                        disabled={!isEditing}
                        value={user.email}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-[#d4af37] outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={12} />
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={user.phone}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Location</label>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={12} />
                      <input 
                        type="text" 
                        disabled={!isEditing}
                        value={user.location}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold outline-none disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-white/5">
                  <div className="flex items-center gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-[#d4af37]/30 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]">
                      <FaShieldAlt size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[10px] font-black tracking-widest uppercase mb-1">Two-Factor Authentication</h4>
                      <p className="text-[9px] text-gray-500 font-bold uppercase tracking-tighter">Add an extra layer of security to your account</p>
                    </div>
                    <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                       <div className="absolute right-1 top-1 w-4 h-4 bg-[#d4af37] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;