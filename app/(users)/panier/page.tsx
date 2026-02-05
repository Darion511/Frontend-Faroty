"use client";

import CartItem from "./CartItem";
import ResumePanier from "./ResumePanier";
import { getCart } from "../components/lib/cart";
import { CartItem as Item } from "../types/cart";
import { useState } from "react";
import SelectAll from "./SelectAll";

export default function PanierPage() {
  const [cart, setCart] = useState<Item[]>(getCart());

  return (
    <section className="max-w-7xl mt-10 font-nexa font-light mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* ===== LISTE DES PRODUITS ===== */}
      <div className="lg:col-span-2 space-y-5">
        {/* HEADER */}
        <SelectAll onClear={() => setCart([])} />

        {/* PRODUITS */}
        <div className="space-y-4 h-150 overflow-scroll">
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
