import { AxiosError } from "axios";
import type {
  LoginResponse,
  RegisterErrorResponse,
  RegistrationResponse,
} from "../types/auth/auth.model";
import api from "../api/api";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function register(
  username: string,
  email: string,
  password: string
): Promise<{ message?: string; error?: string } | undefined> {
  const payload: RegisterPayload = {
    username,
    email,
    password,
  };

  try {
    const response = await api.post<RegistrationResponse>(
      "/auth/register",
      payload
    );
    return {
      message: response?.data?.message,
    };
  } catch (err) {
    console.log(err);
    const axiosError = err as AxiosError<RegisterErrorResponse>;
    return {
      error: axiosError?.response?.data?.message,
    };
  }
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const payload: LoginPayload = {
    email,
    password,
  };

  const response = await api.post<LoginResponse>("/auth/login", payload, {
    withCredentials: true,
  });
  return response.data;
}
