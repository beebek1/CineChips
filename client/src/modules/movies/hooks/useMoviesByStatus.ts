import { useEffect, useMemo, useState } from "react";
import { getAllMoviesApi } from "../movies.api";

export type MovieStatus = "Upcoming" | "Showing";

export type Movie = {
  movie_id: string;
  title: string;
  genre: string;
  duration: number;
  description: string;
  releaseDate: string;
  coverPic?: string;
  status: MovieStatus;
};

export function useMoviesByStatus(status: MovieStatus) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
    const fetchMovies = async () => {
        setLoading(true);

        try {
        const res = await getAllMoviesApi();
        const raw = Array.isArray(res.data.data) ? res.data.data : [];

        const filtered = raw.filter((m: Movie) => m.status === status);

        setMovies(filtered);
        } catch (error) {
        console.error("Fetch error:", error);
        setMovies([]);
        } finally {
        setLoading(false);
        }
    };

    fetchMovies();
    }, [status]);

  const genres = useMemo(() => {
    const unique = [
      ...new Set(movies.map((m) => m.genre?.toUpperCase()).filter(Boolean)),
    ];
    return ["ALL", ...unique];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    if (activeFilter === "ALL") return movies;
    return movies.filter((m) => m.genre?.toUpperCase() === activeFilter);
  }, [movies, activeFilter]);

  return {
    movies,
    filteredMovies,
    loading,
    genres,
    activeFilter,
    setActiveFilter,
    isFilterOpen,
    setIsFilterOpen,
  };
}
