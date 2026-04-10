export interface Movie {
  movie_id: number | string;
  title: string;
  duration?: number;
  status?: string;
}

export interface Hall {
  hall_id: number | string;
  name: string;
  basePrice?: number;
  base_price?: number;
}

export interface Schedule {
  showtime_id: number;
  movie_id: number | string;
  hall_id: number | string;
  show_date: string;
  show_time: string;
  language: string;
  price: number;
  Movie?: { title?: string; duration?: number };
  movie?: { title?: string; duration?: number };
  hallModel?: { name?: string };
  hall?: { name?: string };
}

export interface ScheduleFormData {
  movie_id: string;
  hall_id: string;
  show_date: string;
  show_time: string;
  language: string;
  price: string;
}
