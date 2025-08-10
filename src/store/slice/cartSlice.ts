import { createSlice } from "@reduxjs/toolkit";
import type { CartResponse } from "../../types/cart/cart-response.model";
import { getCurrentUserCartThunk } from "../thunk/cart";

type CartState = {
  loading: boolean;
  error: string | null;
  cart: CartResponse | null;
};

const initialState: CartState = {
  loading: false,
  error: null,
  cart: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserCartThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUserCartThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(getCurrentUserCartThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? null;
    });
  },
});

const cartActions = cartSlice.actions;
export { cartSlice, cartActions };
