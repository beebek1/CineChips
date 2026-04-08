import { useEffect, useMemo, useState } from "react";
import { getAdminDashboardDataApi } from "../adminDashboard.api";
import type { Hall, Movie, Showtime } from "../adminDashboard.types";
import {
  getAverageTicketPrice,
  getHallUsage,
  getLanguages,
  getLiveShows,
  getTopGenres,
  getTotalRevenue,
  getTotalSeats,
  getUpcomingShows,
} from "../adminDashboard.utils";

export const useAdminDashboard = () => {
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const data = await getAdminDashboardDataApi();
        setShowtimes(data.showtimes);
        setHalls(data.halls);
        setMovies(data.movies);
      } catch {
        setShowtimes([]);
        setHalls([]);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const now = new Date();

  const stats = useMemo(() => {
    const totalRevenue = getTotalRevenue(showtimes);
    const totalSeats = getTotalSeats(showtimes);
    const uniqueMovieIds = new Set(showtimes.map((s) => s.movie_id));
    const liveShows = getLiveShows(showtimes, now);
    const upcomingShows = getUpcomingShows(showtimes, now);
    const topGenres = getTopGenres(showtimes);
    const hallUsage = getHallUsage(showtimes);
    const languages = getLanguages(showtimes);
    const avgTicketPrice = getAverageTicketPrice(showtimes);

    return {
      totalRevenue,
      totalSeats,
      uniqueMovieCount: uniqueMovieIds.size,
      liveShows,
      upcomingShows,
      topGenres,
      hallUsage,
      languages,
      avgTicketPrice,
    };
  }, [showtimes]);

  return {
    showtimes,
    halls,
    movies,
    loading,
    stats,
  };
};
