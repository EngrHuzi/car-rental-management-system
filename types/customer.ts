export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCustomerRequest {
  name: string;
  email: string;
  phone: string;
}

export interface UpdateCustomerRequest {
  name?: string;
  email?: string;
  phone?: string;
}

export interface CustomerResponse {
  success: true;
  data: Customer;
}

export interface CustomerListResponse {
  success: true;
  data: Customer[];
  meta?: {
    total: number;
    active: number;
    deleted: number;
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
