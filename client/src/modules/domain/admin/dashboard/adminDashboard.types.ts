export type HallModel = {
  name?: string;
  location?: string;
  total_rows?: number;
  total_columns?: number;
};

export type ShowtimeResponse<T> = {
  success: boolean,
  message: string,
  data: T
}

export type ShowtimeMovie = {
  title?: string;
  genre?: string;
  featured?: boolean;
};

export type Showtime = {
  id?: string | number;
  movie_id: string | number;
  hall_id: string | number;
  show_date: string;
  show_time: string;
  language: string;
  price: number | string;
  hallModel?: HallModel;
  Movie?: ShowtimeMovie;
};

export type Hall = {
  hall_id?: string | number;
  name?: string;
};

export type Movie = {
  movie_id: string | number;
  title?: string;
};

export type HallUsageItem = {
  name: string;
  count: number;
  pct: number;
};

export type LanguageItem = {
  lang: string;
  count: number;
};

export type GenreItem = {
  genre: string;
  count: number;
};
