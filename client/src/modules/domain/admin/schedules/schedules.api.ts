import apiClient from "../../../../shared/services/apiClient";
import type {
  Movie,
  Hall,
  Schedule,
  ScheduleFormData,
} from "./schedules.types";

export const getShowTimes = () =>
  apiClient.get<Schedule[]>("api/cinema/get-showtime");

export const getAllHalls = () => apiClient.get<Hall[]>("api/cinema/get-all");

export const getAllMovie = () => apiClient.get<Movie[]>("api/movie/getall");

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
      (showRes as any)?.data?.showtimes ??
      (showRes as any)?.data?.schedules ??
      (showRes as any)?.data ??
      [],
    halls: (hallRes as any)?.data?.halls ?? (hallRes as any)?.data ?? [],
    movies: (movieRes as any)?.data?.movies ?? (movieRes as any)?.data ?? [],
  };
};

export const createScheduleApi = (payload: ScheduleFormData) =>
  apiClient.post<{ message: string }>("api/cinema/showtimes", payload);

export const removeScheduleApi = (id: number | string) =>
  apiClient.delete<{ message: string }>(`api/cinema/showtime/delete/${id}`);
