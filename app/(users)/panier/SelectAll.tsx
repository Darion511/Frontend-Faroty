"use client";

import { useCartStore } from "../store/useCartStore";

type SelectAllProps = {
  onClear?: () => void;
};

export default function SelectAll({ onClear }: SelectAllProps) {
  const setCartAmount = useCartStore((state) => state.setCartAmount);
  const handleClearCart = () => {
    if (confirm("Voulez-vous vraiment vider le panier ?")) {
      localStorage.removeItem("cart");

      // optionnel : notifier le parent
      onClear?.();

      // mettre à jour le compteur du panier dans la navbar
      setCartAmount(0);
    }
  };

  return (
    <div className="flex items-center justify-end p-4">
      <button
        onClick={handleClearCart}
        className="bg-[#8352a5] hover:bg-[#6b428a] text-white px-4 py-2 cursor-pointer rounded-lg text-sm transition"
      >
        Vider le panier
      </button>
    </div>
  );
}
