import apiClient from "../../../../shared/services/apiClient";
import type { Showtime, Hall, Movie } from "./adminDashboard.types";

export const getShowTimes = () =>
  apiClient.get<Showtime[]>("api/cinema/get-showtime");

export const getAllHalls = () => apiClient.get<Hall[]>("api/cinema/get-all");

export const getAllMovie = () => apiClient.get<Movie[]>("api/movie/getall");

export const getAdminDashboardDataApi = async () => {
  const [stRes, hRes, mRes] = await Promise.all([
    getShowTimes(),
    getAllHalls(),
    getAllMovie(),
  ]);

  /**
   * We cast to 'any' during the data extraction to handle
   * varying backend response structures (wrapped in .data or .showtimes)
   */
  const showtimes =
    (stRes as any)?.data?.showtimes ??
    (stRes as any)?.data?.schedules ??
    (stRes as any)?.data ??
    [];

  const halls = (hRes as any)?.data?.halls ?? (hRes as any)?.data ?? [];

  const movies = (mRes as any)?.data?.movies ?? (mRes as any)?.data ?? [];

  return {
    showtimes: showtimes as Showtime[],
    halls: halls as Hall[],
    movies: movies as Movie[],
  };
};
