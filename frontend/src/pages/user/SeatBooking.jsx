import { useState } from "react";
import { MdEventSeat } from "react-icons/md";

const initialSeatLayout = [
  {
    row: "A",
    sections: [
      [{ id: "A1", status: "available" }, { id: "A2", status: "available" }, { id: "A3", status: "booked" }],
      [{ id: "A4", status: "available" }, { id: "A5", status: "available" }, { id: "A6", status: "available" }, { id: "A7", status: "available" }, { id: "A8", status: "available" }, { id: "A9", status: "available" }],
      [{ id: "A10", status: "available" }, { id: "A11", status: "available" }, { id: "A12", status: "available" }]
    ]
  },
  {
    row: "B",
    sections: [
      [{ id: "B1", status: "available" }, { id: "B2", status: "available" }, { id: "B3", status: "available" }],
      [{ id: "B4", status: "available" }, { id: "B5", status: "booked" }, { id: "B6", status: "available" }, { id: "B7", status: "available" }, { id: "B8", status: "available" }, { id: "B9", status: "available" }],
      [{ id: "B10", status: "available" }, { id: "B11", status: "available" }, { id: "B12", status: "available" }]
    ]
  },
  {
    row: "C",
    sections: [
      [{ id: "C1", status: "available" }, { id: "C2", status: "available" }, { id: "C3", status: "available" }],
      [{ id: "C4", status: "available" }, { id: "C5", status: "available" }, { id: "C6", status: "available" }, { id: "C7", status: "available" }, { id: "C8", status: "available" }, { id: "C9", status: "available" }],
      [{ id: "C10", status: "available" }, { id: "C11", status: "available" }, { id: "C12", status: "available" }]
    ]
  },
  {
    row: "D",
    sections: [
      [{ id: "D1", status: "available" }, { id: "D2", status: "available" }, { id: "D3", status: "available" }],
      [{ id: "D4", status: "available" }, { id: "D5", status: "available" }, { id: "D6", status: "available" }, { id: "D7", status: "available" }, { id: "D8", status: "available" }, { id: "D9", status: "available" }],
      [{ id: "D10", status: "available" }, { id: "D11", status: "available" }, { id: "D12", status: "available" }]
    ]
  },
  {
    row: "E",
    sections: [
      [{ id: "E1", status: "available" }, { id: "E2", status: "available" }, { id: "E3", status: "available" }],
      [{ id: "E4", status: "available" }, { id: "E5", status: "available" }, { id: "E6", status: "available" }, { id: "E7", status: "available" }, { id: "E8", status: "available" }, { id: "E9", status: "available" }],
      [{ id: "E10", status: "available" }, { id: "E11", status: "available" }, { id: "E12", status: "available" }]
    ]
  },
  {
    row: "F",
    sections: [
      [{ id: "F1", status: "available" }, { id: "F2", status: "available" }, { id: "F3", status: "available" }],
      [{ id: "F4", status: "available" }, { id: "F5", status: "available" }, { id: "F6", status: "available" }, { id: "F7", status: "available" }, { id: "F8", status: "available" }, { id: "F9", status: "available" }],
      [{ id: "F10", status: "available" }, { id: "F11", status: "available" }, { id: "F12", status: "available" }]
    ]
  }
];

const SeatBooking = () => {
  const [seats, setSeats] = useState(initialSeatLayout);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  const SEAT_PRICE = 500;
  const MAX_SEATS = 10;

  const handleSeatClick = (rowIndex, sectionIndex, seatIndex) => {
    const seat = seats[rowIndex].sections[sectionIndex][seatIndex];
    if (seat.status === "booked") return;
    const isSelected = seat.status === "selected";
    
    if (!isSelected && selectedSeats.length >= MAX_SEATS) {
      alert(`You can only select up to ${MAX_SEATS} seats at a time.`);
      return;
    }

    setSeats(prev =>
      prev.map((row, rI) => {
        if (rI !== rowIndex) return row;
        return {
          ...row,
          sections: row.sections.map((section, sI) =>
            sI !== sectionIndex
              ? section
              : section.map((s, seI) => {
                  if (seI !== seatIndex) return s;
                  const newStatus = s.status === "available" ? "selected" : "available";
                  return { ...s, status: newStatus };
                })
          )
        };
      })
    );

    setSelectedSeats(prev => {
      const exists = prev.find(s => s.id === seat.id);
      return exists
        ? prev.filter(s => s.id !== seat.id)
        : [...prev, { id: seat.id, row: seats[rowIndex].row }];
    });
  };

  const totalAmount = selectedSeats.length * SEAT_PRICE;
  const serviceFee = Math.round(totalAmount * 0.05);
  const finalAmount = totalAmount + serviceFee;

  const confirmBooking = () => {
    const id = 'BK' + Date.now().toString().slice(-8);
    setBookingId(id);
    setSeats(prev =>
      prev.map(row => ({
        ...row,
        sections: row.sections.map(section =>
          section.map(seat =>
            seat.status === "selected" ? { ...seat, status: "booked" } : seat
          )
        )
      }))
    );
    setBookingComplete(true);
  };

  const resetBooking = () => {
    setSelectedSeats([]);
    setBookingComplete(false);
    setBookingId(null);
  };

  const cancelSelection = () => {
    setSeats(prev =>
      prev.map(row => ({
        ...row,
        sections: row.sections.map(section =>
          section.map(seat =>
            seat.status === "selected" ? { ...seat, status: "available" } : seat
          )
        )
      }))
    );
    setSelectedSeats([]);
  };

  return (
    <div className='min-h-screen pt-20 md:pb-9 bg-[#080808] flex text-white overflow-hidden font-sans'>
      {/* Dynamic Margin container to move UI when sidebar appears */}
      <div className={`flex-1 flex flex-col items-center justify-center p-4 md:p-10 transition-all duration-500 ${selectedSeats.length > 0 && !bookingComplete ? 'md:mr-96' : ''}`}>
        
        <div className="text-center mb-8">
          <h1 className='text-3xl md:text-4xl font-bold mb-2 text-[#d4af37] tracking-tight uppercase'>
            DUNE: PART TWO
          </h1>
          <p className="text-gray-500 text-sm md:text-base tracking-widest font-medium">
            QFX CIVIL MALL | 7:00 PM | ACTION/SCI-FI
          </p>
        </div>

        {/* Thinner Brighter White Screen */}
        <div className="relative w-full max-w-4xl mx-auto mb-20 md:mb-15">
          {/* The Light Beam Projection - Casts light toward seats */}
          <div 
            className="absolute top-2 left-1/2 -translate-x-1/2 w-[110%] h-[250px] pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 50%, transparent 80%)',
              clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
              filter: 'blur(35px)'
            }}
          ></div>

          {/* Thin Screen SVG */}
          <svg className="relative z-10 mx-auto" width="100%" height="80" viewBox="0 0 600 80" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="thinGlow" x="-20%" y="-20%" width="140%" height="180%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Thinner White Screen Line (4px instead of 10px) */}
            <path 
              d="M40 40 Q300 -10 560 40" 
              stroke="white" 
              strokeWidth="4" 
              fill="transparent" 
              strokeLinecap="round"
              filter="url(#thinGlow)"
              className="opacity-100"
            />
            
            {/* Label moved further below the arc */}
            <text x="300" y="70" textAnchor="middle" fill="white" fontSize="9" fontWeight="900" letterSpacing="12" className="opacity-30 uppercase tracking-[1em]">
              SCREEN
            </text>
          </svg>
        </div>

        <div className="flex flex-col gap-8 md:gap-14 items-center">
          <div className="flex flex-col gap-6 md:gap-7 items-center">
            {seats.map((row, rowIndex) => {
              const flatSeats = row.sections.flat();
              const totalSeats = flatSeats.length;
              const archHeight = 80;

              return (
                <div key={row.row} className="flex items-center gap-2 md:gap-13">
                  <span className="text-gray-700 text-[10px] font-black w-4">{row.row}</span>
                  {row.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="flex gap-1 md:gap-4">
                      {section.map((seat, seatIndex) => {
                        const globalSeatIndex = row.sections
                          .slice(0, sectionIndex)
                          .reduce((acc, sec) => acc + sec.length, 0) + seatIndex;
                        const x = globalSeatIndex / (totalSeats - 1);
                        const translateY = -archHeight * 4 * (x - 0.5) * (x - 0.5) + archHeight;
                        const rotationZ = -(2 * x - 1) * 25;
                        const rotationX = (1 - Math.abs(2 * x - 1)) * 10;

                        return (
                          <div
                            key={seat.id}
                            onClick={() => handleSeatClick(rowIndex, sectionIndex, seatIndex)}
                            className={`transition-all duration-300 transform
                              ${seat.status === "available" && "text-gray-600 cursor-pointer hover:text-white hover:scale-110"}
                              ${seat.status === "selected" && "text-[#d4af37] cursor-pointer scale-110 drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"}
                              ${seat.status === "booked" && "text-white/10 cursor-not-allowed"}`}
                            style={{
                              transform: `translateY(${translateY}px) rotateZ(${rotationZ}deg) rotateX(${rotationX}deg)`
                            }}
                          >
                            <MdEventSeat size={window.innerWidth < 768 ? 24 : 32} />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <span className="text-gray-700 text-[10px] font-black w-4">{row.row}</span>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 md:gap-10 mt-10 md:mt-20 border-t border-white/5 pt-6 justify-center">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <MdEventSeat className="text-gray-600" size={20} /> Available
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <MdEventSeat className="text-[#d4af37]" size={20} /> Selected
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
              <MdEventSeat className="text-white/10" size={20} /> Booked
            </div>
          </div>
        </div>

        {/* Sidebar Summary - Restored functionality */}
        {selectedSeats.length > 0 && !bookingComplete && (
          <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-full md:w-96 bg-[#111] border-l border-white/10 p-4 md:p-8 shadow-3xl transform transition-transform duration-500 ease-in-out translate-x-0 overflow-y-auto z-40">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] mb-10 text-gray-400">Booking Summary</h3>
                
                <div className="mb-6 pb-6 border-b border-white/5">
                  <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-1">Movie</p>
                  <p className="font-bold text-lg text-white">Dune: Part Two</p>
                </div>

                <div className="mb-6 pb-6 border-b border-white/5">
                  <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-1">Theater & Time</p>
                  <p className="font-bold text-white">QFX Civil Mall | 7:00 PM</p>
                </div>
                
                <div className="flex flex-col mb-10">
                  <span className="text-[10px] text-gray-600 uppercase font-bold tracking-widest mb-3">Selected Seats ({selectedSeats.length}/{MAX_SEATS})</span>
                  <div className="flex gap-2 flex-wrap">
                    {selectedSeats.map(seat => (
                      <span key={seat.id} className="bg-[#d4af37] text-black font-black px-3 py-1 rounded text-xs">
                        {seat.id}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Price per seat</span>
                    <span className="text-white font-bold">Rs. {SEAT_PRICE}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-white font-bold">Rs. {totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Service Fee (5%)</span>
                    <span className="text-white font-bold">Rs. {serviceFee}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-light border-t border-white/5 pt-6 mt-6">
                    <span className="text-gray-400">Total</span>
                    <span className="text-[#d4af37] font-bold">Rs. {finalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-12">
                <button 
                  className="w-full text-gray-500 hover:text-white font-bold py-3 text-xs uppercase tracking-widest transition-all"
                  onClick={cancelSelection}
                >
                  Cancel Selection
                </button>
                <button 
                  className="w-full bg-[#d4af37] hover:bg-[#c19d2d] text-black font-black py-4 rounded-xl transition-all active:scale-95 shadow-xl shadow-[#d4af37]/5 uppercase text-xs tracking-[0.2em]"
                  onClick={confirmBooking}
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {bookingComplete && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <MdEventSeat className="text-[#d4af37]" size={32} />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Booking Successful!</h2>
                <p className="text-gray-500 text-sm mb-8 tracking-wide">Your seats are secured.</p>
                
                <div className="bg-white/5 rounded-2xl p-6 mb-8 space-y-4">
                  <div className="flex justify-between text-xs uppercase tracking-widest">
                    <span className="text-gray-500">Booking ID</span>
                    <span className="font-bold text-[#d4af37]">{bookingId}</span>
                  </div>
                  <div className="flex justify-between text-xs uppercase tracking-widest">
                    <span className="text-gray-500">Seats</span>
                    <span className="text-white font-bold">{selectedSeats.map(s => s.id).join(', ')}</span>
                  </div>
                  <div className="flex justify-between text-xs uppercase tracking-widest">
                    <span className="text-gray-500">Paid Amount</span>
                    <span className="text-white font-bold">Rs. {finalAmount}</span>
                  </div>
                </div>

                <button 
                  className="w-full bg-white text-black font-black py-4 rounded-xl transition-all active:scale-95 uppercase text-xs tracking-widest"
                  onClick={resetBooking}
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatBooking;