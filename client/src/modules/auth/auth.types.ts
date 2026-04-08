export type ApiResponse = {
  success: boolean;
  message: string;
  data: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  role: "user" | "org" | "admin";
};

export type SignupFormState = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ForgotPasswordRequest = {
  email: string;
};
