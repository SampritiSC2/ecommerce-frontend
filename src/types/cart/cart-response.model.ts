import type { Product } from "../product/product.model";

export interface CartItem {
  product: string | Product;
  quantity: number;
}

export interface CartResponse {
  cartId: string;
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}
