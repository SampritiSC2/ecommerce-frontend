export interface User {
  _id: string;
  email: string;
  username: string;
  role: string; // could be restricted to "user" | "admin" if you know the roles
}

export interface RegistrationResponse {
  message: string;
  user: User;
}

export interface RegisterErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export interface LoginResponse {
  message: string;
  user: User;
  accessToken: string;
}

export interface LoginErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
