"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartItem as Item } from "../../types/cart";
import { useState } from "react";

import {
  removeFromCart,
  increaseQty,
  decreaseQty,
  getCart,
  getCartAmount,
} from "../components/lib/cart";
import { useCartStore } from "../store/useCartStore";
import { toast } from "sonner";

export default function CartItem({
  item,
  setCart,
}: {
  item: Item;
  setCart: React.Dispatch<React.SetStateAction<Item[]>>;
}) {
  const setCartAmount = useCartStore((state) => state.setCartAmount);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 hover:shadow-md transition">
        {/* IMAGE */}
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          width={72}
          height={72}
          className="rounded-lg border object-cover"
        />

        {/* INFOS PRODUIT */}
        <div className="flex-1 space-y-1">
          <p className="text-sm font-semibold text-[#8352a5]">
            {item.product.name}
          </p>

          <p className="text-xs text-gray-400">
            Marque : {item.product.marque}
          </p>

          <p className="text-sm font-bold text-gray-800">
            {item.product.price} FCFA
          </p>
        </div>

        {/* QUANTITÉ */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => {
              decreaseQty(item.product.id);
              setCart(getCart());
              setCartAmount(getCartAmount());
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
              setCartAmount(getCartAmount());
            }}
            className="w-7 h-7 flex items-center justify-center border rounded hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>

        {/* SUPPRIMER */}
        <button
          onClick={() => setShowConfirm(true)}
          className="p-2 rounded hover:bg-red-50 transition self-end sm:self-auto"
          title="Supprimer du panier"
        >
          <Trash2 size={18} className="text-red-500" />
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 space-y-4">
            <p className="text-sm text-gray-700">
              Voulez-vous vraiment supprimer ce produit du panier ?
            </p>
            <div className="flex justify-end gap-3 text-sm">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={() => {
                  removeFromCart(item.product.id);
                  setCartAmount(getCartAmount());
                  setCart(getCart());
                  setShowConfirm(false);
                  toast.success("Produit supprimé du panier", {
                    description: item.product.name,
                  });
                }}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
