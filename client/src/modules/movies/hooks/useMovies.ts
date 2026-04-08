import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  getAllMoviesApi,
  addMovieApi,
  updateMovieApi,
  deleteMovieApi,
} from "../movies.api";
import type { Movie, MovieFormState } from "../movies.types";

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await getAllMoviesApi();
      setMovies(Array.isArray(res.data.data) ? res.data.data : []);
    } catch {
      toast.error("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return movies.filter((m) => m.title?.toLowerCase().includes(q));
  }, [movies, searchTerm]);

  const openCreateModal = () => {
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openUpdateModal = (movieId: string) => {
    setEditingId(movieId);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const submitMovie = async (data: MovieFormState) => {
    setSubmitting(true);
    try {
      if (editingId) {
        await updateMovieApi(editingId, data);
        toast.success("Movie updated");
      } else {
        await addMovieApi(data);
        toast.success("Movie added");
      }
      setIsModalOpen(false);
      await fetchMovies();
      return true;
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to save");
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const removeMovie = async (id: string) => {
    if (!window.confirm("Permanently remove this movie from the archive?"))
      return;
    try {
      await deleteMovieApi(id);
      toast.success("Movie deleted");
      setMovies((prev) => prev.filter((m) => m.movie_id !== id));
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to delete");
    }
  };

  return {
    movies,
    filteredMovies,
    loading,
    submitting,
    isModalOpen,
    editingId,
    searchTerm,
    setSearchTerm,
    setEditingId,
    openCreateModal,
    openUpdateModal,
    closeModal,
    submitMovie,
    removeMovie,
  };
};
