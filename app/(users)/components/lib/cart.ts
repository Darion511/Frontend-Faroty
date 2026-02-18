// lib/cart.ts

import { Product } from "@/app/types/product";

const CART_KEY = "cart";

// export function getCartAmount(): number {
//   const storedCart = localStorage.getItem("cart");
//   if (storedCart) {
//     const cart = JSON.parse(storedCart);
//     return cart.length;
//   }
//   return 0;
// } // toaster
// export function getCartAmount(): number {
//   if (typeof window === "undefined") {
//     return 0; // côté serveur
//   }

//   const storedCart = localStorage.getItem("cart");
//   if (!storedCart) return 0;

//   const cart = JSON.parse(storedCart);
//   return cart.length;
// }

export type CartItem = {
  product: Product;

  quantity: number;
};

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(CART_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function getCartAmount(): number {
  if (typeof window === "undefined") return 0;

  const storedCart = localStorage.getItem("cart");
  if (!storedCart) return 0;

  const cart = JSON.parse(storedCart);
  return cart.length;
}

// export function getCart(): CartItem[] {
//   if (typeof window === "undefined") return [];
//   return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
// }

export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product) {
  const cart = getCart();
  const item = cart.find((i) => i.product.id === product.id);

  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(id: string) {
  console.log("removing");
  console.log(id);
  const cart = getCart().filter((i) => i.product.id !== id);
  console.log("done");
  saveCart(cart);
}

// export function updateQuantity(id: number, quantity: number) {
//   const cart = getCart();
//   const item = cart.find((i) => i.product.id === id);
//   if (item) item.quantity = quantity;
//   saveCart(cart);
// }

export function getTotal() {
  return getCart().reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
}
export function increaseQty(id: string) {
  const cart = getCart().map((item) =>
    item.product.id === id && item.quantity < item.product.quantity
      ? { ...item, quantity: item.quantity + 1 }
      : item,
  );
  saveCart(cart);
}
export function decreaseQty(id: string) {
  const cart = getCart().map((item) =>
    item.product.id === id && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item,
  );

  saveCart(cart);
}
