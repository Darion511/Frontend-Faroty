// types/cart.ts
import { Product } from "../components/data/products";

export type CartItem = {
  product: Product;
  quantity: number;
};
export type Cart = CartItem[];
