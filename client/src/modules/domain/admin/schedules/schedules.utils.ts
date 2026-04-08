import type {
  Movie,
  Schedule,
  ScheduleFormData,
} from "./schedules.types";

export const LANGUAGES = ["English", "Nepali", "Hindi"] as const;

export const defaultForm: ScheduleFormData = {
  movieId: "",
  hallId: "",
  showDate: "",
  showTime: "",
  language: "English",
  price: "",
};

export const formatDate = (raw?: string) =>
  raw
    ? new Date(raw)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toUpperCase()
    : "—";

export const formatTime = (raw?: string) => {
  if (!raw) return "—";
  const [h, m] = raw.slice(0, 5).split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${ampm}`;
};

export const toMinutes = (timeStr?: string) => {
  if (!timeStr) return 0;
  const [h, m] = timeStr.slice(0, 5).split(":").map(Number);
  return h * 60 + m;
};

export const toForm = (s: Schedule): ScheduleFormData => ({
  movieId: String(s.movie_id ?? ""),
  hallId: String(s.hall_id ?? ""),
  showDate: (s.show_date ?? "").split("T")[0],
  showTime: (s.show_time ?? "").slice(0, 5),
  language: s.language ?? "English",
  price: String(s.price ?? ""),
});

export const toPayload = (f: ScheduleFormData) => ({
  movie_id: f.movieId,
  hall_id: f.hallId,
  show_date: f.showDate,
  show_time: f.showTime,
  language: f.language,
  price: Number(f.price),
});

export const isPastDateTime = (date: string, time: string) => {
  if (!date || !time) return false;
  return new Date(`${date}T${time}`) < new Date();
};

export const getConflict = (
  schedules: Schedule[],
  movies: Movie[],
  hallId: string,
  date: string,
  time: string,
  movieId: string,
  excludeId: number | null,
): Schedule | null => {
  const newStart = toMinutes(time);
  const newDuration = Number(
    movies.find((m) => String(m.movie_id) === String(movieId))?.duration ?? 0,
  );
  const newEnd = newStart + newDuration;

  return (
    schedules.find((s) => {
      if (excludeId && s.showtime_id === excludeId) return false;
      if (String(s.hall_id) !== String(hallId)) return false;
      const sDate = (s.show_date ?? "").split("T")[0];
      if (sDate !== date) return false;

      const existingStart = toMinutes(s.show_time ?? "00:00");
      const existingDuration = Number(
        s.Movie?.duration ?? s.movie?.duration ?? 0,
      );
      const existingEnd = existingStart + existingDuration + 15;

      return newStart < existingEnd && newEnd > existingStart;
    }) ?? null
  );
};
