import React from "react";
import MovieAdminHeader from "../components/MovieAdminHeader";
import MovieTable from "../components/MovieTable";
import MovieModal from "../components/MovieModal";
import { useMovies } from "../hooks/useMovies";
import { useMovieForm } from "../hooks/useMovieForm";
import type { Movie } from "../movies.types";
import { getCoverUrl } from "../utils/movies.utils";

const MovieAdminPage: React.FC = () => {
  const {
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
  } = useMovies();

  console.log("this is filtered", filteredMovies);

  const {
    formData,
    preview,
    fileInputRef,
    setField,
    openAddForm,
    openEditForm,
    onFileChange,
    resetForm,
  } = useMovieForm();

  const handleAddOpen = () => {
    setEditingId(null);
    openAddForm();
    openCreateModal();
  };

  const handleEditOpen = (movie: Movie) => {
    openEditForm(movie, getCoverUrl(movie.coverPic, movie.movie_id));
    openUpdateModal(movie.movie_id);
  };

  const handleCloseModal = () => {
    closeModal();
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = await submitMovie(formData);
    if (ok) resetForm();
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white p-10 font-sans">
      <MovieAdminHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={handleAddOpen}
      />

      <MovieTable
        loading={loading}
        movies={filteredMovies}
        onEdit={handleEditOpen}
        onDelete={removeMovie}
      />

      <MovieModal
        isOpen={isModalOpen}
        isEditing={Boolean(editingId)}
        submitting={submitting}
        formData={formData}
        preview={preview}
        fileInputRef={fileInputRef}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        onFileChange={onFileChange}
        onFieldChange={setField}
      />
    </div>
  );
};

export default MovieAdminPage;