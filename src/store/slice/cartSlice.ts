import { createSlice } from '@reduxjs/toolkit';
import type { CartResponse } from '../../types/cart/cart-response.model';
import { addToCartThunk, deleteItemFromCartThunk, getCartByIdThunk, getCurrentUserCartThunk } from '../thunk/cart';

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
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get current user's cart
    builder.addCase(getCurrentUserCartThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUserCartThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(getCurrentUserCartThunk.rejected, (state, action) => {
      state.loading = false;
      state.cart = null;
      state.error = action.payload ?? null;
    });
    // Add to cart
    builder.addCase(addToCartThunk.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    // Get cart by id
    builder.addCase(getCartByIdThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCartByIdThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(getCartByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.cart = null;
      state.error = action.payload ?? null;
    });
    // Delete Item from cart
    builder.addCase(deleteItemFromCartThunk.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

const cartActions = cartSlice.actions;
export { cartSlice, cartActions };
