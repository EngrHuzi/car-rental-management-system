export interface User {
  id: string;
  email: string;
  password?: never; // Never expose password in types
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: true;
  data: {
    user: {
      id: string;
      email: string;
      createdAt: string;
    };
    token: string;
    expiresAt: string;
  };
}

export interface LogoutResponse {
  success: true;
  message: string;
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
