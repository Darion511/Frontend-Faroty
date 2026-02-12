"use client";

import { useEffect, useState } from "react";
import Sidebar from "../homeA/navbarA";
import Topbar from "../homeA/Topbar";
import AddProductModal from "./AddProductModal";
import PageHeader from "./PageHeader";
import StatsSection from "./StatsSection";
import SearchBar from "./SearchBar";
import ProductsTable from "./ProductsTable";
import { getAllProducts } from "../data/productsData";

// import { fetchProducts } from "../data/productsData";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]); // 👈 Initialisation avec []
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      // 👇 Vérification que data est bien un tableau
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setProducts([]); // 👈 En cas d'erreur, mettre un tableau vide
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // 🔍 Recherche
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase()),
  );

  // 📊 Statistiques (backend)
  const totalProducts = products.length;
  const availableProducts = products.filter(
    (p) => p.status === "Disponible",
  ).length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock ?? 0), 0);
  const lowStockProducts = products.filter(
    (p) => p.stock > 0 && p.stock < 5,
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des produits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="w-8/10 max-h-screen overflow-auto flex-1">
        <Topbar />

        <main className="p-8 space-y-6">
          {/* HEADER */}
          <PageHeader onAddClick={() => setOpen(true)} />

          {/* STATISTICS */}
          <StatsSection
            totalProducts={totalProducts}
            availableProducts={availableProducts}
            totalStock={totalStock}
            lowStockProducts={lowStockProducts}
          />

          {/* SEARCH */}
          <SearchBar search={search} setSearch={setSearch} />

          {/* TABLE */}
          <ProductsTable
            products={filteredProducts}
            totalProducts={totalProducts}
            onRefresh={loadProducts}
          />
        </main>
      </div>

      {/* MODAL */}
      {open && (
        <AddProductModal
          onClose={() => setOpen(false)}
          onSuccess={loadProducts}
        />
      )}
    </div>
  );
}
