export interface Vehicle {
  id: string;
  model: string;
  brand: string;
  dailyPrice: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVehicleRequest {
  model: string;
  brand: string;
  dailyPrice: number;
}

export interface UpdateVehicleRequest {
  model?: string;
  brand?: string;
  dailyPrice?: number;
}

export interface VehicleListQuery {
  available?: boolean;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface VehicleResponse {
  success: true;
  data: Vehicle;
}

export interface VehicleListResponse {
  success: true;
  data: Vehicle[];
  meta?: {
    total: number;
    available: number;
    unavailable: number;
  };
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    fields?: Record<string, string[]>;
  };
}

export type ApiResponse<T> = T | ErrorResponse;
