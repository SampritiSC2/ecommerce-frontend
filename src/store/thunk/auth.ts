import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile, login, type LoginPayload } from "../../services/auth.service";
import type {
  LoginErrorResponse,
  LoginResponse,
  User,
} from "../../types/auth/auth.model";
import type { AxiosError } from "axios";

const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/login", async (loginPayload, { rejectWithValue }) => {
  try {
    const data = await login(loginPayload.email, loginPayload.password);
    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }
    return data as LoginResponse;
  } catch (err) {
    const axiosError = err as AxiosError<LoginErrorResponse>;
    return rejectWithValue(
      axiosError?.response?.data?.message ?? "Login failed"
    );
  }
});

const getProfileThunk = createAsyncThunk<
  User,
  undefined,
  { rejectValue: string }
>("auth/profile", async (_, { rejectWithValue }) => {
  try {
    return await getProfile();
  } catch (err) {
    const axiosError = err as AxiosError<Pick<LoginErrorResponse, 'message' | 'statusCode'>>;
    return rejectWithValue(axiosError?.response?.data?.message ?? "Unauthorized")
  }
});

export { loginThunk, getProfileThunk };
