"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartItem as Item } from "../types/cart";

import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  getCart,
  getCartAmount,
} from "../components/lib/cart";
import { useCartStore } from "../store/useCartStore";

export default function CartItem({
  item,
  setCart,
}: {
  item: Item;
  setCart: React.Dispatch<React.SetStateAction<Item[]>>;
}) {
  const setCartAmount = useCartStore((state) => state.setCartAmount);

  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-5 hover:shadow-md transition">
      {/* IMAGE */}
      <Image
        src={item.product.image}
        alt={item.product.name}
        width={72}
        height={72}
        className="rounded-lg border"
      />

      {/* INFOS PRODUIT */}
      <div className="flex-1 space-y-1">
        <p className="text-sm font-semibold text-[#8352a5]">
          {item.product.name}
        </p>

        <p className="text-xs text-gray-400">Marque : {item.product.brand}</p>

        <p className="text-sm font-bold text-gray-800">
          {item.product.price} FCFA
        </p>
      </div>

      {/* QUANTITÉ */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            decreaseQty(item.product.id);
            setCart(getCart());
          }}
          className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-100 transition"
        >
          −
        </button>

        <span className="text-sm font-medium w-5 text-center">
          {item.quantity}
        </span>

        <button
          onClick={() => {
            increaseQty(item.product.id);
            setCart(getCart());
          }}
          className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-100 transition"
        >
          +
        </button>
      </div>

      {/* SUPPRIMER */}
      <button
        onClick={() => {
          removeFromCart(item.product.id);
          setCartAmount(getCartAmount());
          setCart(getCart());
        }}
        className="p-2 rounded hover:bg-red-50 transition"
        title="Supprimer du panier"
      >
        <Trash2 size={18} className="text-red-500" />
      </button>
    </div>
  );
}
