import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { 
  FaPlus, FaSearch, FaTrash, FaEdit, FaLink,
  FaTimes, FaFilm, FaImage, FaPlayCircle, FaSpinner 
} from 'react-icons/fa';
import { addMovieApi, deleteMovieApi, getAllMovie, updateMovieApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const MovieAdminMaster = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [preview, setPreview] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', genre: '', duration: '', releaseDate: '', 
    description: '', trailerLink: '', coverPic: null
  });

  const fileInputRef = useRef(null);
  const IMAGE_BASE_URL = "http://localhost:3000/uploads/";

  const fetchMoviesApi = async () => {
    setLoading(true);
    try {
      const res = await getAllMovie();
      setMovies(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to sync with database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoviesApi();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverPic: file }));
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);
    }
  };

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to permanently remove this premiere from the archive?"
    );

    if (confirmDelete) {
      try {
        await toast.promise(
          deleteMovieApi(id),
          {
            loading: <b>Removing from database...</b>,
            success: (res) => {
              setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
              return <b>{res.data.message || "Movie Deleted"}</b>;
            },
            error: (err) => <b>{err.response?.data?.message || "Could not delete movie"}</b>,
          }
        );
      } catch (error) {
        console.error("Delete operation failed:", error);
      }
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setPreview(null);
    setFormData({ title: '', genre: '', duration: '', releaseDate: '', description: '', trailerLink: '', coverPic: null });
    setIsModalOpen(true);
  };

  const openEditModal = (movie) => {
    setEditingId(movie.id);
    const formattedDate = movie.releaseDate ? movie.releaseDate.split('T')[0] : '';
    setFormData({ ...movie, releaseDate: formattedDate });
    setPreview(movie.coverPic ? `${IMAGE_BASE_URL}${movie.coverPic}` : null);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('genre', formData.genre);
    dataToSend.append('duration', formData.duration);
    dataToSend.append('releaseDate', formData.releaseDate);
    dataToSend.append('description', formData.description);
    dataToSend.append('trailerLink', formData.trailerLink);

    if (formData.coverPic instanceof File) {
      dataToSend.append('coverPic', formData.coverPic);
    }


    if(editingId){
      try{
        const res = await updateMovieApi(editingId, dataToSend)
        toast.success(res.data.message)
        setIsModalOpen(false);
        return
      }catch(err){
        toast.error(<b>{err.response?.data?.message || "Failed to update"}</b>);
      }finally{
        setLoading(false);
      }
    }else{
      try {
        const res = await addMovieApi(dataToSend);
        toast.success(<b>{res.data.message}</b>);
        fetchMoviesApi();
        setIsModalOpen(false);
      } catch (err) {
        toast.error(<b>{err.response?.data?.message || "Failed to save"}</b>);
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredMovies = movies.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">
      
      {/* HEADER SECTION */}
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
              placeholder="SEARCH CATALOG..." 
              className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 text-[10px] font-black tracking-widest focus:outline-none focus:border-[#d4af37]/40 w-64 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={openAddModal} className="cursor-pointer bg-[#d4af37] text-black font-black px-8 py-3 rounded-xl text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 hover:scale-105 transition-all active:scale-95">
            <FaPlus /> Add New Premiere
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-[#111] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
              <th className="px-8 py-6">Premiere Details</th>
              <th className="px-8 py-6">Genre</th>
              <th className="px-8 py-6">Duration</th>
              <th className="px-8 py-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredMovies.map((movie) => (
              <tr key={movie.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="px-8 py-6 flex items-center gap-4">
                  <img src={movie.coverPic ? `${IMAGE_BASE_URL}${movie.coverPic}` : ''} className="w-10 h-14 object-cover rounded bg-white/5" alt="" />
                  <div>
                    <p className="text-white font-black text-xs uppercase">{movie.title}</p>
                    <p className="text-[9px] text-gray-600 font-bold uppercase truncate max-w-[150px]">{movie.description}</p>
                  </div>
                </td>
                <td className="px-8 py-6 text-gray-400 text-[11px] font-bold uppercase">{movie.genre}</td>
                <td className="px-8 py-6 text-gray-400 text-[11px] font-bold uppercase">{movie.duration}m</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => openEditModal(movie)} className="cursor-pointer p-2 bg-white/5 rounded-lg text-gray-400 hover:text-[#d4af37]"><FaEdit size={12}/></button>
                    <button onClick={() => deleteHandler(movie.id)} className="cursor-pointer p-2 bg-red-500/5 rounded-lg text-red-500/50 hover:text-red-500"><FaTrash size={12}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL SECTION */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => !loading && setIsModalOpen(false)}></div>
          <div className="relative bg-[#080808] border border-white/10 w-full max-w-2xl rounded-[40px] p-10 shadow-2xl my-auto">
            <header className="mb-8 flex justify-between">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{editingId ? "Update" : "Register"} <span className="text-[#d4af37]">Premiere</span></h2>
              <button onClick={() => setIsModalOpen(false)} className="cursor-pointer text-gray-600 hover:text-white"><FaTimes /></button>
            </header>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Cover Upload */}
                <div onClick={() => fileInputRef.current.click()} className="cursor-pointer aspect-[3/4] rounded-3xl border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
                  {preview ? <img src={preview} className="w-full h-full object-cover" alt="Preview" /> : <FaImage className="text-3xl text-gray-700" />}
                  <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
                </div>

                {/* Main Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Title</label>
                    <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input placeholder="Genre" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs" value={formData.genre} onChange={(e) => setFormData({...formData, genre: e.target.value})} />
                    <input placeholder="Mins" type="number" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Trailer Link</label>
                    <div className="relative">
                      <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" />
                      <input className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-xs" value={formData.trailerLink} onChange={(e) => setFormData({...formData, trailerLink: e.target.value})} />
                    </div>
                  </div>
                  <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs [color-scheme:dark]" value={formData.releaseDate} onChange={(e) => setFormData({...formData, releaseDate: e.target.value})} />
                </div>
              </div>

              {/* Description Section */}
              <div>
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Synopsis</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs outline-none focus:border-[#d4af37]/40 h-28 resize-none" 
                  placeholder="Describe the cinematic experience..." 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                />
              </div>

              <button type="submit" disabled={loading} className="cursor-pointer w-full bg-[#d4af37] text-black font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                {loading ? <FaSpinner className="animate-spin" /> : (editingId ? "Update Entry" : "Commit to Archive")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieAdminMaster;