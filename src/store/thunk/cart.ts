import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CartResponse } from "../../types/cart/cart-response.model";
import { getCurrentUserCart } from "../../services/cart.service";
import type { AxiosError } from "axios";

const getCurrentUserCartThunk = createAsyncThunk<
  CartResponse | null,
  void,
  { rejectValue: string }
>("cart/current", async (_, { rejectWithValue }) => {
  try {
    const data = await getCurrentUserCart();
    return data ?? null;
  } catch (err) {
    const axiosError = err as AxiosError<any>;
    return rejectWithValue(
      axiosError?.response?.data?.message ?? "Failed to fetch cart"
    );
  }
});

export { getCurrentUserCartThunk };
