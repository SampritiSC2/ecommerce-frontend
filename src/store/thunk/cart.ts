import { createAsyncThunk } from '@reduxjs/toolkit';
import type { CartResponse } from '../../types/cart/cart-response.model';
import {
  addToCart,
  cartById,
  deleteCartItem,
  getCurrentUserCart,
  type AddToCartPayload,
  type DeleteFromCartPayload,
} from '../../services/cart.service';
import type { AxiosError } from 'axios';

const getCurrentUserCartThunk = createAsyncThunk<CartResponse | null, void, { rejectValue: string }>(
  'cart/current',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCurrentUserCart();
      return data ?? null;
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      return rejectWithValue(axiosError?.response?.data?.message ?? 'Failed to fetch cart');
    }
  }
);

const addToCartThunk = createAsyncThunk<CartResponse, AddToCartPayload, { rejectValue: string }>(
  'cart/add',
  async (payload, { rejectWithValue }) => {
    try {
      return await addToCart(payload.productId, payload.quantity);
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      return rejectWithValue(axiosError?.response?.data?.message ?? 'Failed to add to cart');
    }
  }
);

const deleteItemFromCartThunk = createAsyncThunk<CartResponse, DeleteFromCartPayload, { rejectValue: string }>(
  'cart/items/delete',
  async (payload, { rejectWithValue }) => {
    try {
      return await deleteCartItem(payload.productId, payload.quantity, payload.cartId);
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      return rejectWithValue(axiosError?.response?.data?.message ?? 'Failed to remove item from cart');
    }
  }
);

const getCartByIdThunk = createAsyncThunk<CartResponse, string, { rejectValue: string }>(
  'cart/cartById',
  async (cartId, { rejectWithValue }) => {
    try {
      return await cartById(cartId);
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      return rejectWithValue(axiosError?.response?.data?.message ?? 'Failed to fetch cart details');
    }
  }
);

export { getCurrentUserCartThunk, addToCartThunk, getCartByIdThunk, deleteItemFromCartThunk };
