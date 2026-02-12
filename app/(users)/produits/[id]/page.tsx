"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

import { useState } from "react";
import ProductCard from "@/app/(users)/components/product/ProductCard";
import Button from "@/app/(users)/components/ui/Button";

export default function ProductDetails() {
  const params = useParams();
  // const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");

  // Fetch product details based on ID

  if (!product) {
    return <p>Produit introuvable</p>;
  }

  return (
    <section className="font-nexa font-light max-w-6xl mt-20 mx-auto px-6 py-10">
      {/* ===== HAUT : IMAGE + INFOS ===== */}
      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">
        {/* IMAGE */}
        <div className="shadow rounded-lg p-6 flex justify-center">
          <Image
            src={product.image}
            alt="Cartouches Epson XP-235"
            width={260}
            height={260}
            className="object-contain"
          />
        </div>

        {/* INFOS */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            {product.name}
          </h1>

          {/* COULEURS */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Couleur</span>
            <span className="w-4 h-4 rounded-full bg-black"></span>
            <span className="w-4 h-4 rounded-full bg-gray-300"></span>
            <span className="w-4 h-4 rounded-full bg-purple-500"></span>
          </div>

          {/* PRIX */}
          <p className="text-3xl font-bold text-purple-600">
            {product.price} FCFA
          </p>

          {/* PANIER */}
          <div className="flex items-end pt-4 gap-4">
            <Button product={product} />
          </div>
        </div>
      </div>

      {/* ===== ONGLET ===== */}
      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <div className="flex gap-6 border-b mb-6">
          <button
            onClick={() => setTab("description")}
            className={`pb-2 ${
              tab === "description"
                ? "text-[#8352a5] border-b-2 border-[#8352a5] font-medium"
                : "text-gray-500"
            }`}
          >
            Description
          </button>

          <button
            onClick={() => setTab("caracteristique")}
            className={`pb-2 ${
              tab === "caracteristique"
                ? "text-[#8352a5] border-b-2 border-[#8352a5] font-medium"
                : "text-gray-500"
            }`}
          >
            Caractéristique
          </button>

          <button
            onClick={() => setTab("similaire")}
            className={`pb-2 ${
              tab === "similaire"
                ? "text-[#8352a5] border-b-2 border-[#8352a5] font-medium"
                : "text-gray-500"
            }`}
          >
            Produits similaires
          </button>
        </div>

        {/* CONTENU ONGLET */}
        {tab === "description" && (
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Compatible HP DeskJet / OfficeJet</li>
            <li>• Encre haute qualité</li>
            <li>• Installation facile</li>
          </ul>
        )}

        {tab === "caracteristique" && (
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Noir / Couleur</li>
            <li>• Référence : HP 123</li>
            <li>• Garantie : 6 mois</li>
          </ul>
        )}

        {tab === "similaire" && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {product.map((product) => (
              <div key={product.id} className=" p-4 ">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
