import React, { useState, useEffect } from 'react';
import { 
  FaCalendarPlus, FaClock, FaFilm, FaUniversity, 
  FaTrash, FaEdit, FaTimes, FaSpinner, FaLanguage, FaTag, FaExclamationTriangle 
} from 'react-icons/fa';

const ScheduleAdminMaster = () => {
  // --- STATE ---
  const [schedules, setSchedules] = useState([]);
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    movieId: '',
    hallId: '',
    showDate: '',
    showTime: '',
    language: 'English',
    price: ''
  });

  // --- MOCK API DATA ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(r => setTimeout(r, 800));
      setMovies([
        { id: "m1", title: "DUNE: PART II", duration: 166 },
        { id: "m2", title: "THE BATMAN", duration: 176 }
      ]);
      setHalls([
        { id: "h1", name: "AUDI 01", basePrice: 500 },
        { id: "h2", name: "IMAX PREMIUM", basePrice: 900 }
      ]);
      setSchedules([
        { id: "s1", movieId: "m1", hallId: "h1", showDate: "2026-02-10", showTime: "14:00", language: "English", price: 550 }
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  // --- COLLISION LOGIC ---
  const isHallOccupied = (hallId, date, time, currentId) => {
    return schedules.some(s => 
      s.hallId === hallId && 
      s.showDate === date && 
      s.showTime === time && 
      s.id !== currentId
    );
  };

  // --- HANDLERS ---
  const handleSaveSchedule = (e) => {
    e.preventDefault();
    setError('');

    // Check for hall availability
    if (isHallOccupied(formData.hallId, formData.showDate, formData.showTime, editingId)) {
      setError(`COLLISION DETECTED: This hall is already booked for ${formData.showTime} on this date.`);
      return;
    }

    if (editingId) {
      setSchedules(schedules.map(s => s.id === editingId ? { ...formData, id: editingId } : s));
    } else {
      setSchedules([...schedules, { ...formData, id: `s${Date.now()}` }]);
    }
    setIsModalOpen(false);
  };

  const updateHallAndPrice = (hId) => {
    const selectedHall = halls.find(h => h.id === hId);
    setFormData({
      ...formData,
      hallId: hId,
      price: selectedHall ? selectedHall.basePrice : ''
    });
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h4 className="text-3xl font-light uppercase tracking-tighter">Showtime <span className="font-black text-[#d4af37]">Validation</span></h4>
        </div>
        <button 
          onClick={() => { setEditingId(null); setError(''); setIsModalOpen(true); }}
          className="cursor-pointer bg-[#d4af37] text-black font-black px-8 py-4 rounded-xl text-xs uppercase tracking-widest hover:brightness-110"
        >
          + Add New Schedule
        </button>
      </div>

      {/* --- SCHEDULE TABLE --- */}
      
      <div className="bg-[#111] border-2 border-white/5 rounded-[30px] overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            <tr>
              <th className="px-8 py-5">Movie & Language</th>
              <th className="px-8 py-5">Hall</th>
              <th className="px-8 py-5">Date & Time</th>
              <th className="px-8 py-5">Price</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {schedules.map(s => (
              <tr key={s.id} className="hover:bg-white/[0.02]">
                <td className="px-8 py-5">
                  <p className="font-bold text-sm uppercase">{movies.find(m => m.id === s.movieId)?.title}</p>
                  <span className="text-[10px] text-[#d4af37] font-black">{s.language}</span>
                </td>
                <td className="px-8 py-5 font-bold text-gray-400">{halls.find(h => h.id === s.hallId)?.name}</td>
                <td className="px-8 py-5">
                   <p className="text-sm font-bold">{s.showTime}</p>
                   <p className="text-[10px] text-gray-500 uppercase">{s.showDate}</p>
                </td>
                <td className="px-8 py-5 text-[#d4af37] font-black text-sm">Rs. {s.price}</td>
                <td className="px-8 py-5 text-right">
                    <button onClick={() => { setEditingId(s.id); setFormData(s); setIsModalOpen(true); }} className="cursor-pointer p-3 text-gray-500 hover:text-white"><FaEdit/></button>
                    <button onClick={() => setSchedules(schedules.filter(x => x.id !== s.id))} className="cursor-pointer p-3 text-gray-500 hover:text-red-500"><FaTrash/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/98" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="relative bg-[#161616] border-2 border-white/20 w-full max-w-2xl rounded-[40px] p-10 shadow-2xl animate-in zoom-in duration-200">
            <h2 className="text-3xl font-black text-white uppercase mb-8 pb-4 border-b border-white/10">Configure <span className="text-[#d4af37]">Show</span></h2>

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-wider">
                <FaExclamationTriangle /> {error}
              </div>
            )}

            <form onSubmit={handleSaveSchedule} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-widest block">Movie</label>
                  <select required className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-4 text-white font-bold outline-none focus:border-[#d4af37]" value={formData.movieId} onChange={e => setFormData({...formData, movieId: e.target.value})}>
                    <option value="" className="bg-black">Select Movie</option>
                    {movies.map(m => <option key={m.id} value={m.id} className="bg-black">{m.title}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-widest block">Language</label>
                  <select className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-4 text-white font-bold outline-none focus:border-[#d4af37]" value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}>
                    <option value="English" className="bg-black">English</option>
                    <option value="Nepali" className="bg-black">Nepali</option>
                    <option value="Hindi" className="bg-black">Hindi</option>
                    <option value="Spanish" className="bg-black">Spanish</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-widest block">Assign Hall</label>
                  <select required className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-4 text-white font-bold outline-none focus:border-[#d4af37]" value={formData.hallId} onChange={e => updateHallAndPrice(e.target.value)}>
                    <option value="" className="bg-black">Select Hall</option>
                    {halls.map(h => <option key={h.id} value={h.id} className="bg-black">{h.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-widest block flex items-center gap-2">Ticket Price <FaTag className="text-[#d4af37]"/></label>
                  <input required type="number" className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-4 text-white font-bold outline-none focus:border-[#d4af37]" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-widest block">Date</label>
                  <input required type="date" className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-4 text-white font-bold [color-scheme:dark] outline-none" value={formData.showDate} onChange={e => setFormData({...formData, showDate: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white uppercase tracking-widest block">Show Time</label>
                  <input required type="time" className="w-full bg-white/10 border-2 border-white/20 rounded-xl px-4 py-4 text-white font-bold [color-scheme:dark] outline-none" value={formData.showTime} onChange={e => setFormData({...formData, showTime: e.target.value})} />
                </div>
              </div>

              <button type="submit" className="cursor-pointer w-full bg-[#d4af37] text-black font-black py-5 rounded-2xl text-sm uppercase tracking-widest hover:bg-white transition-all">
                {editingId ? "Update Schedule" : "Confirm Assignment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleAdminMaster;