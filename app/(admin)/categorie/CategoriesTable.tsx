"use client";

import { Category } from "@/app/types/product";
import CategoryRow from "./CategoryRow";

type Props = {
  categories: Category[];
  totalCategories: number;
  onDelete: (id: string) => void;
};

export default function CategoriesTable({
  categories,
  totalCategories,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f]">
            <tr>
              <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Nom de la catégorie
              </th>

              <th className="px-8 py-4 text-right text-sm font-bold text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <CategoryRow key={cat.id} category={cat} onDelete={onDelete} />
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-16">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-lg mb-1">
                        Aucune catégorie trouvée
                      </p>
                      <p className="text-gray-500">
                        Essayez de modifier vos critères de recherche
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {categories.length > 0 && (
        <div className="bg-gray-50 px-8 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Affichage de <span className="font-semibold">1</span> à{" "}
            <span className="font-semibold">{categories.length}</span> sur{" "}
            <span className="font-semibold">{totalCategories}</span> catégories
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Précédent
            </button>
            <button
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
