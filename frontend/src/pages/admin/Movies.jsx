import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPlus, FaSearch, FaTrash, FaEdit, FaLink,
  FaTimes, FaFilm, FaImage, FaPlayCircle, FaSpinner 
} from 'react-icons/fa';

const MovieAdminMaster = () => {
  // --- STATE ---
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    title: '', genre: '', duration: '', releaseDate: '', 
    description: '', trailerLink: '', coverPic: null
  });

  const fileInputRef = useRef(null);

  // --- MOCK API CALLS ---
  // In reality, these would be: axios.get('/api/movies'), etc.
  const fetchMoviesApi = async () => {
    setLoading(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockDb = [
        { 
          id: 1, 
          title: "DUNE: PART II", 
          genre: "Sci-Fi", 
          duration: "166", 
          releaseDate: "2024-03-01", 
          description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge.", 
          trailerLink: "https://youtube.com/watch?v=Dune2", 
          coverPic: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=400" 
        },
        { 
          id: 2, 
          title: "THE BATMAN", 
          genre: "Action", 
          duration: "176", 
          releaseDate: "2022-03-04", 
          description: "Batman ventures into Gotham City's underworld.", 
          trailerLink: "", 
          coverPic: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?w=400" 
        }
      ];
      setMovies(mockDb);
    } catch (err) {
      console.error("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesApi();
  }, []);

  // --- HANDLERS ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For local preview. When sending to API, you'd append 'file' to FormData
      setFormData({ ...formData, coverPic: URL.createObjectURL(file) });
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ title: '', genre: '', duration: '', releaseDate: '', description: '', trailerLink: '', coverPic: null });
    setIsModalOpen(true);
  };

  const openEditModal = (movie) => {
    setEditingId(movie.id);
    setFormData(movie);
    setIsModalOpen(true);
  };

  const handleSaveMovie = async (e) => {
    e.preventDefault();
    
    // Simulate API Post/Put
    setLoading(true); 
    await new Promise(resolve => setTimeout(resolve, 500));

    if (editingId) {
      // API Update Logic: await axios.put(`/api/movies/${editingId}`, formData)
      setMovies(movies.map(m => m.id === editingId ? { ...formData, id: editingId } : m));
    } else {
      // API Create Logic: await axios.post('/api/movies', formData)
      setMovies([{ ...formData, id: Date.now() }, ...movies]);
    }
    
    setLoading(false);
    setIsModalOpen(false);
  };

  const deleteMovie = async (id) => {
    if (window.confirm("Permanently delete this movie from the database?")) {
      // API Delete Logic: await axios.delete(`/api/movies/${id}`)
      setMovies(movies.filter(m => m.id !== id));
    }
  };

  const filteredMovies = movies.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h3 className="text-[#d4af37] text-[10px] font-black tracking-[0.5em] uppercase mb-1">Central Archive</h3>
          <h4 className="text-white text-3xl font-light tracking-tighter uppercase">Movie <span className="font-black italic">Library</span></h4>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input 
              type="text" 
              autoComplete="one-time-code"
              placeholder="SEARCH CATALOG..." 
              className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-[10px] font-black tracking-widest focus:outline-none focus:border-[#d4af37]/40 w-64 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={openAddModal}
            className="cursor-pointer bg-[#d4af37] text-black font-black px-8 py-3 rounded-xl text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 hover:scale-105 transition-all shadow-lg shadow-[#d4af37]/20 active:scale-95"
          >
            <FaPlus /> Add New Premiere
          </button>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      {loading && !isModalOpen ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
          <p className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase">Synchronizing with Database...</p>
        </div>
      ) : (
        <div className="bg-[#111] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl animate-in fade-in duration-500">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                <th className="px-8 py-6">Premiere Details</th>
                <th className="px-8 py-6">Genre</th>
                <th className="px-8 py-6">Duration</th>
                <th className="px-8 py-6">Media</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                        {movie.coverPic ? (
                          <img src={movie.coverPic} className="w-full h-full object-cover" alt="cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-700"><FaImage /></div>
                        )}
                      </div>
                      <div>
                        <p className="text-white font-black text-xs tracking-widest uppercase">{movie.title}</p>
                        <p className="text-[9px] text-gray-600 font-bold uppercase truncate max-w-[200px]">{movie.description || "No description provided."}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-gray-400 text-[11px] font-bold uppercase tracking-wider">{movie.genre}</td>
                  <td className="px-8 py-6 text-gray-400 text-[11px] font-bold uppercase">{movie.duration}m</td>
                  <td className="px-8 py-6 text-gray-400">
                    <div className="flex gap-3">
                       {movie.trailerLink && <FaPlayCircle className="text-[#d4af37] cursor-pointer hover:scale-125 transition-transform" title="Watch Trailer" />}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => openEditModal(movie)} className="cursor-pointer p-3 bg-white/5 rounded-xl text-gray-400 hover:text-[#d4af37] transition-colors shadow-sm"><FaEdit size={12}/></button>
                      <button onClick={() => deleteMovie(movie.id)} className="cursor-pointer p-3 bg-red-500/5 rounded-xl text-red-500/50 hover:text-red-500 transition-colors shadow-sm"><FaTrash size={12}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && filteredMovies.length === 0 && (
            <div className="py-20 text-center text-gray-600 font-black text-[10px] tracking-[0.4em] uppercase">No matching titles found</div>
          )}
        </div>
      )}

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => !loading && setIsModalOpen(false)}></div>
          
          <div className="relative bg-[#080808] border border-white/10 w-full max-w-2xl rounded-[40px] p-10 shadow-2xl my-auto animate-in zoom-in duration-300">
            <button 
                disabled={loading}
                onClick={() => setIsModalOpen(false)} 
                className="cursor-pointer absolute top-8 right-8 text-gray-600 hover:text-white transition-colors disabled:opacity-0"
            >
              <FaTimes />
            </button>
            
            <header className="mb-8">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                {editingId ? "Update" : "Register"} <span className="text-[#d4af37]">Premiere</span>
              </h2>
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em] mt-1">Core Database Entry</p>
            </header>

            <form onSubmit={handleSaveMovie} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: File Upload */}
                <div className="space-y-4">
                   <div 
                    onClick={() => !loading && fileInputRef.current.click()}
                    className="cursor-pointer aspect-[3/4] rounded-3xl border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center gap-3 hover:border-[#d4af37]/40 transition-all overflow-hidden relative group"
                   >
                     {formData.coverPic ? (
                        <>
                            <img src={formData.coverPic} className="w-full h-full object-cover" alt="Preview" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-[9px] font-black uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">Change Image</span>
                            </div>
                        </>
                     ) : (
                       <>
                        <FaImage className="text-gray-600 text-3xl" />
                        <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest text-center px-4">Drag or Click to Upload Cover</span>
                       </>
                     )}
                   </div>
                   <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
                </div>

                {/* Right Side: Primary Details */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Premiere Title</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white focus:border-[#d4af37]/40 outline-none transition-all" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Genre</label>
                        <input placeholder="Action" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none focus:border-[#d4af37]/40" value={formData.genre} onChange={(e) => setFormData({...formData, genre: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Mins</label>
                        <input placeholder="120" type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none focus:border-[#d4af37]/40" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Trailer URL</label>
                    <div className="relative">
                      <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" />
                      <input className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-6 py-4 text-xs outline-none focus:border-[#d4af37]/40" placeholder="Youtube / Vimeo Link" value={formData.trailerLink} onChange={(e) => setFormData({...formData, trailerLink: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Official Release</label>
                    <input required type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none [color-scheme:dark] focus:border-[#d4af37]/40" value={formData.releaseDate} onChange={(e) => setFormData({...formData, releaseDate: e.target.value})} />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Synopsis</label>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none focus:border-[#d4af37]/40 h-24 resize-none" placeholder="Provide a brief summary of the movie..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="cursor-pointer w-full bg-[#d4af37] text-black font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-[#b8962d] transition-all shadow-xl shadow-[#d4af37]/10 mt-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? <FaSpinner className="animate-spin" /> : (editingId ? "Finalize Update" : "Commit to Archive")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieAdminMaster;