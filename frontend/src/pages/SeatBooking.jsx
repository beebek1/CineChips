import { useState } from "react";
import { MdEventSeat, MdClose } from "react-icons/md";

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
  const [showConfirmation, setShowConfirmation] = useState(false);
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

  const handleBooking = () => {
    setShowConfirmation(true);
  };

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
    
    setShowConfirmation(false);
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
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-black flex text-white overflow-hidden'>
      <div className={`flex-1 flex flex-col items-center justify-center p-4 md:p-10 transition-all duration-500 ${selectedSeats.length > 0 && !bookingComplete ? 'md:mr-96' : ''}`}>
        <div className="text-center mb-8">
          <h1 className='text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent'>
            The Matrix Resurrections
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            QFX Civil Mall | 7:00 PM | Action/Sci-Fi
          </p>
        </div>
        
        <svg className="mx-auto mb-12 md:mb-20" width="100%" height="80" viewBox="0 0 600 80" preserveAspectRatio="xMidYMid meet">
          <path d="M10 64 Q300 -32 590 64" stroke="#fff" strokeWidth="8" fill="transparent" />
          <text x="300" y="75" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">SCREEN</text>
        </svg>

        <div className="flex flex-col gap-8 md:gap-14 items-center">
          <div className="flex flex-col gap-6 md:gap-10 items-center">
            {seats.map((row, rowIndex) => {
              const flatSeats = row.sections.flat();
              const totalSeats = flatSeats.length;
              const archHeight = 80;

              return (
                <div key={row.row} className="flex items-center gap-2 md:gap-16">
                  <span className="text-gray-400 text-xs font-bold w-4">{row.row}</span>
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
                              ${seat.status === "available" && "text-green-500 cursor-pointer hover:text-green-400 hover:scale-110"}
                              ${seat.status === "selected" && "text-yellow-400 cursor-pointer scale-110 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"}
                              ${seat.status === "booked" && "text-red-600 cursor-not-allowed"}`}
                            style={{
                              transform: `translateY(${translateY}px) rotateZ(${rotationZ}deg) rotateX(${rotationX}deg)`
                            }}
                            title={`Seat ${seat.id} - ${seat.status}`}
                          >
                            <MdEventSeat size={window.innerWidth < 768 ? 24 : 32} />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                  <span className="text-gray-400 text-xs font-bold w-4">{row.row}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 md:gap-10 mt-10 md:mt-20 border-t border-gray-700 pt-6 justify-center">
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
              <MdEventSeat className="text-green-500" size={24} /> Available
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
              <MdEventSeat className="text-yellow-400" size={24} /> Selected
            </div>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
              <MdEventSeat className="text-red-600" size={24} /> Booked
            </div>
          </div>
        </div>

        {selectedSeats.length > 0 && !bookingComplete && (
          <div className="fixed top-0 right-0 h-full w-full md:w-96 bg-gray-800 border-l-2 border-yellow-500 p-4 md:p-6 shadow-2xl transform transition-transform duration-500 ease-in-out translate-x-0 overflow-y-auto">
            <div className="flex flex-col h-full justify-between">
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-yellow-400">Booking Summary</h3>
                
                <div className="flex flex-col mb-6">
                  <span className="text-gray-400 text-sm mb-2">Selected Seats ({selectedSeats.length}/{MAX_SEATS})</span>
                  <div className="flex gap-2 flex-wrap">
                    {selectedSeats.map(seat => (
                      <span key={seat.id} className="bg-yellow-500 text-black font-bold px-3 py-1 rounded text-sm">
                        {seat.id}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">Price per seat</span>
                    <span className="text-white">Rs. {SEAT_PRICE}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">Subtotal ({selectedSeats.length} seats)</span>
                    <span className="text-white">Rs. {totalAmount}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400 text-sm">Service Fee (5%)</span>
                    <span className="text-white">Rs. {serviceFee}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold border-t border-gray-600 pt-3 mt-3">
                    <span>Total Amount</span>
                    <span className="text-green-400">Rs. {finalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-all active:scale-95"
                  onClick={cancelSelection}
                >
                  Cancel Selection
                </button>
                <button 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-all active:scale-95 shadow-lg"
                  onClick={handleBooking}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        )}

        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl p-6 md:p-8 max-w-md w-full border-2 border-yellow-500 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-yellow-400">Confirm Booking</h2>
                <button onClick={() => setShowConfirmation(false)} className="text-gray-400 hover:text-white">
                  <MdClose size={24} />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="border-b border-gray-700 pb-3">
                  <p className="text-gray-400 text-sm">Movie</p>
                  <p className="font-semibold">The Matrix Resurrections</p>
                </div>
                <div className="border-b border-gray-700 pb-3">
                  <p className="text-gray-400 text-sm">Seats</p>
                  <p className="font-semibold">{selectedSeats.map(s => s.id).join(', ')}</p>
                </div>
                <div className="border-b border-gray-700 pb-3">
                  <p className="text-gray-400 text-sm">Theater & Time</p>
                  <p className="font-semibold">QFX Civil Mall | 7:00 PM</p>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Tickets ({selectedSeats.length})</span>
                    <span>Rs. {totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Service Fee</span>
                    <span>Rs. {serviceFee}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold border-t border-gray-700 pt-2">
                    <span>Total</span>
                    <span className="text-green-400">Rs. {finalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-all"
                  onClick={() => setShowConfirmation(false)}
                >
                  Go Back
                </button>
                <button 
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all active:scale-95"
                  onClick={confirmBooking}
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        )}

        {bookingComplete && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 md:p-8 max-w-md w-full border-2 border-green-500 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-green-400 mb-2">Booking Successful!</h2>
                <p className="text-gray-400 mb-6">Your tickets have been confirmed</p>
                
                <div className="bg-gray-700 rounded-lg p-4 mb-6 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Booking ID</span>
                    <span className="font-bold text-yellow-400">{bookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Seats</span>
                    <span className="font-semibold">{selectedSeats.map(s => s.id).join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount Paid</span>
                    <span className="font-bold text-green-400">Rs. {finalAmount}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 mb-6">
                  A confirmation email has been sent to your registered email address.
                </p>

                <button 
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-all active:scale-95"
                  onClick={resetBooking}
                >
                  Book More Tickets
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