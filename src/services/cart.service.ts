import { CARTID_KEY } from '../constants/cart.constants';
import type { CartResponse, ShippingAddress } from '../types/cart/cart-response.model';
import api from '../api/api';

export interface AddToCartPayload {
  productId: string;
  quantity: number;
  cartId?: string;
}

export interface DeleteFromCartPayload {
  productId: string;
  quantity: number;
  cartId: string;
}

export async function addToCart(productId: string, quantity: number): Promise<CartResponse> {
  const payload: AddToCartPayload = {
    productId,
    quantity,
  };
  const existingCartId = localStorage.getItem(CARTID_KEY);
  if (existingCartId) {
    payload.cartId = existingCartId;
  }

  const response = await api.post<CartResponse>('/cart', payload);
  const cartId = response.data?.cartId;
  if (cartId && localStorage.getItem(CARTID_KEY) !== cartId && !localStorage.getItem('accessToken')) {
    localStorage.setItem(CARTID_KEY, cartId);
  }
  return response.data;
}

export async function cartById(cartId: string): Promise<CartResponse> {
  const response = await api.get<CartResponse>(`/cart/${cartId}`);
  return response.data;
}

export async function deleteCartItem(productId: string, quantity: number, cartId: string): Promise<CartResponse> {
  const response = await api.delete<CartResponse>('/cart', {
    data: {
      productId,
      quantity,
      cartId,
    },
  });
  return response.data;
}

// To fetch the current logged in user's cart
export async function getCurrentUserCart() {
  const cartId = localStorage.getItem(CARTID_KEY);
  const response = await api.get<CartResponse | null>(`/cart/current`, {
    params: {
      cartId: cartId ?? '-1',
    },
  });
  return response.data;
}

//To update shipping address in user cart
export async function updateShippingAddressForCart(cartId: string, payload: ShippingAddress) {
  const response = await api.patch<CartResponse>(`/cart/${cartId}/address`, payload);
  return response.data;
}
