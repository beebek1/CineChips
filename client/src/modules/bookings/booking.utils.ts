import type { DateSchedule } from "./booking.types";

const IMAGE_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");

export const getCoverUrl = (filename?: string | null) => {
  if (!filename) return null;
  if (filename.startsWith("http")) return filename;
  return `${IMAGE_BASE}/uploads/${filename}`;
};

export const formatTime = (t?: string) => {
  if (!t) return "";
  const [h, m] = t.split(":");
  const hour = parseInt(h, 10);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? "PM" : "AM"}`;
};

export const formatDateCard = (dateString: string) => {
  const d = new Date(dateString);
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return {
    day: days[d.getDay()],
    date: d.getDate(),
    month: months[d.getMonth()],
  };
};

export const formatLongDate = (dateStr?: string) => {
  if (!dateStr) return "";
  return new Date(dateStr)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
};

export const getCountdown = (show_date: string, show_time: string) => {
  const showtime = new Date(`${show_date} ${show_time}`).getTime();
  const now = Date.now();
  const distance = showtime - now;
  if (distance <= 0) return "00:00:00";
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  return `${d}D : ${h}H : ${m}M`;
};

export const buildSchedules = (showtimes: any[]): DateSchedule[] => {
  const dateMap: Record<string, any> = {};

  showtimes.forEach((s) => {
    const date = s.show_date.split("T")[0];
    if (!dateMap[date]) dateMap[date] = {};

    const hallKey = s.hall_id;
    if (!dateMap[date][hallKey]) {
      dateMap[date][hallKey] = {
        hallId: s.hall_id,
        name: s.CinemaHalls?.name ?? `Hall ${s.hall_id}`,
        location: s.CinemaHalls?.location ?? "unknown location",
        price: s.price,
        langMap: {},
      };
    }

    const lang = s.language;
    if (!dateMap[date][hallKey].langMap[lang]) {
      dateMap[date][hallKey].langMap[lang] = [];
    }

    dateMap[date][hallKey].langMap[lang].push({
      time: s.show_time.slice(0, 5),
      showtimeId: s.showtime_id,
    });
  });

  return Object.entries(dateMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([fullDate, hallsMap]) => ({
      fullDate,
      halls: Object.values(hallsMap).map((h: any) => ({
        hallId: h.hallId,
        name: h.name,
        location: h.location,
        price: h.price,
        showings: Object.entries(h.langMap).map(([language, slots]) => ({
          language,
          slots: slots as any[],
        })),
      })),
    }));
};
