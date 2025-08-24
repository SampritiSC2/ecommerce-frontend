import type { Product } from "../product/product.model";

export interface CartItem {
  product: string | Product;
  quantity: number;
}

export interface ShippingAddress {
  _id?: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  userId?: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export interface CartResponse {
  cartId: string;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  shippingAddress?: ShippingAddress;
}
