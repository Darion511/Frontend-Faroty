"use client";

import { useEffect, useState } from "react";
import Sidebar from "../homeA/navbarA";
import Topbar from "../homeA/Topbar";
import CategoriesHeader from "./CategoriesHeader";

import CategoriesSearch from "./CategoriesSearch";
import CategoriesTable from "./CategoriesTable";
import AddCategoryModal from "./AddCategoryModal";
import { Category } from "@/app/types/product";
import { getAllCategories } from "@/app/services/categoryService";
import { deleteCategory } from "@/app/services/categoryService";
// Données mock

export default function CategoriesAdmin() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erreur de chargement :", error);
        setError("Impossible de charger les catégories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Statistiques
  const totalCategories = categories.length;
  // const activeCategories = categories.filter(
  //   (c) => c.statut === "actif",
  // ).length;
  // const totalProducts = categories.reduce((sum, cat) => sum + cat.produits, 0);

  const handleDeleteCategory = async (id: string) => {
    const confirmed = confirm(
      "Êtes-vous sûr de vouloir supprimer cette catégorie ?",
    );

    if (!confirmed) return;

    try {
      // 1️⃣ appel API
      await deleteCategory(id);

      // 2️⃣ mise à jour du state seulement si succès
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error: any) {
      console.error("Erreur suppression catégorie:", error);
      alert(error.message || "Erreur lors de la suppression de la catégorie");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Sidebar />

      <div className="w-8/10 max-h-screen overflow-auto flex-1">
        <Topbar />

        <main className="p-8 space-y-6">
          <CategoriesHeader onAddClick={() => setShowModal(true)} />

          {/* <CategoriesStats
            totalCategories={totalCategories}
            activeCategories={activeCategories}
            totalProducts={totalProducts}
          /> */}

          <CategoriesSearch search={search} setSearch={setSearch} />

          <CategoriesTable
            categories={filteredCategories}
            totalCategories={totalCategories}
            onDelete={handleDeleteCategory}
          />
        </main>
      </div>

      {showModal && (
        <AddCategoryModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            // Recharger les catégories ici
          }}
        />
      )}
    </div>
  );
}
