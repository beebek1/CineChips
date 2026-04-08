import { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { Movie, MovieFormState } from "../movies.types";

const EMPTY_FORM: MovieFormState = {
  title: "",
  genre: "",
  duration: "",
  releaseDate: "",
  description: "",
  trailerLink: "",
  coverPic: null,
  status: "Showing",
  featured: false,
};

export const useMovieForm = () => {
  const [formData, setFormData] = useState<MovieFormState>(EMPTY_FORM);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLocalPreview, setIsLocalPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const cleanupPreview = () => {
    if (isLocalPreview && preview) URL.revokeObjectURL(preview);
  };

  useEffect(() => {
    return () => cleanupPreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, isLocalPreview]);

  const setField = <K extends keyof MovieFormState>(
    key: K,
    value: MovieFormState[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const openAddForm = () => {
    cleanupPreview();
    setFormData(EMPTY_FORM);
    setPreview(null);
    setIsLocalPreview(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const openEditForm = (movie: Movie, previewUrl: string | null) => {
    cleanupPreview();
    setFormData({
      title: movie.title ?? "",
      genre: movie.genre ?? "",
      duration: String(movie.duration ?? ""),
      releaseDate: movie.releaseDate ? movie.releaseDate.split("T")[0] : "",
      description: movie.description ?? "",
      trailerLink: movie.trailerLink ?? "",
      status: movie.status ?? "Showing",
      featured: movie.featured ?? false,
      coverPic: null, // keep existing unless replaced
    });
    setPreview(previewUrl);
    setIsLocalPreview(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    cleanupPreview();
    const localUrl = URL.createObjectURL(file);

    setFormData((prev) => ({ ...prev, coverPic: file }));
    setPreview(localUrl);
    setIsLocalPreview(true);
  };

  const resetForm = () => {
    cleanupPreview();
    setFormData(EMPTY_FORM);
    setPreview(null);
    setIsLocalPreview(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return {
    formData,
    preview,
    fileInputRef,
    setField,
    setFormData,
    openAddForm,
    openEditForm,
    onFileChange,
    resetForm,
  };
};
