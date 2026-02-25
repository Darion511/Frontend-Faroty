"use client";

import { useMemo } from "react";
import { Product } from "../../../types/product";
import { FiltersState } from "../../../types/filters";
// import { useEffect, useState } from "react";
// import { getAllProducts } from "../lib/productService";

interface FiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  products: Product[]; // 👈 Ajout des produits en prop
}

export default function Filters({ filters, onChange, products }: FiltersProps) {
  // 👇 Utilisation de products (passé en prop) au lieu de product
  const categories = Array.from(
    new Set(products.map((p) => p.category?.name ?? "Inconnu")),
  );
  const brands = Array.from(new Set(products.map((p) => p.marque)));

  const toggleCategory = (category: string) => {
    onChange({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter((c) => c !== category)
        : [...filters.categories, category],
    });
  };

  const toggleBrand = (brand: string) => {
    onChange({
      ...filters,
      brands: filters.brands.includes(brand)
        ? filters.brands.filter((b) => b !== brand)
        : [...filters.brands, brand],
    });
  };
  const { minPrice, maxPrice } = useMemo(() => {
    if (products.length === 0) {
      return { minPrice: 0, maxPrice: 0 };
    }

    const prices = products.map((p) => p.price);
    return {
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
    };
  }, [products]);

  return (
    <aside className="w-full lg:w-72 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden lg:sticky top-0 left-0 lg:top-24 h-full">
      <div className="bg-[#8352a5] text-white px-4 py-3 font-semibold">
        Filtres
      </div>

      <div className="p-4 space-y-6">
        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold text-[#8352a5] mb-3">Catégories</h3>
          <div className="space-y-2">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#8352a5] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 text-[#8352a5] border-gray-300 rounded focus:ring-[#8352a5]"
                  />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500">Aucune catégorie</p>
            )}
          </div>
        </div>

        {/* BRANDS */}
        <div>
          <h3 className="font-semibold text-[#8352a5] mb-3">Marques</h3>
          <div className="space-y-2">
            {brands.length > 0 ? (
              brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 cursor-pointer hover:text-[#8352a5] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                    className="w-4 h-4 text-[#8352a5] border-gray-300 rounded focus:ring-[#8352a5]"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))
            ) : (
              <p className="text-sm text-gray-500">Aucune marque</p>
            )}
          </div>
        </div>

        {/* PRICE RANGE */}
        <div>
          <h3 className="font-semibold text-[#8352a5] mb-3">Prix maximum</h3>
          <div className="space-y-3">
            <p className="text-lg font-bold text-[#8352a5]">
              {filters.maxPrice.toLocaleString()} FCFA
            </p>
            <p className="text-xs text-gray-500">
              Entre {minPrice.toLocaleString()} et {maxPrice.toLocaleString()}{" "}
              FCFA
            </p>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              step={Math.max(1000, Math.floor((maxPrice - minPrice) / 20))}
              value={filters.maxPrice}
              onChange={(e) =>
                onChange({ ...filters, maxPrice: Number(e.target.value) })
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#8352a5]"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{minPrice}FCFA</span>
              <span>{maxPrice} FCFA</span>
            </div>
          </div>
        </div>

        {/* RESET BUTTON */}
        <button
          onClick={() =>
            onChange({
              categories: [],
              brands: [],
              maxPrice: maxPrice,
            })
          }
          className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Réinitialiser les filtres
        </button>
      </div>
    </aside>
  );
}
