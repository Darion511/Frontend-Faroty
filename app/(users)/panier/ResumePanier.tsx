"use client";
import Link from "next/link";
import { getTotal } from "../components/lib/cart";

export default function ResumePanier({ lien }: { lien: string }) {
  const total = getTotal();
  console.log("hi " + total);
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-4 h-fit">
      <h3 className="font-semibold text-lg text-[#8352a5]">Détail du Panier</h3>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Sous-total</span>
        <span>{total} FCFA</span>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>Frais de livraison</span>
        <span>0 FCFA</span>
      </div>

      <hr />

      <div className="flex justify-between font-bold text-gray-900">
        <span>Total général</span>
        <span>{total} FCFA</span>
      </div>

      <Link href={`${lien}`}>
        <button
          type="submit"
          className="w-full bg-[#8352a5] text-white py-3 rounded-lg hover:opacity-90"
        >
          Commander
        </button>
      </Link>
    </div>
  );
}
