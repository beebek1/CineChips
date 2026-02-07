import React, { useState, useEffect } from 'react';
import { FaTicketAlt, FaCalendarAlt, FaMapMarkerAlt, FaQrcode, FaClock, FaTimes, FaCheckCircle, FaDownload, FaShareAlt } from 'react-icons/fa';

// 1. SIMPLE QR COMPONENT (Uses an API to avoid Hook errors)
const QRCodeGenerator = ({ data }) => {
  // We encode the ticket details into a URL-safe format
  const encodedData = encodeURIComponent(data);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedData}&bgcolor=ffffff&color=000000&margin=10`;

  return (
    <div className="p-2 bg-white rounded-xl shadow-inner group">
      <img 
        src={qrUrl} 
        alt="Ticket QR Code" 
        className="w-48 h-48 md:w-56 md:h-56 object-contain rounded-lg transition-transform group-hover:scale-105"
      />
    </div>
  );
};

// 2. MODAL COMPONENT
const TicketModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  // Engrave all details into the QR string
  const engraveDetails = `TICKET-ID: ${ticket.id} | MOVIE: ${ticket.title} | SEATS: ${ticket.seats} | STATUS: VALID`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[#080808]/90 backdrop-blur-2xl" onClick={onClose}></div>
      
      <div className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="relative h-32 overflow-hidden">
          <img src={ticket.image} className="w-full h-full object-cover opacity-20 blur-sm" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
          <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-[#d4af37] cursor-pointer">
            <FaTimes size={12}/>
          </button>
        </div>

        <div className="px-8 pb-10 -mt-12 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#d4af37] text-black px-4 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-4 shadow-lg">
            <FaCheckCircle /> <span>Official Ticket</span>
          </div>
          
          <h2 className="text-2xl font-black tracking-tighter text-white uppercase leading-tight mb-8">{ticket.title}</h2>

          <div className="flex flex-col items-center justify-center mb-8">
            <QRCodeGenerator data={engraveDetails} />
            <p className="mt-4 text-[8px] font-mono text-white/30 tracking-widest uppercase italic font-bold">Encrypted Scannable Pass</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. MAIN COMPONENT
const MyBookings = () => {
  const [activeTab, setActiveTab] = useState('UPCOMING');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  const bookings = [
    { id: "CHIP-99281", title: "DUNE: PART TWO", date: "FEB 14, 2026", time: "09:30 PM", theater: "Grand Hall • Screen 01", seats: "Row H, Seat 12, 13", status: "UPCOMING", image: "https://picsum.photos/400/600?random=51" },
    { id: "CHIP-88210", title: "THE BATMAN", date: "JAN 20, 2026", time: "07:00 PM", theater: "IMAX Suite • Screen 04", seats: "Row B, Seat 05", status: "COMPLETED", image: "https://picsum.photos/400/600?random=52" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const showtime = new Date("Feb 14, 2026 21:30:00").getTime();
      const now = new Date().getTime();
      const distance = showtime - now;
      if (distance < 0) {
        setTimeLeft("00:00:00");
        clearInterval(timer);
      } else {
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${d}D : ${h}H : ${m}M`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-32 pb-24 px-8 font-sans">
      <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />

      <header className="max-w-5xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
        <div className="relative">
          <h1 className="text-white/[0.03] text-[120px] font-black leading-none absolute -top-16 -left-4 select-none">CC</h1>
          <h2 className="text-5xl font-light tracking-tighter relative z-10 uppercase">My <span className="font-black text-[#d4af37]">Bookings</span></h2>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
          {['UPCOMING', 'COMPLETED'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest transition-all cursor-pointer ${activeTab === tab ? 'bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20' : 'text-gray-500 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-10">
        {bookings.filter(b => b.status === activeTab).map((ticket) => (
          <div key={ticket.id} className="group relative bg-[#111] border border-white/5 rounded-[40px] overflow-hidden flex flex-col md:flex-row hover:border-[#d4af37]/40 transition-all duration-700 shadow-xl">
            <div className="w-full md:w-72 h-80 md:h-auto relative overflow-hidden">
              <img src={ticket.image} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#111]/20 to-[#111]"></div>
            </div>
            
            <div className="flex-1 p-10 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[#d4af37] text-[10px] font-black tracking-[0.4em] uppercase">{ticket.id}</span>
                  {ticket.status === 'UPCOMING' && <span className="flex items-center gap-2 text-[9px] bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 px-4 py-1.5 rounded-full font-bold animate-pulse">● ACTIVE</span>}
                </div>
                <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-10 group-hover:text-[#d4af37] transition-colors">{ticket.title}</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-gray-500 tracking-[0.2em] uppercase">Date</p>
                    <p className="text-sm font-bold">{ticket.date}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-gray-00 tracking-[0.2em] uppercase">Time</p>
                    <p className="text-sm font-bold">{ticket.time}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-gray-500 tracking-[0.2em] uppercase">Screen</p>
                    <p className="text-sm font-bold">GOLD-01</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-gray-500 tracking-[0.2em] uppercase">Seats</p>
                    <p className="text-sm font-bold">{ticket.seats}</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-white/5 flex justify-between items-end">
                <div>
                  <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2">Door Opens In</p>
                  <p className="text-3xl font-black tracking-tighter tabular-nums text-white/90">{ticket.status === 'UPCOMING' ? timeLeft : 'EXPIRED'}</p>
                </div>
                <button 
                  onClick={() => setSelectedTicket(ticket)} 
                  className="bg-[#d4af37]/5 hover:bg-[#d4af37] hover:text-black p-5 rounded-[24px] border border-[#d4af37]/20 transition-all duration-300 cursor-pointer group/btn"
                >
                  <FaQrcode className="text-2xl group-hover/btn:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MyBookings;