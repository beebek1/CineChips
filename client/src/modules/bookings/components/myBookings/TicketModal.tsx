import React from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import type { BookingTicket } from "../../booking.types";
import QRCodeGenerator from "./QRCodeGenerator";

type Props = {
  ticket: BookingTicket | null;
  onClose: () => void;
};

const TicketModal: React.FC<Props> = ({ ticket, onClose }) => {
  if (!ticket) return null;

  const engraveDetails = `TICKET-ID: ${ticket.id} | MOVIE: ${ticket.title} | SEATS: ${ticket.seats} | STATUS: VALID`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-[#080808]/90 backdrop-blur-2xl" onClick={onClose}></div>

      <div className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="relative h-32 overflow-hidden">
          <img src={ticket.image} className="w-full h-full object-cover opacity-20 blur-sm" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-[#d4af37] cursor-pointer"
          >
            <FaTimes size={12} />
          </button>
        </div>

        <div className="px-8 pb-10 -mt-12 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-[#d4af37] text-black px-4 py-1 rounded-full text-[9px] font-black tracking-widest uppercase mb-4 shadow-lg">
            <FaCheckCircle /> <span>Official Ticket</span>
          </div>

          <h2 className="text-2xl font-black tracking-tighter text-white uppercase leading-tight mb-8">{ticket.title}</h2>

          <div className="flex flex-col items-center justify-center mb-8">
            <QRCodeGenerator data={engraveDetails} />
            <p className="mt-4 text-[8px] font-mono text-white/30 tracking-widest uppercase italic font-bold">
              Encrypted Scannable Pass
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;