import { Vehicle } from './vehicle';
import { Customer } from './customer';

export type RentalStatus = 'active' | 'completed' | 'canceled';

export interface Rental {
  id: string;
  vehicleId: string;
  customerId: string;
  startDate: Date;
  endDate: Date;
  totalCost: number;
  status: RentalStatus;
  createdAt: Date;
  updatedAt: Date;
  vehicle?: Vehicle;
  customer?: Customer;
}

export interface CreateRentalRequest {
  vehicleId: string;
  customerId: string;
  startDate: string; // ISO 8601 date string
  endDate: string;   // ISO 8601 date string
}

export interface UpdateRentalRequest {
  startDate?: string;
  endDate?: string;
}

export interface RentalResponse {
  success: true;
  data: Rental;
}

export interface RentalListResponse {
  success: true;
  data: Rental[];
  meta?: {
    total: number;
    active: number;
    completed: number;
    canceled: number;
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
