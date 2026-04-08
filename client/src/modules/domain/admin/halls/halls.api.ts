import apiClient from "../../../../shared/services/apiClient";
import type { Hall, HallFormData } from "./halls.types";

export const getAllHallsApi = () => apiClient.get<Hall[]>("api/cinema/get-all");

export const createHallApi = (data: HallFormData) =>
  apiClient.post<{ message: string }>("api/cinema/add", data);

export const editHallApi = (id: number | string, data: HallFormData) =>
  apiClient.put<{ message: string }>(`api/cinema/update/${id}`, data);

export const removeHallApi = (id: number | string) =>
  apiClient.delete<{ message: string }>(`api/cinema/delete/${id}`);
