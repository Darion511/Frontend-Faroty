import { create } from "zustand";
import { getCartAmount } from "../components/lib/cart";

type CartState = {
  cartAmount: number;
  setCartAmount: (amount: number) => void;
};

export const useCartStore = create<CartState>((set) => ({
  cartAmount: getCartAmount(),
  setCartAmount: (amount: number) => set({ cartAmount: amount }),
}));
