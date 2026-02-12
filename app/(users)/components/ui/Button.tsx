"use client";

import { ShoppingCart } from "lucide-react";
import { addToCart, getCartAmount } from "../lib/cart";
import { Product } from "../data/products";
import { useCartStore } from "../../store/useCartStore";
import { toast } from "sonner";
import { getAllProducts } from "../lib/productService";

export default function Button({ product }: { product: Product }) {
  const setCartAmount = useCartStore((state) => state.setCartAmount);

  const handleAddToCart = () => {
    addToCart(product);
    setCartAmount(getCartAmount());
    console.log(getAllProducts());

    toast.success("Produit ajouté au panier ", {
      description: product.name,
    });
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center justify-center w-full bg-[#8352a5] text-white px-4 py-2 rounded-xl hover:bg-[#6b428a] cursor-pointer transition"
    >
      <ShoppingCart size={22} className="mr-1" />
      Ajouter au Panier
    </button>
  );
}
