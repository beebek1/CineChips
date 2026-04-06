import apiClient from "../../shared/services/apiClient";
import type { LoginRequest, ApiResponse, ForgotPasswordRequest, RegisterRequest } from "./auth.types";

export const registerApi = (data: RegisterRequest) =>
  apiClient.post<ApiResponse>("/api/auth/register", data);

export const loginApi = (data: LoginRequest) =>
  apiClient.post<ApiResponse>("/api/auth/login", data);

export const forgotPasswordApi = (data: ForgotPasswordRequest) =>
  apiClient.post<ApiResponse>("/api/auth/forgot-password", data);

export const getUser = (id: string) =>
  apiClient.get(`/api/auth/getUserByid/${id}`);

export const updateUserApi = (formData: FormData, id: string) =>
  apiClient.put(`/api/auth/update/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
