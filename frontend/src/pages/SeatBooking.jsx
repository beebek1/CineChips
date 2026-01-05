import SeatData from '../components/SeatData';

const SeatBooking = () => {

    const[selectedSeats, setSelectedSeats] = ([]);

    const handleSeatSelect = () =>{
        console.log("here")
    }

  return (
    
    <div className='min-h-screen bg-[#222] flex flex-col items-center justify-center text-white'>
      <h1 className='text-xl mb-6'>Select your seat</h1>
      <svg
        className="mb-35"
        width="600"
        height="80"
        viewBox="0 0 600 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 64 Q300 -32 590 64"
          stroke="#fff"
          strokeWidth="8"
          fill="transparent"
          filter="url(#glow)"
        />
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%" >
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#fff" floodOpacity="0.8"/>
          </filter>
        </defs>
      </svg>
      <SeatData onSeatSelect={handleSeatSelect}/>


    </div>
  )
}

export default SeatBooking;
