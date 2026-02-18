"use client";

import { useState, useEffect } from "react";
import Sidebar from "../homeA/navbarA";
import Topbar from "../homeA/Topbar";
import ProductsTable from "./ProductsTable";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import PageHeader from "./PageHeader";
import SearchBar from "./SearchBar";
import { Product } from "@/app/types/product";
import { getAllProducts } from "@/app/services/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      const safeData = Array.isArray(data) ? data : [];
      setProducts(safeData);
      setFilteredProducts(safeData);
    } catch (error) {
      console.error("Erreur lors du chargement des produits:", error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ✅ useEffect corrigé avec setFilteredProducts et dépendances
  useEffect(() => {
    let result = [...products];

    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.categoryId?.name === selectedCategory);
    }

    setFilteredProducts(result); // ✅ Manquait dans l'ancienne version
  }, [search, selectedCategory, products]); // ✅ Dépendances correctes

  // Ouvrir le modal d'édition
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  // Fermer le modal et rafraîchir
  const handleEditSuccess = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
    loadProducts();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8352a5] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">
              Chargement des produits...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Sidebar />

      <div className="w-8/10 max-h-screen overflow-auto flex-1">
        <Topbar />

        <main className="p-8 space-y-6">
          <PageHeader onAddClick={() => setShowAddModal(true)} />

          <SearchBar
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            products={products}
          />

          <ProductsTable
            products={filteredProducts}
            totalProducts={products.length}
            onRefresh={loadProducts}
            onEdit={handleEdit}
          />
        </main>
      </div>

      {/* Modal d'ajout */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            loadProducts();
          }}
        />
      )}

      {/* Modal d'édition */}
      {showEditModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => {
            setShowEditModal(false);
            setSelectedProduct(null);
          }}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
}
