export type MovieStatus = "Showing" | "Upcoming";

export interface MovieResponse {
  success: boolean;
  message: string;
  data: Movie[]; 
}

export type Movie = {
  movie_id: string;
  title: string;
  genre: string;
  duration: number;
  releaseDate: string;
  description: string;
  trailerLink: string;
  coverPic?: string;
  status: MovieStatus;
  featured: boolean;
};

export type MovieFormState = {
  title: string;
  genre: string;
  duration: string;
  releaseDate: string;
  description: string;
  trailerLink: string;
  coverPic: File | null;
  status: MovieStatus;
  featured: boolean;
};
