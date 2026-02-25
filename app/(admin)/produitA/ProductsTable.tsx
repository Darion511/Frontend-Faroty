"use client";

import { Package } from "lucide-react";
import { useState } from "react";
import ProductTableRow from "./ProductTableRow";
import { Product } from "@/app/types/product";
import { deleteProduct } from "@/app/services/productService";

interface ProductsTableProps {
  products: Product[];
  totalProducts: number;
  onRefresh: () => void;
  onEdit?: (product: Product) => void;
}

export default function ProductsTable({
  products = [],
  totalProducts = 0,
  onRefresh,
  onEdit,
}: ProductsTableProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce produit ?",
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await deleteProduct(id);
      onRefresh();
    } catch (error: any) {
      console.error("Erreur lors de la suppression:", error);
      alert(
        error.message ||
          "Erreur lors de la suppression du produit. Veuillez réessayer.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // Calcul de la pagination
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalProducts);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onRefresh(); // Recharger les données pour la page précédente
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onRefresh(); // Recharger les données pour la page suivante
    }
  };

  // État vide
  const EmptyState = () => (
    <tr>
      <td colSpan={6} className="text-center py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
            <Package className="w-10 h-10 text-[#8352a5]" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-lg mb-1">
              Aucun produit trouvé
            </p>
            <p className="text-gray-500 text-sm">
              Essayez de modifier vos critères de recherche ou ajoutez un
              nouveau produit
            </p>
          </div>
        </div>
      </td>
    </tr>
  );

  // État de chargement pendant la suppression
  if (isDeleting) {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-16">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#8352a5] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Suppression en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f]">
            <tr>
              <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Produit
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Nom
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Prix
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Stock
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Marque
              </th>
              <th className="px-8 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                  onEdit={onEdit}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {products && products.length > 0 && (
        <div className="bg-gray-50 px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            {/* Indicateur de page */}
            <div className="px-4 py-2  text-black rounded-lg font-semibold">
              {currentPage} / {totalPages}
              Affichage de <span className="font-semibold">
                {startIndex}
              </span> à <span className="font-semibold">{endIndex}</span> sur{" "}
              <span className="font-semibold">{totalProducts}</span> produit
              {totalProducts > 1 ? "s" : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
