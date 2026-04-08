import { FaSpinner } from "react-icons/fa";
import MovieHeader from "../components/MovieHeader";
import MovieGrid from "../components/MovieGrid";
import { useMoviesByStatus } from "../hooks/useMoviesByStatus";

export default function NowShowingPage() {
  const {
    movies,
    filteredMovies,
    loading,
    genres,
    activeFilter,
    setActiveFilter,
    isFilterOpen,
    setIsFilterOpen,
  } = useMoviesByStatus("Showing");

  const countText =
    activeFilter === "ALL"
      ? `${filteredMovies.length} film${filteredMovies.length !== 1 ? "s" : ""} currently in halls.`
      : `${filteredMovies.length} ${activeFilter} film${filteredMovies.length !== 1 ? "s" : ""} in halls.`;

  return (
    <div className="min-h-screen bg-[#080808] font-sans text-white pt-32 pb-24">
      <MovieHeader
        title="NOW SHOWING"
        subtitle="Cinema Collection"
        countText={countText}
        genres={genres}
        activeFilter={activeFilter}
        isFilterOpen={isFilterOpen}
        onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
        onSelectGenre={(genre) => {
          setActiveFilter(genre);
          setIsFilterOpen(false);
        }}
      />

      <main className="max-w-7xl mx-auto px-8">
        {loading ? (
          <div className="flex justify-center py-32">
            <FaSpinner className="animate-spin text-[#d4af37] text-3xl" />
          </div>
        ) : filteredMovies.length > 0 ? (
          <MovieGrid movies={filteredMovies} showBookButton={true} />
        ) : (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-600 font-black tracking-[0.5em] uppercase text-xs">
              {movies.length === 0
                ? "No movies currently showing."
                : "No movies found in this genre."}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}