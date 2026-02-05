"use client";

import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";
import { getCart, getTotal } from "../components/lib/cart";
import { CartItem } from "../components/data/products";

export default function PaymentSummary() {
  return (
    <section className="max-w-7xl font-nexa font-light mx-auto px-6 py-16">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center">
            <Image
              src="/image 67.png"
              alt="MboaShop"
              width={28}
              height={28}
              className="rounded-full"
            />
          </div>
          <h1 className="text-xl font-bold text-[#8352a5]">MboaShop</h1>
        </div>

        {/* ===== DÉTAILS COMMANDE ===== */}
        <div className="rounded-xl overflow-hidden border">
          <div className="bg-purple-100 text-[#8352a5] font-semibold px-4 py-2">
            Détails de la commande
          </div>

          {getCart().map((item: CartItem, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 border-t"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.product.image}
                  alt="Produit"
                  width={44}
                  height={44}
                  className="rounded-md"
                />
                <div className="text-sm">
                  <p className="font-medium text-gray-800 leading-snug">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × {item.product.price} FCFA
                  </p>
                </div>
              </div>

              <span className="text-sm font-semibold text-[#8352a5]">
                {item.quantity * item.product.price} FCFA
              </span>
            </div>
          ))}
        </div>

        {/* ===== INFOS ENTREPRISE ===== */}
        <div className="rounded-xl border overflow-hidden">
          <div className="bg-purple-100 text-[#8352a5] font-semibold px-4 py-2">
            Informations de l’entreprise
          </div>

          <div className="p-4 space-y-3 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-[#8352a5]" />
              <span>WhatsApp</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#8352a5]" />
              <span>Quartier, Ville, Pays</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[#8352a5]" />
              <span>contact@mboashop.com</span>
            </div>
          </div>
        </div>

        {/* ===== TOTAL ===== */}
        <div className="flex justify-between items-center border rounded-xl px-4 py-3 font-semibold">
          <span className="text-gray-700">Montant total</span>
          <span className="text-[#8352a5] text-lg">{getTotal()}FCFA</span>
        </div>

        {/* ===== BOUTON PAIEMENT ===== */}
        <button className="w-full bg-[#8352a5] hover:bg-[#6b428a] text-white py-3 rounded-xl text-lg font-semibold transition">
          Payer
        </button>
      </div>
    </section>
  );
}

/* <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Merci pour votre message !
        </h1>
        <p className="text-gray-600 mb-6">
          Nous avons bien reçu votre message et nous vous répondrons dans les
          plus brefs délais.
        </p>
        <button className="bg-[#8352a5] text-white px-6 py-2 rounded-lg hover:bg-[#6b428a] transition">
          Retour à laccueil
        </button> */
