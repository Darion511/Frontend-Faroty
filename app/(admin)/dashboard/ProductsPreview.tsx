"use client";

import React, { useEffect, useState, useMemo } from "react";

import Link from "next/link";
import { Package, ArrowRight, AlertCircle } from "lucide-react";
import { Product } from "@/app/types/product";
import { getAllProducts } from "@/app/services/productService";

// --- Helpers ---
const getStockStatus = (quantity: number) => {
  if (quantity === 0) {
    return {
      label: "Rupture",
      color: "text-red-600",
      bgColor: "bg-red-50",
      showAlert: true,
    };
  }
  if (quantity < 5) {
    return {
      label: "Stock faible",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      showAlert: true,
    };
  }
  if (quantity < 10) {
    return {
      label: "Stock limité",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      showAlert: false,
    };
  }
  return {
    label: "En stock",
    color: "text-green-600",
    bgColor: "bg-green-50",
    showAlert: false,
  };
};

export default function ProductsPreview() {
  const [rawData, setRawData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProducts();
        setRawData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur chargement produits:", err);
        setError("Impossible de charger les produits");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);
  // useEffect(() => {
  //   const loadOrders = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       const data = await getAllOrders();
  //       setRawData(Array.isArray(data) ? data : []);
  //     } catch (err) {
  //       console.error("Erreur chargement commandes:", err);
  //       setError("Impossible de charger les commandes");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadOrders();
  // }, []);

  // --- Computed Data ---
  const topProducts = useMemo(() => {
    return [...rawData]
      .sort((a, b) => (b.price || 0) - (a.price || 0))
      .slice(0, 5);
  }, [rawData]);

  const stats = useMemo(() => {
    return {
      totalSold: topProducts.reduce((sum, p) => sum + (p.price || 0), 0),
      stockValue: topProducts.reduce(
        (sum, p) => sum + p.price * (p.quantity - p.pending || 0),
        0,
      ),
    };
  }, [topProducts]);

  // --- Render States ---
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8352a5]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 text-center py-8">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
        <p className="text-red-600 font-semibold mb-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-[#8352a5] text-white rounded-lg hover:bg-[#6b3d8f] transition-colors text-sm"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-50 overflow-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#8352a5] to-[#6b3d8f] rounded-full flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900"> Produits</h2>
          </div>
        </div>
        <Link
          href="/produitA"
          className="flex items-center gap-2 px-4 py-2 text-[#8352a5] hover:bg-purple-50 rounded-lg transition-colors font-semibold text-sm"
        >
          Voir tout <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Products List */}
      {topProducts.length > 0 ? (
        <div className="space-y-4">
          {topProducts.map((product, index) => {
            const stockStatus = getStockStatus(
              product.quantity - product.pending || 0,
            );
            const primaryImage = product.imageUrl;

            return (
              <div
                key={product.id}
                className="flex items-center gap-4 p-6 rounded-xl hover:bg-purple-50 transition-all cursor-pointer group border border-gray-100"
              >
                {/* Rank */}
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#8352a5] to-[#6b3d8f] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Image */}
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                  <img
                    src={primaryImage}
                    alt={product.name}
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate group-hover:text-[#8352a5] transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-0.5">
                    {product.price.toLocaleString()} FCFA
                  </p>
                </div>

                {/* Stock Status */}
                <div className="flex flex-col items-end gap-1">
                  <div
                    className={`px-2 py-0.5 rounded-full ${stockStatus.bgColor} flex items-center gap-1`}
                  >
                    {stockStatus.showAlert && (
                      <AlertCircle className={`w-3 h-3 ${stockStatus.color}`} />
                    )}
                    <span className={`text-xs font-bold ${stockStatus.color}`}>
                      {product.quantity - product.pending || 0}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
                    {stockStatus.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-semibold">Aucun produit trouvé</p>
        </div>
      )}

      {/* Summary Footer */}
    </div>
  );
}
