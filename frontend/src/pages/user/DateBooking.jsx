import { useState } from "react";
import { MdLocationOn, MdCalendarToday, MdAccessTime, MdLanguage, MdChevronRight, MdConfirmationNumber } from "react-icons/md";

const MovieBookingDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const dates = [
    { id: 1, day: "MON", date: "12", month: "FEB", fullDate: "Feb 12, 2024" },
    { id: 2, day: "TUE", date: "13", month: "FEB", fullDate: "Feb 13, 2024" },
    { id: 3, day: "WED", date: "14", month: "FEB", fullDate: "Feb 14, 2024" },
    { id: 4, day: "THU", date: "15", month: "FEB", fullDate: "Feb 15, 2024" },
    { id: 5, day: "FRI", date: "16", month: "FEB", fullDate: "Feb 16, 2024" },
    { id: 6, day: "SAT", date: "17", month: "FEB", fullDate: "Feb 17, 2024" },
    { id: 7, day: "SUN", date: "18", month: "FEB", fullDate: "Feb 18, 2024" }
  ];

  const locations = [
    { id: 1, name: "QFX Civil Mall", address: "Sundhara, Kathmandu", price: 500 },
    { id: 2, name: "QFX Labim Mall", address: "Pulchowk, Lalitpur", price: 450 },
    { id: 3, name: "Big Movies", address: "Bhaktapur", price: 400 },
    { id: 4, name: "FCube Cinemas", address: "Kamalpokhari, Kathmandu", price: 550 }
  ];

  const languages = [
    { id: 1, name: "English", subtitle: "No Subtitles", code: "EN" },
    { id: 2, name: "Hindi", subtitle: "English Subtitles", code: "HI" },
    { id: 3, name: "Nepali", subtitle: "No Subtitles", code: "NE" }
  ];

  const times = [
    { id: 1, time: "10:00 AM", available: 45 },
    { id: 2, time: "1:00 PM", available: 78 },
    { id: 3, time: "4:00 PM", available: 12 },
    { id: 4, time: "7:00 PM", available: 0 }
  ];

  const isAllSelected = selectedDate && selectedLocation && selectedLanguage && selectedTime;
  const selectedLocationData = locations.find(l => l.id === selectedLocation);
  const selectedLanguageData = languages.find(l => l.id === selectedLanguage);

  return (
    <div className="min-h-screen bg-[#080808] text-gray-200 font-sans">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 opacity-40"
          style={{ backgroundImage: "linear-gradient(to bottom, transparent, #080808), url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=1920')" }}
        />
        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-10 items-end w-full">
            <div className="hidden md:block w-48 shrink-0 rounded-xl overflow-hidden border border-white/5 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=600" alt="Poster" />
            </div>
            <div className="flex-1">
              <div className="flex gap-3 mb-4 text-[10px] font-bold uppercase tracking-widest">
                <span className="border border-[#d4af37]/40 text-[#d4af37] px-2 py-1 rounded">IMAX 2D</span>
                <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400">Action • Sci-Fi</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-light mb-2 tracking-tight text-white">
                DUNE: <span className="font-bold">PART TWO</span>
              </h1>
              <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
                The mythic journey of Paul Atreides as he unites with Chani and the Fremen on a warpath of revenge.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* 1. Date Section */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600">01. Select Date</h2>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {dates.map(date => (
                  <button
                    key={date.id}
                    onClick={() => setSelectedDate(date.id)}
                    className={`flex-shrink-0 w-16 py-4 rounded-xl transition-all border ${
                      selectedDate === date.id ? "bg-white text-black border-white" : "bg-white/5 border-white/5 text-gray-500 hover:border-white/20"
                    }`}
                  >
                    <div className="text-[9px] font-bold uppercase mb-1">{date.day}</div>
                    <div className="text-xl font-bold">{date.date}</div>
                  </button>
                ))}
              </div>
            </section>

            {/* 2. Cinema Section */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600">02. Cinemas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locations.map(loc => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.id)}
                    className={`p-6 rounded-2xl text-left transition-all border ${
                      selectedLocation === loc.id ? "bg-[#111] border-[#d4af37]/60" : "bg-white/5 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`font-bold ${selectedLocation === loc.id ? 'text-[#d4af37]' : 'text-white'}`}>{loc.name}</h3>
                      <span className="text-xs font-bold text-gray-500">₹{loc.price}</span>
                    </div>
                    <p className="text-xs text-gray-600">{loc.address}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* 3. Language Section - NEWLY ADDED */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600">03. Language</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {languages.map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`p-4 rounded-xl transition-all border flex items-center gap-4 ${
                      selectedLanguage === lang.id ? "bg-[#111] border-[#d4af37]/60" : "bg-white/5 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs ${
                      selectedLanguage === lang.id ? "bg-[#d4af37] text-black" : "bg-white/5 text-gray-500"
                    }`}>
                      {lang.code}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white leading-none mb-1">{lang.name}</h3>
                      <p className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">{lang.subtitle}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* 4. Showtimes */}
            <section>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6 text-gray-600">04. Showtimes</h2>
              <div className="flex flex-wrap gap-3">
                {times.map(t => (
                  <button
                    key={t.id}
                    disabled={t.available === 0}
                    onClick={() => setSelectedTime(t.id)}
                    className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest transition-all border ${
                      t.available === 0 ? "opacity-10 cursor-not-allowed border-white/5" :
                      selectedTime === t.id ? "bg-[#d4af37] border-[#d4af37] text-black" : "bg-transparent border-white/10 text-gray-500 hover:border-[#d4af37]/50"
                    }`}
                  >
                    {t.time}
                  </button>
                ))}
              </div>
            </section>
          </div>

          {/* Checkout Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-[#111] rounded-3xl p-8 border border-white/5">
              <div className="flex items-center gap-2 mb-10">
                <div className="w-1 h-1 rounded-full bg-[#d4af37]" />
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500">Booking Summary</h3>
              </div>

              <div className="space-y-8 mb-12">
                <div>
                   <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Cinema</p>
                   <p className="text-white font-medium">{selectedLocationData?.name || "—"}</p>
                </div>
                <div>
                   <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Language</p>
                   <p className="text-white font-medium">{selectedLanguageData ? `${selectedLanguageData.name} (${selectedLanguageData.code})` : "—"}</p>
                </div>
                <div>
                   <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Date & Time</p>
                   <p className="text-white font-medium">
                    {selectedDate && selectedTime ? 
                      `${dates.find(d => d.id === selectedDate).date} FEB, ${times.find(t => t.id === selectedTime).time}` : "—"}
                   </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 flex justify-between items-end mb-10">
                <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Price</span>
                <span className="text-3xl font-light text-white">₹{selectedLocationData?.price || "0"}</span>
              </div>

              <button
                disabled={!isAllSelected}
                className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                  isAllSelected ? "bg-white text-black hover:bg-[#d4af37] active:scale-[0.98]" : "bg-white/5 text-gray-700 cursor-not-allowed"
                }`}
              >
                Proceed to Seats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieBookingDashboard;