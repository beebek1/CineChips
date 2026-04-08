import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { StripeModal } from "../components/StripeModal";
import SeatGrid from "../components/seatBooking/SeatGrid";
import SeatLegend from "../components/seatBooking/SeatLegend";
import SeatSummarySidebar from "../components/seatBooking/SeatSummarySidebar";
import BookingConfirmationModal from "../components/BookingConfirmationModal";
import { useSeatBooking } from "../hooks/useSeatBooking";
import type { ActiveBooking } from "../booking.types";
import { formatLongDate, formatTime } from "../booking.utils";

const SeatBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const booking = JSON.parse(localStorage.getItem("activeBooking") || "null") as ActiveBooking | null;

  const {
    MAX_SEATS,
    clientSecret,
    rows,
    loading,
    selectedSeats,
    confirming,
    bookingComplete,
    bookingId,
    basePrice,
    vipPrice,
    serviceFee,
    finalAmount,
    handleSeatClick,
    cancelSelection,
    handlePayClick,
    closePaymentModal,
    confirmBooking,
  } = useSeatBooking(booking);

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500 text-xs uppercase tracking-widest font-black">No booking session found.</p>
        <button
          onClick={() => navigate("/")}
          className="text-[#d4af37] border border-[#d4af37]/40 px-6 py-2 rounded text-xs uppercase tracking-widest font-black cursor-pointer"
        >
          Return Home
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-[#080808] flex text-white overflow-hidden font-sans">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-8 left-8 z-50 p-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white cursor-pointer hover:bg-[#d4af37] hover:text-black transition-all active:scale-90"
      >
        <MdArrowBack size={20} />
      </button>

      <div className={`flex-1 flex flex-col items-center p-4 md:p-10 transition-all duration-500 ${selectedSeats.length > 0 && !bookingComplete ? "md:mr-96" : ""}`}>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black mb-2 text-[#d4af37] tracking-tight uppercase capitalize">
            {booking.movieTitle}
          </h1>
          <p className="text-gray-500 text-sm tracking-widest font-medium uppercase">
            {booking.hall?.name ?? ""} &nbsp;|&nbsp; {formatTime(booking.slot?.time)} &nbsp;|&nbsp; {formatLongDate(booking.schedule?.fullDate)}
          </p>
          <p className="text-gray-600 text-xs tracking-widest mt-1 uppercase">
            {booking.showing?.language} &nbsp;·&nbsp; {booking.genre}
          </p>
        </div>

        <SeatGrid rows={rows} onSeatClick={handleSeatClick} />
        <SeatLegend vipPrice={vipPrice} />
      </div>

      {selectedSeats.length > 0 && !bookingComplete && (
        <SeatSummarySidebar
          booking={booking}
          selectedSeats={selectedSeats}
          maxSeats={MAX_SEATS}
          basePrice={basePrice}
          vipPrice={vipPrice}
          serviceFee={serviceFee}
          finalAmount={finalAmount}
          confirming={confirming}
          onCancel={cancelSelection}
          onPay={handlePayClick}
        />
      )}

      {clientSecret && (
        <StripeModal key={clientSecret} clientSecret={clientSecret} onSuccess={confirmBooking} onCancel={closePaymentModal} />
      )}

      {bookingComplete && bookingId && (
        <BookingConfirmationModal
          isOpen={bookingComplete}
          bookingId={bookingId}
          booking={booking}
          selectedSeats={selectedSeats}
          finalAmount={finalAmount}
        />
      )}
    </div>
  );
};

export default SeatBookingPage;