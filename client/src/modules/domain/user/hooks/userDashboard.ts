import { useEffect, useState } from "react";
import { getUserDashboardDataApi } from "../user.api";
import type {
  Movie,
  MovieCardItem,
  Showtime,
} from "../user.types";

export const useUserDashboard = () => {
  const [nowShowing, setNowShowing] = useState<MovieCardItem[]>([]);
  const [upcoming, setUpcoming] = useState<MovieCardItem[]>([]);
  const [hero, setHero] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const { movies, showtimes } = await getUserDashboardDataApi();

        const featuredShowtime = (showtimes as Showtime[]).find(
          (s) => s.Movie?.featured === true,
        );
        const featuredMovie =
          featuredShowtime?.Movie ??
          (movies as Movie[]).find((m) => m.featured === true) ??
          null;

        setHero(featuredMovie);

        const showing = (movies as Movie[]).filter(
          (m) => m.status === "Showing",
        );
        const upcomingMovies = (movies as Movie[]).filter(
          (m) => m.status === "Upcoming",
        );

        setNowShowing([
          ...showing.slice(0, 4),
          { movie_id: "view-all-showing", title: "View All", isViewAll: true },
        ]);

        setUpcoming([
          ...upcomingMovies.slice(0, 4),
          { movie_id: "view-all-upcoming", title: "View All", isViewAll: true },
        ]);
      } catch {
        setNowShowing([]);
        setUpcoming([]);
        setHero(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return {
    nowShowing,
    upcoming,
    hero,
    loading,
  };
};
