"use client";

import CartItem from "./CartItem";
import ResumePanier from "./ResumePanier";
import { getCart } from "../components/lib/cart";
import { CartItem as Item } from "../../types/cart";
import { useState } from "react";
import SelectAll from "./SelectAll";
import Link from "next/link";

export default function PanierPage() {
  const [cart, setCart] = useState<Item[]>(getCart());

  if (cart.length === 0) {
    return (
      <section className="max-w-7xl mt-10 font-nexa font-light mx-auto px-6 py-12">
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-lg text-gray-700">
            Votre panier est vide pour le moment. Ajoutez des produits pour
            commencer vos achats.
          </p>
          <Link href="/produits" className="w-full sm:w-auto">
            <button className="w-full bg-[#8352a5] text-white px-6 py-3 cursor-pointer rounded-lg hover:bg-[#6b428a] transition">
              Ajouter un produit au panier
            </button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl pt-24 font-nexa font-light mx-auto px-4 sm:px-6 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ===== LISTE DES PRODUITS ===== */}
      <div className="lg:col-span-2 space-y-5">
        {/* HEADER */}
        <SelectAll onClear={() => setCart([])} />

        {/* PRODUITS */}
        <div className="space-y-4 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto pr-1">
          {cart.map((item) => (
            <CartItem key={item.product.id} item={item} setCart={setCart} />
          ))}
        </div>
      </div>

      {/* ===== RÉSUMÉ PANIER ===== */}
      <ResumePanier lien="/AdressLivraison" />
    </section>
  );
}
