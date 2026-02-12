"use client";

import { useState } from "react";
import Sidebar from "../homeA/navbarA";
import Topbar from "../homeA/Topbar";

// Type catégorie
type Categorie = {
  id: number;
  nom: string;
  produits: number;
  statut: "actif" | "inactif";
};

// Données mock
const categoriesData: Categorie[] = [
  { id: 1, nom: "Vêtements", produits: 12, statut: "actif" },
  { id: 2, nom: "Accessoires", produits: 8, statut: "inactif" },
  { id: 3, nom: "Chaussures", produits: 15, statut: "actif" },
];

export default function CategoriesAdmin() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredCategories = categoriesData.filter((cat) =>
    cat.nom.toLowerCase().includes(search.toLowerCase()),
  );

  // Statistiques
  const totalCategories = categoriesData.length;
  const activeCategories = categoriesData.filter(
    (c) => c.statut === "actif",
  ).length;
  const totalProducts = categoriesData.reduce(
    (sum, cat) => sum + cat.produits,
    0,
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Sidebar */}
      <Sidebar />

      <div className="w-8/10  max-h-screen overflow-auto flex-1">
        {/* Topbar */}
        <Topbar />

        <main className="p-8 space-y-6 ">
          {/* En-tête avec titre et bouton */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] bg-clip-text text-transparent mb-2">
                Gestion des Catégories
              </h1>
              <p className="text-gray-600">
                Gérez et organisez vos catégories de produits
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] text-white rounded-xl hover:from-[#6b3d8f] hover:to-[#5a2c7a] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Nouvelle Catégorie
            </button>
          </div>

          {/* Cartes statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Catégories
                  </p>
                  <p className="text-3xl font-bold text-[#8352a5]">
                    {totalCategories}
                  </p>
                </div>
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-[#8352a5]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Catégories Actives
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {activeCategories}
                  </p>
                </div>
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Total Produits
                  </p>
                  <p className="text-3xl font-bold text-blue-600">
                    {totalProducts}
                  </p>
                </div>
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Barre de recherche et filtres */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Rechercher une catégorie..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8352a5] focus:border-transparent transition-all"
                />
              </div>
              <button className="px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium flex items-center gap-2 whitespace-nowrap">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                Filtres
              </button>
            </div>
          </div>

          {/* Tableau catégories */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f]">
                  <tr>
                    <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                      Nom de la catégorie
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                      Produits
                    </th>
                    <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-8 py-4 text-right text-sm font-bold text-white   uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((cat) => (
                      <tr
                        key={cat.id}
                        className="hover:bg-purple-50 transition-all duration-200"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#8352a5] to-[#6b3d8f] rounded-lg flex items-center justify-center text-white font-bold">
                              {cat.nom.charAt(0)}
                            </div>
                            <span className="font-semibold text-gray-900">
                              {cat.nom}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              />
                            </svg>
                            {cat.produits}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <span
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
                              cat.statut === "actif"
                                ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                                : "bg-gradient-to-r from-red-400 to-red-500 text-white"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                cat.statut === "actif" ? "bg-white" : "bg-white"
                              } animate-pulse`}
                            ></span>
                            {cat.statut.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex gap-2 justify-end">
                            <button
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all group"
                              title="Modifier"
                            >
                              <svg
                                className="w-5 h-5 group-hover:scale-110 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                            <button
                              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all group"
                              title="Voir détails"
                            >
                              <svg
                                className="w-5 h-5 group-hover:scale-110 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all group"
                              title="Supprimer"
                            >
                              <svg
                                className="w-5 h-5 group-hover:scale-110 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
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
            {filteredCategories.length > 0 && (
              <div className="bg-gray-50 px-8 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-700">
                  Affichage de <span className="font-semibold">1</span> à{" "}
                  <span className="font-semibold">
                    {filteredCategories.length}
                  </span>{" "}
                  sur <span className="font-semibold">{totalCategories}</span>{" "}
                  catégories
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
        </main>
      </div>
    </div>
  );
}
