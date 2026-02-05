"use client";

import { useEffect, useState } from "react";
import { products } from "../components/data/products";
import ProductCard from "../components/product/ProductCard";
import Filter from "../components/ui/Filter";
import Input from "../components/ui/Input";
import { FiltersState } from "../types/filters";

const DEFAULT_FILTERS: FiltersState = {
  categories: [],
  brands: [],
  maxPrice: 200000,
};

export default function Produits() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);

  // 🔹 Charger filtres depuis localStorage
  const filter = async () => {
    const stored = localStorage.getItem("filters");
    if (stored) {
      setFilters({ ...DEFAULT_FILTERS, ...JSON.parse(stored) });
    }
    console.log("Filtres chargés :", filters);
  };

  // 🔹 Filtrage COMPLET
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);

    const matchBrand =
      filters.brands.length === 0 || filters.brands.includes(product.brand);

    const matchPrice = product.price <= filters.maxPrice;

    return matchSearch && matchCategory && matchBrand && matchPrice;
  });

  return (
    <section className="font-nexa font-light mt-18">
      <div className="mr-20">
        <div className="flex gap-8">
          {/* FILTRES */}
          <Filter filter={filter} />

          <div className="flex-1 mt-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-3xl font-bold text-[#8352a5]">Produits</h2>

              {/* RECHERCHE */}
              <div className="w-full md:w-80">
                <Input onChange={setSearch} />
              </div>
            </div>

            {/* LISTE */}
            <div className="h-150 overflow-y-scroll pb-4 scrollbar-hide">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}

                {filteredProducts.length === 0 && (
                  <p className="text-gray-500">Aucun produit trouvé</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
