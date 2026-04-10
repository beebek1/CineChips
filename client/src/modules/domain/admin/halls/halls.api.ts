import apiClient from "../../../../shared/services/apiClient";
import type { Hall, HallFormData, HallResponse } from "./halls.types";

export const getAllHallsApi = () => apiClient.get<HallResponse<Hall[]>>("api/cinema");

export const createHallApi = (data: HallFormData) =>
  apiClient.post<HallResponse<Hall[]>>("api/cinema", data);

export const editHallApi = (id: number | string, data: HallFormData) =>
  apiClient.put<HallResponse<Hall[]>>(`api/cinema${id}`, data);

export const removeHallApi = (id: number | string) =>
  apiClient.delete<HallResponse<Hall[]>>(`api/cinema${id}`);
