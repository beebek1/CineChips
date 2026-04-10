export interface Hall {
  hall_id: number;
  name: string;
  location: string;
  total_rows: number;
  total_columns: number;
  basePrice: number;
  vipPrice: number;
}

export interface HallFormData {
  name: string;
  location: string;
  rowCount: number;
  colCount: number;
  basePrice: number;
  vipPrice: number;
}

export interface HallResponse<T>{
  success: boolean,
  message: string,
  data: T
}
