import React, { useState, useEffect } from 'react';
import { 
  FaUniversity, FaPlus, FaTrash, FaEdit, FaMapMarkerAlt,
  FaTimes, FaTh, FaSpinner, FaCouch, FaDollarSign 
} from 'react-icons/fa';

const HallAdminMaster = () => {
  // --- STATE ---
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rowCount: 10, // Number of rows (converted to A-J)
    colCount: 15,
    basePrice: 500,
    vipRowPrice: 800 // Price for the last row
  });

  // --- MOCK API: Fetching Halls ---
  const fetchHallsApi = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockData = [
      { id: 1, name: "AUDI 01", location: "Level 4, East Wing", rowCount: 10, colCount: 15, basePrice: 450, vipRowPrice: 700 },
      { id: 2, name: "GOLD CLASS", location: "Level 2, VIP Lounge", rowCount: 5, colCount: 8, basePrice: 1200, vipRowPrice: 1800 },
    ];
    setHalls(mockData);
    setLoading(false);
  };

  useEffect(() => { fetchHallsApi(); }, []);

  // --- HELPERS ---
  const numberToAlpha = (num) => String.fromCharCode(64 + num);

  // --- HANDLERS ---
  const handleOpenModal = (hall = null) => {
    if (hall) {
      setEditingId(hall.id);
      setFormData(hall);
    } else {
      setEditingId(null);
      setFormData({ name: '', location: '', rowCount: 10, colCount: 15, basePrice: 500, vipRowPrice: 800 });
    }
    setIsModalOpen(true);
  };

  const handleSaveHall = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    if (editingId) {
      setHalls(halls.map(h => h.id === editingId ? { ...formData, id: editingId } : h));
    } else {
      setHalls([...halls, { ...formData, id: Date.now() }]);
    }
    
    setLoading(false);
    setIsModalOpen(false);
  };

  const deleteHall = async (id) => {
    if (window.confirm("Delete this hall? All seating records and schedules will be lost.")) {
      setHalls(halls.filter(h => h.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">Infrastructure</h3>
          <h4 className="text-white text-3xl font-light tracking-tighter uppercase">Cinema <span className="font-black italic">Halls</span></h4>
        </div>
        <button onClick={() => handleOpenModal()} className="cursor-pointer bg-[#d4af37] text-black font-black px-8 py-4 rounded-xl text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-[#d4af37]/20">
          <FaPlus /> Initialize New Hall
        </button>
      </div>

      {/* --- CONTENT --- */}
      {loading && !isModalOpen ? (
        <div className="flex justify-center py-20"><FaSpinner className="animate-spin text-[#d4af37] text-3xl" /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {halls.map((hall) => (
            <div key={hall.id} className="bg-[#111] border border-white/5 rounded-[40px] p-8 hover:border-[#d4af37]/30 transition-all group overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#d4af37] border border-white/5">
                  <FaUniversity size={18} />
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(hall)} className="cursor-pointer p-3 bg-white/5 rounded-xl text-gray-500 hover:text-white transition-colors"><FaEdit size={12} /></button>
                  <button onClick={() => deleteHall(hall.id)} className="cursor-pointer p-3 bg-red-500/5 rounded-xl text-red-500/50 hover:text-red-500 transition-colors"><FaTrash size={12} /></button>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="text-white text-2xl font-black tracking-tight uppercase mb-1">{hall.name}</h5>
                <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                  <FaMapMarkerAlt className="text-[#d4af37]" /> {hall.location}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5 mb-6">
                <div>
                  <p className="text-gray-600 text-[8px] font-black uppercase tracking-widest mb-1">Rows (Alphabetical)</p>
                  <p className="text-white font-bold text-sm tracking-widest">A - {numberToAlpha(hall.rowCount)}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-[8px] font-black uppercase tracking-widest mb-1">Columns (Numerical)</p>
                  <p className="text-white font-bold text-sm tracking-widest">1 - {hall.colCount}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FaCouch className="text-gray-700" size={14}/>
                    <span className="text-white font-black text-xs">{hall.rowCount * hall.colCount} Seats</span>
                </div>
                <div className="text-right">
                  <p className="text-[#d4af37] text-[10px] font-black tracking-tighter">BASE: Rs.{hall.basePrice}</p>
                  <p className="text-white text-[10px] font-black tracking-tighter uppercase">VIP: Rs.{hall.vipRowPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => !loading && setIsModalOpen(false)}></div>
          
          <div className="relative bg-[#080808] border border-white/10 w-full max-w-2xl rounded-[40px] p-12 shadow-2xl my-auto animate-in zoom-in duration-300">
            <button onClick={() => setIsModalOpen(false)} className="cursor-pointer absolute top-10 right-10 text-gray-600 hover:text-white transition-colors"><FaTimes /></button>
            
            <header className="mb-10">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                {editingId ? "Update" : "Define"} <span className="text-[#d4af37]">Hall</span>
              </h2>
            </header>

            <form onSubmit={handleSaveHall} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Hall Name</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white focus:border-[#d4af37]/40 outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Physical Location</label>
                  <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white focus:border-[#d4af37]/40 outline-none" placeholder="e.g. 4th Floor" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
              </div>

              {/* Seating Grid Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-white/5 rounded-[30px] border border-white/5">
                <div>
                   <label className="text-[9px] font-black text-[#d4af37] uppercase tracking-widest block mb-4">Total Rows (A-{numberToAlpha(formData.rowCount)})</label>
                   <select 
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#d4af37]/40"
                    value={formData.rowCount}
                    onChange={(e) => setFormData({...formData, rowCount: parseInt(e.target.value)})}
                   >
                     {[...Array(26)].map((_, i) => (
                       <option key={i} value={i + 1}>{i + 1} Rows (Up to {numberToAlpha(i+1)})</option>
                     ))}
                   </select>
                </div>
                <div>
                   <label className="text-[9px] font-black text-[#d4af37] uppercase tracking-widest block mb-4">Columns per Row (1-{formData.colCount})</label>
                   <input type="number" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#d4af37]/40" value={formData.colCount} onChange={(e) => setFormData({...formData, colCount: parseInt(e.target.value)})} />
                </div>
              </div>

              {/* Pricing Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">Standard Price <FaDollarSign size={8}/></label>
                  <input type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none" value={formData.basePrice} onChange={(e) => setFormData({...formData, basePrice: parseInt(e.target.value)})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">VIP (Last Row) Price <FaDollarSign size={8}/></label>
                  <input type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none" value={formData.vipRowPrice} onChange={(e) => setFormData({...formData, vipRowPrice: parseInt(e.target.value)})} />
                </div>
              </div>

              <div className="text-center p-4">
                 <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.5em]">This will generate <b className='text-[11px] font-black text-[#d4af37]'> {formData.rowCount * formData.colCount} </b>virtual seat records</p>
              </div>

              <button type="submit" className="cursor-pointer w-full bg-white text-black font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-[#d4af37] transition-all flex items-center justify-center gap-3">
                {loading ? <FaSpinner className="animate-spin" /> : (editingId ? "Finalize Changes" : "Deploy Architecture")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HallAdminMaster;