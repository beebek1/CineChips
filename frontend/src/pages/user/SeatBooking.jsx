import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdEventSeat, MdArrowBack } from "react-icons/md";
import { FaSpinner, FaCrown } from "react-icons/fa";
import { getSeatsByShowtime, bookSeatApi, addStripeApi } from "../../services/api";
import {StripeModal} from '../../components/payments/StripeModal';
import BookingConfirmation from '../../components/payments/BookingComplete';
import toast from "react-hot-toast";

const formatTime = (t) => {
  if (!t) return '';
  const [h, m] = t.split(':');
  const hour = parseInt(h);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).toUpperCase();
};

const MAX_SEATS = 10;
const SERVICE_FEE_RATE = 0.05;

const SeatBooking = () => {
  const navigate = useNavigate();

  //getting saved movie detail
  const booking = JSON.parse(localStorage.getItem('activeBooking') || 'null');

  const [clientSecret, setClientSecret] = useState("");
  const [rows, setRows]                   = useState([]);
  const [hall, setHall]                   = useState(null);
  const [loading, setLoading]             = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [confirming, setConfirming]       = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId]         = useState(null);

  useEffect(() => {
    if (!booking?.showtimeId) return;

    const fetchSeats = async () => {
      setLoading(true);
      try {
        const res = await getSeatsByShowtime(booking.showtimeId);
        setRows(res?.data?.rows ?? []);
        setHall(res?.data?.hall ?? null);
      } catch {
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSeats();
  }, []);

  // ── SEAT CLICK ──────────────────────────────────────────────────────────────
  const handleSeatClick = (rowIdx, seatIdx, seat) => {
    if (seat.status === 'booked' || seat.status === 'reserved') return;

    const isSelected = selectedSeats.some(s => s.showtime_seat_id === seat.showtime_seat_id);

    if (!isSelected && selectedSeats.length >= MAX_SEATS) {
      alert(`Max ${MAX_SEATS} seats per booking.`);
      return;
    }

    // Toggle visual status in rows
    setRows(prev => prev.map((row, rI) => {
      if (rI !== rowIdx) return row;
      return {
        ...row,
        seats: row.seats.map((s, sI) => {
          if (sI !== seatIdx) return s;
          return { ...s, status: s.status === 'available' ? 'selected' : 'available' };
        })
      };
    }));

    setSelectedSeats(prev =>
      isSelected
        ? prev.filter(s => s.showtime_seat_id !== seat.showtime_seat_id)
        : [...prev, { showtime_seat_id: seat.showtime_seat_id, seat_name: seat.seat_name, seat_type: seat.seat_type }]
    );
  };

  // ── CANCEL SELECTION ────────────────────────────────────────────────────────
  const cancelSelection = () => {
    setRows(prev => prev.map(row => ({
      ...row,
      seats: row.seats.map(s => s.status === 'selected' ? { ...s, status: 'available' } : s)
    })));
    setSelectedSeats([]);
  };

  // ── CONFIRM PAYMENT ────────────────────────────────────────────────────────
  const handlePayClick = async () => {
  setConfirming(true);
  try {
    const response = await addStripeApi({finalAmount})
    
    setClientSecret(response.data.clientSecret);

  } catch (err) {
    toast.error(err?.response?.data?.message ||err.message ||  "Payment failed to initialize. Check your server connection.");

  } finally {
    setConfirming(false);
  }
};

  // ── CONFIRM BOOKING ─────────────────────────────────────────────────────────
const confirmBooking = async () => {

  setTimeout(() => {
    setClientSecret("")
  }, 1000);

  setConfirming(true);

  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user?.id ?? null;

    // 1. API Calls to book seats
    await Promise.all(
      selectedSeats.map(s =>
        bookSeatApi({ showtime_seat_id: s.showtime_seat_id, user_id: userId })
      )
    );

    const newBookingId = 'CHIP-' + Date.now().toString().slice(-8);
    setBookingId(newBookingId);
    
    setBookingComplete(true); 
        
    setRows(prev => prev.map(row => ({
      ...row,
      seats: row.seats.map(s =>
        s.status === 'selected' ? { ...s, status: 'booked' } : s
      )
    })));

  } catch (err) {
    alert(err?.response?.data?.message ?? 'Booking failed. Please try again.');
  } finally {
    setConfirming(false);
  }
};

  // ── PRICING ─────────────────────────────────────────────────────────────────
  const basePrice  = booking?.hall?.price ?? 0;
  const vipPrice   = hall?.vipPrice ?? basePrice;

  const subtotal = selectedSeats.reduce((sum, s) => {
    return sum + (s.seat_type === 'vip' ? vipPrice : basePrice);
  }, 0);
  const serviceFee  = Math.round(subtotal * SERVICE_FEE_RATE);
  const finalAmount = subtotal + serviceFee;

  // ── GUARDS ──────────────────────────────────────────────────────────────────
  if (!booking) return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500 text-xs uppercase tracking-widest font-black">No booking session found.</p>
      <button onClick={() => navigate('/')} className="text-[#d4af37] border border-[#d4af37]/40 px-6 py-2 rounded text-xs uppercase tracking-widest font-black cursor-pointer">
        Return Home
      </button>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center">
      <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
    </div>
  );

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-20 pb-12 bg-[#080808] flex text-white overflow-hidden font-sans">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-50 p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white cursor-pointer hover:bg-[#d4af37] hover:text-black transition-all active:scale-90"
      >
        <MdArrowBack size={20} />
      </button>

      {/* Main area shifts left when sidebar is open */}
      <div className={`flex-1 flex flex-col items-center p-4 md:p-10 transition-all duration-500 ${selectedSeats.length > 0 && !bookingComplete ? 'md:mr-96' : ''}`}>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black mb-2 text-[#d4af37] tracking-tight uppercase capitalize">
            {booking.movieTitle}
          </h1>
          <p className="text-gray-500 text-sm tracking-widest font-medium uppercase">
            {booking.hall?.name ?? ''} &nbsp;|&nbsp; {formatTime(booking.slot?.time)} &nbsp;|&nbsp; {formatDate(booking.schedule?.fullDate)}
          </p>
          <p className="text-gray-600 text-xs tracking-widest mt-1 uppercase">
            {booking.showing?.language} &nbsp;·&nbsp; {booking.genre}
          </p>
        </div>

        {/* Screen */}
        <div className="relative w-full max-w-4xl mx-auto mb-16">
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 w-[110%] h-[200px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 50%, transparent 80%)',
              clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
              filter: 'blur(35px)'
            }}
          />
          <svg className="relative z-10 mx-auto" width="100%" height="60" viewBox="0 0 600 60" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <path d="M40 35 Q300 -5 560 35" stroke="white" strokeWidth="3" fill="transparent" strokeLinecap="round" filter="url(#glow)" className="opacity-90" />
            <text x="300" y="55" textAnchor="middle" fill="white" fontSize="8" fontWeight="900" letterSpacing="12" className="opacity-25 uppercase">SCREEN</text>
          </svg>
        </div>

        {/* Seat Grid */}
        <div className="flex flex-col gap-8 items-center w-full">
          {rows.map((row, rowIdx) => {
            const totalSeats = row.seats.length;

            return (
              <div key={row.row_label} className="flex items-center gap-3 md:gap-4">
                <span className="text-gray-600 text-[10px] font-black w-4 text-right">{row.row_label}</span>

                <div className="flex gap-1 md:gap-5">
                  {row.seats.map((seat, seatIdx) => {
                    const x = totalSeats > 1 ? seatIdx / (totalSeats - 1) : 0.5;
                    const archHeight   = 50;
                    const translateY   = -archHeight * 4 * (x - 0.5) * (x - 0.5) + archHeight;
                    const rotationZ    = -(2 * x - 1) * 20;
                    const isSelected   = seat.status === 'selected';
                    const isBooked     = seat.status === 'booked' || seat.status === 'reserved';
                    const isVip        = seat.seat_type === 'vip';

                    return (
                      <div
                        key={seat.seat_name}
                        onClick={() => handleSeatClick(rowIdx, seatIdx, seat)}
                        title={`${seat.seat_name} · ${seat.seat_type} · ${seat.status}`}
                        className={`relative transition-all duration-300 cursor-pointer
                          ${isBooked    ? 'text-white/10 cursor-not-allowed' : ''}
                          ${!isBooked && !isSelected && !isVip ? 'text-gray-600 hover:text-white hover:scale-110' : ''}
                          ${!isBooked && !isSelected && isVip  ? 'text-amber-600/60 hover:text-amber-400 hover:scale-110' : ''}
                          ${isSelected && !isVip ? 'text-[#d4af37] scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : ''}
                          ${isSelected && isVip  ? 'text-amber-300 scale-110 drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]' : ''}
                        `}
                        style={{ transform: `translateY(${translateY}px) rotateZ(${rotationZ}deg)` }}
                      >
                        <MdEventSeat size={window.innerWidth < 768 ? 22 : 28} />
                        {isVip && !isBooked && (
                          <FaCrown
                            size={7}
                            className={`absolute -top-1.5 left-1/2 -translate-x-1/2 ${isSelected ? 'text-amber-300' : 'text-amber-600/60'}`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <span className="text-gray-600 text-[10px] font-black w-4">{row.row_label}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 md:gap-10 mt-20 border-t border-white/5 pt-6 justify-center">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <MdEventSeat className="text-gray-600" size={18} /> Available
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <MdEventSeat className="text-[#d4af37]" size={18} /> Selected
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <MdEventSeat className="text-white/10" size={18} /> Booked
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <div className="relative">
              <MdEventSeat className="text-amber-600/60" size={18} />
              <FaCrown size={6} className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-amber-600/60" />
            </div>
            VIP (Rs. {vipPrice})
          </div>
        </div>
      </div>

      {/* ── SIDEBAR SUMMARY ─────────────────────────────────────────────────── */}
      {selectedSeats.length > 0 && !bookingComplete && (
        <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-full md:w-96 bg-[#0f0f0f] border-l border-white/10 p-6 md:p-8 shadow-2xl overflow-y-auto z-40 transition-all duration-500">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-gray-500">Booking Summary</h3>

              <div className="mb-5 pb-5 border-b border-white/5 space-y-1">
                <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Movie</p>
                <p className="font-bold text-white capitalize">{booking.movieTitle}</p>
              </div>

              <div className="mb-5 pb-5 border-b border-white/5 space-y-1">
                <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Hall & Time</p>
                <p className="font-bold text-white text-sm">{booking.hall?.name}</p>
                <p className="text-gray-500 text-xs">{formatTime(booking.slot?.time)} · {formatDate(booking.schedule?.fullDate)}</p>
              </div>

              <div className="mb-5 pb-5 border-b border-white/5 space-y-1">
                <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Language</p>
                <p className="font-bold text-white text-sm">{booking.showing?.language}</p>
              </div>

              <div className="mb-6 space-y-2">
                <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-3">
                  Selected Seats ({selectedSeats.length}/{MAX_SEATS})
                </p>
                <div className="flex gap-2 flex-wrap">
                  {selectedSeats.map(s => (
                    <span
                      key={s.showtime_seat_id}
                      className={`font-black px-3 py-1 rounded text-xs flex items-center gap-1 ${
                        s.seat_type === 'vip'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-[#d4af37] text-black'
                      }`}
                    >
                      {s.seat_type === 'vip' && <FaCrown size={7} />}
                      {s.seat_name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {selectedSeats.filter(s => s.seat_type !== 'vip').length > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">
                      Standard × {selectedSeats.filter(s => s.seat_type !== 'vip').length}
                    </span>
                    <span className="text-white font-bold">
                      Rs. {selectedSeats.filter(s => s.seat_type !== 'vip').length * basePrice}
                    </span>
                  </div>
                )}
                {selectedSeats.filter(s => s.seat_type === 'vip').length > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-400/70">
                      VIP × {selectedSeats.filter(s => s.seat_type === 'vip').length}
                    </span>
                    <span className="text-amber-400 font-bold">
                      Rs. {selectedSeats.filter(s => s.seat_type === 'vip').length * vipPrice}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Service Fee (5%)</span>
                  <span className="text-white font-bold">Rs. {serviceFee}</span>
                </div>
                <div className="flex justify-between text-xl font-light border-t border-white/5 pt-5 mt-3">
                  <span className="text-gray-400">Total</span>
                  <span className="text-[#d4af37] font-bold">Rs. {finalAmount}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-10">
              <button
                onClick={cancelSelection}
                className="cursor-pointer w-full text-gray-500 hover:text-white font-bold py-3 text-xs uppercase tracking-widest transition-all"
              >
                Cancel Selection
              </button>
              <button
                disabled={confirming}
                onClick={handlePayClick}
                className="cursor-pointer w-full bg-[#d4af37] hover:bg-[#c19d2d] text-black font-black py-4 rounded-xl transition-all active:scale-95 uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {confirming ? <><FaSpinner className="animate-spin" /> Confirming...</> : 'Confirm & Pay'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* this is for stripe */}
      {clientSecret && (
         <StripeModal 
          key={clientSecret}
          clientSecret={clientSecret} 
          onSuccess={confirmBooking}
         />
       )}

      {bookingComplete && (
        <BookingConfirmation 
          isOpen={bookingComplete} 
          bookingId={bookingId} 
          booking={{
            movieTitle: booking.movieTitle,
            hall: { name: booking.hall?.name },
            slot: { time: booking.slot?.time },
            schedule : { date: booking.schedule},
            showtimeId: { showtimeId: booking.showtimeId}
          }}
          selectedSeats={selectedSeats}
          finalAmount={finalAmount} 
        />
      )}
    </div>
  );
};

export default SeatBooking;