import { CARTID_KEY } from "../constants/cart.constants";
import type { CartResponse } from "../types/cart/cart-response.model";
import api from "../api/api";

interface AddToCartPayload {
  productId: string;
  quantity: number;
  cartId?: string;
}
export async function addToCart(
  productId: string,
  quantity: number
): Promise<CartResponse | undefined> {
  const payload: AddToCartPayload = {
    productId,
    quantity,
  };

  const existingCartId = localStorage.getItem(CARTID_KEY);

  if (existingCartId) {
    payload.cartId = existingCartId;
  }

  try {
    const response = await api.post<CartResponse>("/cart", payload);
    const cartId = response.data?.cartId;
    if (cartId && localStorage.getItem(CARTID_KEY) !== cartId) {
      localStorage.setItem(CARTID_KEY, cartId);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function cartById(cartId: string) {
  try {
    const response = await api.get(`/cart/${cartId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return undefined;
  }
}
