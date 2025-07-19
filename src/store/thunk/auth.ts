import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, type LoginPayload } from "../../services/auth.service";
import type {
  LoginErrorResponse,
  LoginResponse,
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

export { loginThunk };
