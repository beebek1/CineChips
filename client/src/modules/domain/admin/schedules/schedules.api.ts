import apiClient from "../../../../shared/services/apiClient";
import type {
  Movie,
  Hall,
  Schedule,
  ScheduleFormData,
} from "./schedules.types";

export const getShowTimes = () =>
  apiClient.get<Schedule[]>("api/showtime");

export const getAllHalls = () => apiClient.get<Hall[]>("api/cinema");

export const getAllMovie = () => apiClient.get<Movie[]>("api/movies");

/**
 * Aggregator for fetching all necessary dependencies for
 * the Schedule management dashboard.
 */
export const getSchedulesBundleApi = async () => {
  const [showRes, hallRes, movieRes] = await Promise.all([
    getShowTimes(),
    getAllHalls(),
    getAllMovie(),
  ]);

  return {
    schedules:
      (showRes as any)?.data?.data ??
      (showRes as any)?.data?.data ??
      (showRes as any)?.data ??
      [],
    halls: (hallRes as any)?.data?.data ?? (hallRes as any)?.data ?? [],
    movies: (movieRes as any)?.data?.data ?? (movieRes as any)?.data ?? [],
  };
};

export const createScheduleApi = (payload: ScheduleFormData) =>
  apiClient.post<{ message: string }>("api/showtime/", payload);

export const removeScheduleApi = (id: number | string) =>
  apiClient.delete<{ message: string }>(`api/showtime/${id}`);
