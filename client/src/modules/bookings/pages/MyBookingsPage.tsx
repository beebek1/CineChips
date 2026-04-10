import React from "react";
import { FaQrcode } from "react-icons/fa";
import TicketModal from "../components/myBookings/TicketModal";
import { useMyBookings } from "../hooks/useMyBookings";
import { useCountdown } from "../hooks/useCountDown";
import type { BookingTicket } from "../booking.types";

const TicketCard: React.FC<{ ticket: BookingTicket; onSelect: (ticket: BookingTicket) => void }> = ({ ticket, onSelect }) => {
  const countdown = useCountdown(ticket.show_date, ticket.show_time);

  const formatCountdown = () => {
    if (countdown.isExpired) {
      return "SHOW TIME";
    }
    return `${String(countdown.days).padStart(2, "0")}D: ${String(countdown.hours).padStart(2, "0")}H: ${String(countdown.minutes).padStart(2, "0")}M`;
  };

  return (
    <div className="group relative bg-[#111] border border-white/5 rounded-[40px] overflow-hidden flex flex-col md:flex-row hover:border-[#d4af37]/40 transition-all duration-700 shadow-xl">
      <div className="w-full md:w-72 h-80 md:h-auto relative overflow-hidden">
        <img
          src={ticket.image}
          className="w-full h-full object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          alt={ticket.title}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#111]/20 to-[#111]"></div>
      </div>

      <div className="flex-1 p-10 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-6">
            <span className="text-[#d4af37] text-[10px] font-black tracking-[0.4em] uppercase">{ticket.id}</span>
            <span className={`flex items-center gap-2 text-[9px] border px-4 py-1.5 rounded-full font-bold ${
              countdown.isExpired
                ? "bg-red-500/10 text-red-400 border-red-500/20"
                : "bg-[#d4af37]/10 text-[#d4af37] border-[#d4af37]/20 animate-pulse"
            }`}>
              ● {countdown.isExpired ? "EXPIRED" : "ACTIVE"}
            </span>
          </div>

          <h3 className="text-4xl md:text-5xl font-black tracking-tighter mb-10 group-hover:text-[#d4af37] transition-colors uppercase">
            {ticket.title}
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1">
              <p className="text-[8px] font-black text-gray-500 tracking-[0.2em] uppercase">Date</p>
              <p className="text-sm font-bold">{ticket.date}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-black text-gray-500 tracking-[0.2em] uppercase">Time</p>
              <p className="text-sm font-bold">{ticket.time}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-black text-gray-500 tracking-[0.2em] uppercase">Language</p>
              <p className="text-sm font-bold">{ticket.language}</p>
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
            <p className="text-3xl font-black tracking-tighter tabular-nums text-white/90 font-mono">
              {formatCountdown()}
            </p>
          </div>
          <button
            onClick={() => onSelect(ticket)}
            className="bg-[#d4af37]/5 hover:bg-[#d4af37] hover:text-black p-5 rounded-[24px] border border-[#d4af37]/20 transition-all duration-300 cursor-pointer group/btn"
          >
            <FaQrcode className="text-2xl group-hover/btn:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

const MyBookingsPage: React.FC = () => {
  const { selectedTicket, setSelectedTicket, bookings } = useMyBookings();

  return (
    <div className="min-h-screen bg-[#080808] text-white pt-32 pb-24 px-8 font-sans">
      <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />

      <header className="max-w-5xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
        <div className="relative">
          <h1 className="text-white/[0.03] text-[120px] font-black leading-none absolute -top-16 -left-4 select-none">CC</h1>
          <h2 className="text-5xl font-light tracking-tighter relative z-10 uppercase">
            My <span className="font-black text-[#d4af37]">Bookings</span>
          </h2>
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-10">
        {bookings.length === 0 && (
          <p className="text-gray-600 text-center text-sm tracking-widest uppercase mt-20">No bookings found.</p>
        )}

        {bookings.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} onSelect={setSelectedTicket} />
        ))}
      </main>
    </div>
  );
};

export default MyBookingsPage;