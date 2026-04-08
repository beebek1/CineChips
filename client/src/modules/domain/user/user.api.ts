import apiClient from "../../../shared/services/apiClient";
import type { Movie, Showtime, Hall, UserAccount, AccountFormData } from "./user.types";

// ================== DASHBOARD ========================

export const getAllMovie = () => apiClient.get<Movie[]>("api/movie/getall");

export const getShowTimes = () =>
  apiClient.get<Showtime[]>("api/cinema/get-showtime");

export const getAllHalls = () => apiClient.get<Hall[]>("api/cinema/get-all");

export const getUserDashboardDataApi = async () => {
  const [mRes, stRes, hRes] = await Promise.all([
    getAllMovie(),
    getShowTimes(),
    getAllHalls(),
  ]);

  const movies = (mRes as any)?.data?.movies ?? (mRes as any)?.data ?? [];

  const showtimes =
    (stRes as any)?.data?.showtimes ??
    (stRes as any)?.data?.schedules ??
    (stRes as any)?.data ??
    [];

  const halls = (hRes as any)?.data?.halls ?? (hRes as any)?.data ?? [];

  return {
    movies: movies as Movie[],
    showtimes: showtimes as Showtime[],
    halls: halls as Hall[],
  };
};

// ================== ACCOUNT ========================

export const getUserApi = () =>
  apiClient.get<UserAccount>(`/api/auth/getUser`);

export const updateUserAccountApi = (
  payload: AccountFormData,
  userId: string | number,
) => apiClient.put<UserAccount>(`/api/auth/update/${userId}`, payload);
