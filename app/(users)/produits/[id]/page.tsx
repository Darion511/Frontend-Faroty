"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "@/app/(users)/components/product/ProductCard";
import Button from "@/app/(users)/components/ui/Button";

import { getAllProducts, getProductById } from "@/app/services/productService";
import { Product } from "@/app/types/product";

export default function ProductDetails() {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;

  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<
    "description" | "caracteristique" | "similaire"
  >("description");

  useEffect(() => {
    const loadProductData = async () => {
      if (!productId) return;

      try {
        setLoading(true);

        // Charger le produit
        const productData = await getProductById(productId);
        if (productData && !Array.isArray(productData)) {
          setProduct(productData);

          // Charger les produits similaires (même catégorie)
          const allProducts = await getAllProducts();
          if (Array.isArray(allProducts)) {
            const similar = allProducts
              .filter(
                (p) =>
                  p.category.name === productData.category.name &&
                  p.id !== productData.id,
              )
              .slice(0, 6);
            setSimilarProducts(similar);
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [productId]);

  if (loading) {
    return (
      <section className="font-nexa font-light max-w-6xl mt-20 mx-auto px-6 py-10">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement du produit...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="font-nexa font-light max-w-6xl mt-20 mx-auto px-6 py-10">
        <div className="bg-white rounded-xl shadow p-8 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Produit introuvable
          </h2>
          <p className="text-gray-600 mb-6">
            Le produit que vous recherchez n`&apos;`existe pas ou a été
            supprimé.
          </p>

          <a
            href="/accueil"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] text-white rounded-lg hover:shadow-lg transition-all"
          >
            Retour à la boutique
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="font-nexa font-light max-w-6xl mt-20 mx-auto px-6 py-10">
      {/* ===== HAUT : IMAGE + INFOS ===== */}
      <div className="grid md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">
        {/* IMAGE */}
        <div className="shadow rounded-lg p-6 flex justify-center items-center bg-gray-50">
          <div className="relative w-full h-[400px]">
            <img
              src={product.imageUrl || "/placeholder-product.png"}
              alt={product.name}
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-product.png";
              }}
            />
          </div>
        </div>

        {/* INFOS */}
        <div className="space-y-6">
          {/* Catégorie */}
          {product.category.name && (
            <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
              {product.category.name}
            </div>
          )}

          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          {/* Marque */}
          {product.marque && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Marque:</span>
              <span className="text-sm font-semibold text-gray-700">
                {product.marque}
              </span>
            </div>
          )}

          {/* Stock */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Disponibilité:</span>
            <span
              className={`text-sm font-semibold ${
                product.quantity - product.pending > 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {product.quantity - product.pending > 0
                ? `En stock (${product.quantity - product.pending} disponible${product.quantity - product.pending > 1 ? "s" : ""})`
                : "Rupture de stock"}
            </span>
          </div>

          {/* COULEURS (si disponible dans le type Product) */}
          {/* {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Couleur:</span>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-gray-300 cursor-pointer hover:border-purple-600 transition-all"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )} */}

          {/* PRIX */}
          <div className="pt-4 border-t">
            <p className="text-4xl font-bold text-purple-600">
              {product.price.toLocaleString()} FCFA
            </p>
          </div>

          {/* Description courte */}
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description
              ? product.description.length > 150
                ? `${product.description.slice(0, 150)}...`
                : product.description
              : "Aucune description disponible pour ce produit."}
          </p>

          {/* BOUTON PANIER */}
          <div className="pt-4">
            <Button product={product} />
          </div>

          {/* Informations supplémentaires */}
          <div className="pt-4 border-t space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Livraison rapide</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Garantie qualité</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ONGLETS ===== */}
      <div className="mt-10 bg-white rounded-xl shadow p-6">
        {/* En-têtes des onglets */}
        <div className="flex gap-6 border-b mb-6">
          <button
            onClick={() => setTab("description")}
            className={`pb-3 px-2 transition-all ${
              tab === "description"
                ? "text-[#8352a5] border-b-2 border-[#8352a5] font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Description
          </button>

          <button
            onClick={() => setTab("caracteristique")}
            className={`pb-3 px-2 transition-all ${
              tab === "caracteristique"
                ? "text-[#8352a5] border-b-2 border-[#8352a5] font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Caractéristiques
          </button>

          <button
            onClick={() => setTab("similaire")}
            className={`pb-3 px-2 transition-all ${
              tab === "similaire"
                ? "text-[#8352a5] border-b-2 border-[#8352a5] font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Produits similaires
          </button>
        </div>

        {/* CONTENU DES ONGLETS */}
        <div className="min-h-[200px]">
          {tab === "description" && (
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {product.description || (
                <span className="italic text-gray-500">
                  Aucune description disponible pour ce produit.
                </span>
              )}
            </div>
          )}

          {tab === "caracteristique" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.marque && (
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Marque</span>
                    <span className="text-gray-900 font-semibold">
                      {product.marque}
                    </span>
                  </div>
                )}
                {product.category && (
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Catégorie</span>
                    <span className="text-gray-900 font-semibold">
                      {product.category.name}
                    </span>
                  </div>
                )}
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">Référence</span>
                  <span className="text-gray-900 font-semibold">
                    PRD-{product.id}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 font-medium">Garantie</span>
                  <span className="text-gray-900 font-semibold">6 mois</span>
                </div>
              </div>
            </div>
          )}

          {tab === "similaire" && (
            <div>
              {similarProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {similarProducts.map((similarProduct) => (
                    <ProductCard
                      key={similarProduct.id}
                      product={similarProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    Aucun produit similaire trouvé dans cette catégorie.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
