import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { 
  FaPlus, FaSearch, FaTrash, FaEdit, FaLink,
  FaTimes, FaImage, FaSpinner 
} from 'react-icons/fa';
import { addMovieApi, deleteMovieApi, getAllMovie, updateMovieApi } from '../../services/api';

const IMAGE_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') + '/uploads/';

const emptyForm = {
  title: '', genre: '', duration: '', releaseDate: '',
  description: '', trailerLink: '', coverPic: null, status: 'Showing', featured: false
};

const MovieAdminMaster = () => {
  const [movies, setMovies]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId]   = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [preview, setPreview]       = useState(null);
  const [formData, setFormData]     = useState(emptyForm);
  const fileInputRef                = useRef(null);

  // ── FETCH ──────────────────────────────────────────────────────────────────
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await getAllMovie();
      const raw = res?.data?.movies ?? res?.data ?? [];
      setMovies(Array.isArray(raw) ? raw : []);
    } catch {
      toast.error('Failed to load movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMovies(); }, []);

  // ── FILE CHANGE ────────────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData(prev => ({ ...prev, coverPic: file }));
    setPreview(URL.createObjectURL(file));
  };

  // ── OPEN MODALS ────────────────────────────────────────────────────────────
  const openAddModal = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setPreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (movie) => {
    setEditingId(movie.movie_id);
    setFormData({
      title:       movie.title       ?? '',
      genre:       movie.genre       ?? '',
      duration:    movie.duration    ?? '',
      releaseDate: movie.releaseDate ? movie.releaseDate.split('T')[0] : '',
      description: movie.description ?? '',
      trailerLink: movie.trailerLink ?? '',
      status:      movie.status      ?? 'Showing',
      featured:    movie.featured    ?? false,
      coverPic:    null, // null means "keep existing" — only replaced if user uploads new file
    });
    // Show existing image as preview
    setPreview(movie.coverPic ? `${IMAGE_BASE_URL}${movie.coverPic}` : null);
    setIsModalOpen(true);
  };

  // ── SUBMIT ─────────────────────────────────────────────────────────────────
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = new FormData();
    payload.append('title',       formData.title);
    payload.append('genre',       formData.genre);
    payload.append('duration',    formData.duration);
    payload.append('status',      formData.status);
    payload.append('featured',    formData.featured);
    payload.append('releaseDate', formData.releaseDate);
    payload.append('description', formData.description);
    payload.append('trailerLink', formData.trailerLink);
    // Only append image if user picked a new file — backend keeps old one otherwise
    if (formData.coverPic instanceof File) {
      payload.append('coverPic', formData.coverPic);
    }

    try {
      if (editingId) {
        const res = await updateMovieApi(editingId, payload);
        toast.success(res?.data?.message ?? 'Movie updated');
      } else {
        const res = await addMovieApi(payload);
        toast.success(res?.data?.message ?? 'Movie added');
      }
      setIsModalOpen(false);
      fetchMovies(); // refresh list for both add and update
    } catch (err) {
      toast.error(<b>{err?.response?.data?.message ?? 'Failed to save'}</b>);
    } finally {
      setSubmitting(false);
    }
  };

  // ── DELETE ─────────────────────────────────────────────────────────────────
  const deleteHandler = async (id) => {
        console.log(id)

    if (!window.confirm('Permanently remove this movie from the archive?')) return;
    try {
      const res = await deleteMovieApi(id);
      toast.success(res?.data?.message ?? 'Movie deleted');
      setMovies(prev => prev.filter(m => m.movie_id !== id));
    } catch (err) {
      toast.error(<b>{err?.response?.data?.message ?? 'Failed to delete'}</b>);
    }
  };

  const filteredMovies = movies.filter(m =>
    m.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">

      {/* HEADER */}
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
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={openAddModal}
            className="cursor-pointer bg-[#d4af37] text-black font-black px-8 py-3 rounded-xl text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 hover:scale-105 transition-all active:scale-95"
          >
            <FaPlus /> Add New Premiere
          </button>
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="flex justify-center py-20">
          <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
        </div>
      ) : (
        <div className="bg-[#111] rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                <th className="px-8 py-6">Movie Details</th>
                <th className="px-8 py-6">Genre</th>
                <th className="px-8 py-6">Duration</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMovies.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-gray-600 text-xs uppercase tracking-widest">
                    No movies found.
                  </td>
                </tr>
              )}
              {filteredMovies.map(movie => (
                <tr key={movie.movie_id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-8 py-6 flex items-center gap-4">
                    {movie.coverPic ? (
                      <img
                        src={`${IMAGE_BASE_URL}${movie.coverPic}`}
                        className="w-10 h-14 object-cover rounded bg-white/5"
                        alt=""
                        onError={e => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-10 h-14 rounded bg-white/5 flex items-center justify-center">
                        <FaImage className="text-gray-700 text-xs" />
                      </div>
                    )}
                    <div>
                      <p className="text-white font-black text-xs uppercase">{movie.title}</p>
                      <p className="text-[9px] text-gray-600 font-bold uppercase truncate max-w-[150px]">{movie.description}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-gray-400 text-[11px] font-bold uppercase">{movie.genre}</td>
                  <td className="px-8 py-6 text-gray-400 text-[11px] font-bold">{movie.duration} min</td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${
                      movie.status === 'Showing'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {movie.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => openEditModal(movie)} className="cursor-pointer p-2 bg-white/5 rounded-lg text-gray-400 hover:text-[#d4af37]">
                        <FaEdit size={12} />
                      </button>
                      <button onClick={() => deleteHandler(movie.movie_id)} className="cursor-pointer p-2 bg-red-500/5 rounded-lg text-red-500/50 hover:text-red-500">
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-y-auto">
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => !submitting && setIsModalOpen(false)}
          />
          <div className="relative bg-[#080808] border border-white/10 w-full max-w-2xl rounded-[40px] p-10 shadow-2xl my-auto">
            <header className="mb-8 flex justify-between items-center">
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                {editingId ? 'Update' : 'Register'} <span className="text-[#d4af37]">Premiere</span>
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="cursor-pointer text-gray-600 hover:text-white">
                <FaTimes />
              </button>
            </header>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Cover Upload */}
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="cursor-pointer aspect-[3/4] rounded-3xl border-2 border-dashed border-white/10 bg-white/5 flex items-center justify-center overflow-hidden relative group"
                >
                  {preview
                    ? <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                    : <FaImage className="text-3xl text-gray-700" />
                  }
                  {/* Overlay hint on hover */}
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-[10px] font-black uppercase tracking-widest">
                      {preview ? 'Change Image' : 'Upload Image'}
                    </p>
                  </div>
                  <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Title</label>
                    <input
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-[#d4af37]/40"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="Genre"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-[#d4af37]/40"
                      value={formData.genre}
                      onChange={e => setFormData({ ...formData, genre: e.target.value })}
                    />
                    <input
                      placeholder="Duration (min)"
                      type="number"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-[#d4af37]/40"
                      value={formData.duration}
                      onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    />
                  </div>

                  {/* Status toggle */}
                  <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl">
                    {['Showing', 'Upcoming'].map(opt => (
                      <label
                        key={opt}
                        className={`flex-1 cursor-pointer py-3 rounded-xl text-[10px] font-black uppercase text-center transition-all ${
                          formData.status === opt ? 'bg-[#d4af37] text-black' : 'text-gray-500 hover:text-white'
                        }`}
                      >
                        <input
                          type="radio"
                          className="hidden"
                          checked={formData.status === opt}
                          onChange={() => setFormData({ ...formData, status: opt })}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>

                  {/* Featured toggle */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <div
                      onClick={() => setFormData(prev => ({ ...prev, featured: !prev.featured }))}
                      className={`w-10 h-5 rounded-full transition-all ${formData.featured ? 'bg-[#d4af37]' : 'bg-white/10'}`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-all ${formData.featured ? 'ml-5' : 'ml-0.5'}`} />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Featured (Hero)</span>
                  </label>

                  <div>
                    <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Trailer Link</label>
                    <div className="relative">
                      <FaLink className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" />
                      <input
                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 text-xs text-white outline-none focus:border-[#d4af37]/40"
                        value={formData.trailerLink}
                        onChange={e => setFormData({ ...formData, trailerLink: e.target.value })}
                      />
                    </div>
                  </div>

                  <input
                    type="date"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white [color-scheme:dark] outline-none focus:border-[#d4af37]/40"
                    value={formData.releaseDate}
                    onChange={e => setFormData({ ...formData, releaseDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="text-[9px] font-black text-gray-500 uppercase tracking-widest ml-1">Synopsis</label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs text-white outline-none focus:border-[#d4af37]/40 h-28 resize-none"
                  placeholder="Describe the cinematic experience..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="cursor-pointer w-full bg-[#d4af37] text-black font-black py-5 rounded-2xl text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 disabled:opacity-60"
              >
                {submitting
                  ? <><FaSpinner className="animate-spin" /> Processing...</>
                  : editingId ? 'Save Changes' : 'Commit to Archive'
                }
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieAdminMaster;