import type {
  Showtime,
  HallUsageItem,
  LanguageItem,
  GenreItem,
} from "./adminDashboard.types";

export const formatDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTime = (t?: string) => {
  if (!t) return "—";
  const [h, m] = t.split(":");
  const hour = parseInt(h, 10);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
};

export const getTotalRevenue = (showtimes: Showtime[]) =>
  showtimes.reduce((acc, s) => {
    const seats =
      (s.hallModel?.total_rows ?? 0) * (s.hallModel?.total_columns ?? 0);
    return acc + Number(s.price) * seats;
  }, 0);

export const getTotalSeats = (showtimes: Showtime[]) =>
  showtimes.reduce((acc, s) => {
    return (
      acc + (s.hallModel?.total_rows ?? 0) * (s.hallModel?.total_columns ?? 0)
    );
  }, 0);

export const getLiveShows = (showtimes: Showtime[], now: Date) =>
  showtimes.filter(
    (s) => new Date(s.show_date).toDateString() === now.toDateString(),
  ).length;

export const getUpcomingShows = (showtimes: Showtime[], now: Date) =>
  showtimes
    .filter((s) => new Date(s.show_date) > now)
    .sort(
      (a, b) =>
        new Date(a.show_date).getTime() - new Date(b.show_date).getTime(),
    );

export const getTopGenres = (showtimes: Showtime[]): GenreItem[] => {
  const genreMap: Record<string, number> = {};
  showtimes.forEach((s) => {
    const g = s.Movie?.genre;
    if (!g) return;
    genreMap[g] = (genreMap[g] ?? 0) + 1;
  });

  return Object.entries(genreMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([genre, count]) => ({ genre, count }));
};

export const getHallUsage = (showtimes: Showtime[]): HallUsageItem[] => {
  const hallUsageMap: Record<string, number> = {};
  showtimes.forEach((s) => {
    const name = s.hallModel?.name ?? `Hall ${s.hall_id}`;
    hallUsageMap[name] = (hallUsageMap[name] ?? 0) + 1;
  });

  return Object.entries(hallUsageMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({
      name,
      count,
      pct: showtimes.length ? Math.round((count / showtimes.length) * 100) : 0,
    }));
};

export const getLanguages = (showtimes: Showtime[]): LanguageItem[] => {
  const langMap: Record<string, number> = {};
  showtimes.forEach((s) => {
    const lang = s.language || "—";
    langMap[lang] = (langMap[lang] ?? 0) + 1;
  });

  return Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .map(([lang, count]) => ({ lang, count }));
};

export const getAverageTicketPrice = (showtimes: Showtime[]) => {
  if (!showtimes.length) return 0;
  return Math.round(
    showtimes.reduce((a, s) => a + Number(s.price), 0) / showtimes.length,
  );
};
