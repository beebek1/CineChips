import type { ReactNode } from "react";

export type MovieStatus = "Showing" | "Upcoming";

export type Movie = {
  movie_id: string | number;
  title: string;
  genre?: string;
  duration?: number | string;
  releaseDate?: string;
  description?: string;
  trailerLink?: string;
  coverPic?: string;
  status?: MovieStatus;
  featured?: boolean;
};

export type MovieCardItem = Movie & {
  isViewAll?: boolean;
};

export type Hall = {
  hall_id?: string | number;
  name?: string;
};

export type Showtime = {
  Movie?: Movie;
};

export type AccountTab =
  | "Personal Info"
  | "Security"
  | "Payment Methods"
  | "Notifications";

export interface UserAccount {
  user_id?: string | number;
  username?: string;
  email?: string;
  phone?: string;
  location?: string;
  role?: string;
  isVerified?: boolean;
  createdAt?: string;
}

export interface AccountFormData {
  username: string;
  email: string;
  phone: string;
  location: string;
}

export interface AccountMenuItem {
  id: AccountTab;
  label: string;
  icon: ReactNode;
}
