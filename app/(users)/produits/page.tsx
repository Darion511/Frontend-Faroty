"use client";

import { useEffect, useState } from "react";
import { Package } from "lucide-react";

import ProductCard from "../components/product/ProductCard";
import Filter from "../components/ui/Filter";
import Input from "../components/ui/Input";
import { FiltersState } from "../types/filters";
import { getAllProducts } from "../components/lib/productService";
import { Product } from "../types/product";

const DEFAULT_FILTERS: FiltersState = {
  categories: [],
  brands: [],
  maxPrice: 200000,
};

export default function Produits() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
        setError("Impossible de charger les produits");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ================= FILTRAGE ================= */
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

  /* ================= RESET FILTERS ================= */
  const handleReset = () => {
    setSearch("");
    setFilters(DEFAULT_FILTERS);
  };

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <section className="font-nexa pt-24 pb-12 min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#8352a5] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 text-lg font-medium">
            Chargement des produits...
          </p>
        </div>
      </section>
    );
  }

  /* ================= ERROR STATE ================= */
  if (error) {
    return (
      <section className="font-nexa pt-24 pb-12 min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Erreur de chargement
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#8352a5] text-white rounded-xl hover:bg-[#6b3d8f] active:scale-95 transition-all duration-200 font-medium"
          >
            Réessayer
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="font-nexa pt-24 pb-12 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* ===== SIDEBAR FILTERS ===== */}
          <aside className="w-full lg:w-72 lg:sticky lg:top-24 lg:self-start">
            <Filter filters={filters} onChange={setFilters} />
          </aside>

          {/* ===== MAIN CONTENT ===== */}
          <main className="flex-1 space-y-6">
            {/* HEADER */}
            <div className="bg-white p-6  rounded-xl shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#8352a5] mb-1">
                    Nos Produits
                  </h1>
                  <p className="text-gray-600 text-sm font-light">
                    {filteredProducts.length} produit
                    {filteredProducts.length > 1 ? "s" : ""} disponible
                    {filteredProducts.length > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="w-full sm:w-80">
                  <Input onChange={setSearch} />
                </div>
              </div>
            </div>

            {/* PRODUCTS GRID */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 space-y-4 max-h-[60vh] lg:max-h-[70vh] overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-gray-600 mb-6 font-light">
                  {search
                    ? `Aucun résultat pour "${search}"`
                    : "Essayez de modifier vos filtres"}
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-[#8352a5] text-white rounded-xl hover:bg-[#6b3d8f] active:scale-95 transition-all duration-200 font-medium"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
