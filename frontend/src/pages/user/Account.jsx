import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCreditCard, FaBell, FaLock, FaSignOutAlt, FaCheckCircle, FaChevronRight, FaShieldAlt } from 'react-icons/fa';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('Personal Info');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "BIBEK SOTI",
    email: "bibek.soti@cinema.com",
    phone: "+977 98XXXXXXXX",
    location: "Kathmandu, Nepal",
    memberSince: "FEB 2026",
    tier: "PLATINUM MEMBER"
  });

  // Helper to get Initials
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  // Sign Out Handler
  const handleSignOut = () => {
    if(window.confirm("Are you sure you want to sign out?")) {
      window.location.href = "/login"; // Or your logout logic
    }
  };

  // Notification Permission Handler
  const requestNotification = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support notifications.");
    } else {
      Notification.requestPermission().then(permission => {
        alert(`Notification permission: ${permission}`);
      });
    }
  };

  const menuItems = [
    { id: 'Personal Info', label: 'Personal Info', icon: <FaUser size={12}/> },
    { id: 'Security', label: 'Security', icon: <FaLock size={12}/> },
    { id: 'Payment Methods', label: 'Payment Methods', icon: <FaCreditCard size={12}/> },
    { id: 'Notifications', label: 'Notifications', icon: <FaBell size={12}/> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Personal Info':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-black tracking-tighter uppercase">Profile Settings</h3>
              <button onClick={() => setIsEditing(!isEditing)} className="text-[#d4af37] text-[10px] font-black tracking-widest uppercase hover:underline cursor-pointer">
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[{ label: 'Full Name', value: user.name, key: 'name', icon: <FaUser /> },
                { label: 'Email Address', value: user.email, key: 'email', icon: <FaEnvelope /> },
                { label: 'Phone Number', value: user.phone, key: 'phone', icon: <FaPhone /> },
                { label: 'Location', value: user.location, key: 'location', icon: <FaMapMarkerAlt /> }
              ].map((field) => (
                <div key={field.key} className="space-y-3">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">{field.label}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">{field.icon}</span>
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      value={field.value}
                      onChange={(e) => setUser({...user, [field.key]: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:border-[#d4af37] outline-none disabled:opacity-50 transition-all"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Payment Methods':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-black tracking-tighter uppercase mb-10">Allowed Methods</h3>
            <div className="space-y-4">
              {/* Khalti Card */}
              <div className="flex items-center justify-between p-6 bg-[#5d2e8e]/10 border border-[#5d2e8e]/30 rounded-[32px] group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-[#5d2e8e] rounded-2xl flex items-center justify-center font-black text-white text-xs">KHALTI</div>
                  <div>
                    <p className="text-xs font-black tracking-widest uppercase">Khalti Wallet</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Primary Payment Method</p>
                  </div>
                </div>
                <FaCheckCircle className="text-[#5d2e8e]" />
              </div>
              {/* Stripe Card */}
              <div className="flex items-center justify-between p-6 bg-[#635bff]/10 border border-[#635bff]/30 rounded-[32px] group">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-[#635bff] rounded-2xl flex items-center justify-center font-black text-white text-xs tracking-tighter">STRIPE</div>
                  <div>
                    <p className="text-xs font-black tracking-widest uppercase">Stripe / Visa</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Ending in 4242</p>
                  </div>
                </div>
                <button className="text-white/20 hover:text-white transition-colors"><FaChevronRight/></button>
              </div>

            </div>
          </div>
        );

      case 'Notifications':
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
              onClick={requestNotification}
              className="px-10 py-4 bg-[#d4af37] text-black rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase hover:scale-105 transition-transform cursor-pointer shadow-lg shadow-[#d4af37]/20"
            >
              Enable Browser Notifications
            </button>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 text-[#d4af37]"><FaShieldAlt size={30}/></div>
            <h3 className="text-2xl font-black tracking-tighter uppercase mb-2">Security</h3>
            <p className="text-gray-500 text-[10px] font-black tracking-widest uppercase">Encrypted Session: Active</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-32 pb-24 px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* PROFILE HEADER */}
        <header className="mb-16 relative">
          <h1 className="text-white/[0.03] text-[120px] font-black leading-none absolute -top-20 -left-6 select-none uppercase">CC</h1>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-[40px] bg-[#d4af37] flex items-center justify-center text-[#080808] text-5xl font-black shadow-2xl shadow-[#d4af37]/20">
              {getInitials(user.name)}
            </div>
            <div className="text-center md:text-left">
              <div className="inline-flex items-center space-x-2 bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-3">
                <FaCheckCircle /> <span>{user.tier}</span>
              </div>
              <h2 className="text-5xl font-black tracking-tighter uppercase mb-2">{user.name}</h2>
              <p className="text-gray-500 text-xs font-bold tracking-widest uppercase italic">ID: CC-ACC-{getInitials(user.name)}-2026</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-2">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsEditing(false); }}
                className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase transition-all flex items-center justify-between group cursor-pointer ${activeTab === item.id ? 'bg-[#d4af37] text-black shadow-xl shadow-[#d4af37]/20' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
              >
                <div className="flex items-center gap-3">{item.icon} {item.label}</div>
                <FaChevronRight className={`text-[10px] transition-transform ${activeTab === item.id ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
            <button onClick={handleSignOut} className="w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase bg-red-500/5 text-red-500 mt-10 hover:bg-red-500 hover:text-white transition-all flex items-center gap-3 cursor-pointer">
              <FaSignOutAlt /> Sign Out
            </button>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-[#111] border border-white/5 rounded-[48px] p-8 md:p-12 shadow-2xl min-h-[500px]">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;