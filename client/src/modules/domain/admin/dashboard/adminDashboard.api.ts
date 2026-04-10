import apiClient from "../../../../shared/services/apiClient";
import type {
  Showtime,
  Hall,
  Movie,
  ShowtimeResponse,
} from "./adminDashboard.types";

export const getShowTimes = () =>
  apiClient.get<ShowtimeResponse<Showtime[]>>("api/showtime");

export const getAllHalls = () =>
  apiClient.get<ShowtimeResponse<Hall[]>>("api/cinema"); 

export const getAllMovie = () =>
  apiClient.get<ShowtimeResponse<Movie[]>>("api/movies");

export const getAdminDashboardDataApi = async () => {
  const [stRes, hRes, mRes] = await Promise.all([
    getShowTimes(),
    getAllHalls(),
    getAllMovie(),
  ]);

  const showtimes = stRes.data?.data;
  const halls = hRes.data?.data;
  const movies = mRes.data?.data;

  return {
    showtimes: Array.isArray(showtimes) ? showtimes : [],
    halls: Array.isArray(halls) ? halls : [],
    movies: Array.isArray(movies) ? movies : [],
  };
};
