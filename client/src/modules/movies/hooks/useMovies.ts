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
    } catch (err: any) {
      toast.error(err.res.data.message);
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
        const res = await updateMovieApi(editingId, data);
        if (res.data.success) {
          toast.success("Movie added successfully");
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await addMovieApi(data);
        if (res.data.success) {
          toast.success("Movie added successfully");
        } else {
          toast.error(res.data.message);
        }
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
      const res = await deleteMovieApi(id);
      if (res.data.success) {
        toast.success("Movie deleted successfully");
      } else {
        toast.error(res.data.message);
      }
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
