import apiClient from "../../shared/services/apiClient";
import type { Movie, MovieFormState, MovieResponse } from "./movies.types";

export const getAllMoviesApi = () => apiClient.get<MovieResponse>("/api/movies");

export const getMovieByIdApi = (id: string | number) =>
  apiClient.get<Movie>(`/api/movies/${id}`);

export const addMovieApi = (data: MovieFormState) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });
  return apiClient.post<Movie>("/api/movies/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateMovieApi = (id: string | number, data: MovieFormState) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });
  return apiClient.put<Movie>(`/api/movies/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteMovieApi = (id: string | number) =>
  apiClient.delete<void>(`/api/movies/${id}`);
