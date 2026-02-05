import { create } from "zustand";
import { getCartAmount } from "../components/lib/cart";

export const useCartStore = create((set) => ({
  cartAmount: getCartAmount(),
  setCartAmount: (amount: number) => set({ cartAmount: amount }),
}));
