"use client";

import { useEffect, useState } from "react";
import { products } from "../data/products";
import { FiltersState } from "../../types/filters";

const DEFAULT_FILTERS: FiltersState = {
  categories: [],
  brands: [],
  maxPrice: 200000,
};

export default function Filters({ filter }: { filter: any }) {
  const [mounted, setMounted] = useState(false);
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);

  // 🔹 Catégories & marques uniques depuis products.ts
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const brands = Array.from(new Set(products.map((p) => p.brand)));

  // 🔹 Charger depuis localStorage (client only)
  useEffect(() => {
    const checkMount = async () => {
      const stored = localStorage.getItem("filters");

      if (stored) {
        const parsed = JSON.parse(stored);

        setFilters({
          ...DEFAULT_FILTERS,
          ...parsed, // écrase seulement ce qui existe
        });
      }

      setMounted(true);
    };

    checkMount();
  }, []);

  // 🔹 Sauvegarder automatiquement
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("filters", JSON.stringify(filters));
    }
  }, [filters, mounted]);

  if (!mounted) return null; // ⛔ évite hydration error

  // ---------- handlers ----------
  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleBrand = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  return (
    <aside className="w-64 bg-white shadow-sm">
      {/* HEADER */}
      <div className="bg-[#8352a5] text-white px-4 py-3 font-semibold">
        Filtres
      </div>

      <div className="p-4 space-y-6">
        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold text-[#8352a5] mb-3">Catégories</h3>

          <div className="space-y-2 text-sm text-[#8352a5]">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* MARQUES */}
        <div>
          <h3 className="font-semibold text-[#8352a5] mb-3">Marques</h3>

          <div className="space-y-2 text-sm text-[#8352a5]">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* PRIX */}
        <div>
          <h3 className="font-semibold text-[#8352a5] mb-3">Prix</h3>

          <p className="text-sm text-[#8352a5] mb-2">
            Jusqu’à {filters.maxPrice.toLocaleString()} FCFA
          </p>

          <input
            type="range"
            min={5000}
            max={200000}
            step={5000}
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({
                ...filters,
                maxPrice: Number(e.target.value),
              })
            }
            className="w-full accent-[#8352a5]"
          />
        </div>
      </div>
      <button
        onClick={() => filter()}
        className="w-full bg-[#8352a5] text-white py-2"
      >
        Appliquer
      </button>
    </aside>
  );
}
