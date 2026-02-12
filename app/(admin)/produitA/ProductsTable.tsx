"use client";

import { Package } from "lucide-react";
import ProductTableRow from "./ProductTableRow";
import { deleteProduct } from "../data/productsData";
import { Product } from "../types/product";

interface ProductsTableProps {
  products: Product[];
  totalProducts: number;
  onRefresh: () => void;
}

export default function ProductsTable({
  products,
  totalProducts,
  onRefresh,
}: ProductsTableProps) {
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer ce produit ?",
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);
      onRefresh();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression du produit. Veuillez réessayer.");
    }
  };

  const EmptyState = () => (
    <tr>
      <td colSpan={6} className="text-center py-16">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <div>
            <p className="text-gray-900 font-semibold text-lg mb-1">
              Aucun produit trouvé
            </p>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        </div>
      </td>
    </tr>
  );

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
                Statut
              </th>
              <th className="px-8 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductTableRow
                  key={product.id}
                  product={product}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <EmptyState />
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {products.length > 0 && (
        <div className="bg-gray-50 px-8 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Affichage de <span className="font-semibold">1</span> à{" "}
            <span className="font-semibold">{products.length}</span> sur{" "}
            <span className="font-semibold">{totalProducts}</span> produits
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              aria-label="Page précédente"
            >
              Précédent
            </button>
            <button
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
              aria-label="Page suivante"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
