"use client";

import { X, Package, DollarSign, Layers, CheckCircle } from "lucide-react";
import { useState } from "react";

type Props = {
  onClose: () => void;
};

export default function AddProductModal({ onClose }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"Disponible" | "Indisponible">(
    "Disponible",
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de soumission ici
    console.log({ name, price, stock, category, description, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* OVERLAY avec animation */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-slideUp">
        {/* HEADER avec gradient */}
        <div className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] px-8 py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                <Package className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Nouveau Produit
                </h2>
                <p className="text-purple-100 text-sm">
                  Ajoutez un produit à votre inventaire
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all backdrop-blur-md group"
            >
              <X className="text-white group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)]"
        >
          {/* Informations de base */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
              Informations de base
            </h3>

            {/* NOM */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Nom du produit <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Ex: T-shirt col rond"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-300"
                />
              </div>
            </div>

            {/* CATÉGORIE */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Catégorie <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Layers className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-300 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="vetements">Vêtements</option>
                  <option value="accessoires">Accessoires</option>
                  <option value="chaussures">Chaussures</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Décrivez votre produit..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-300 resize-none"
              />
            </div>
          </div>

          {/* Prix et Stock */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
              Prix et inventaire
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PRIX */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Prix <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    placeholder="0"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value ? Number(e.target.value) : "")
                    }
                    required
                    min="0"
                    className="w-full pl-12 pr-16 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-300"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 font-medium">FCFA</span>
                  </div>
                </div>
              </div>

              {/* STOCK */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Stock disponible <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Layers className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    placeholder="0"
                    value={stock}
                    onChange={(e) =>
                      setStock(e.target.value ? Number(e.target.value) : "")
                    }
                    required
                    min="0"
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STATUT */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
              Disponibilité
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setStatus("Disponible")}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  status === "Disponible"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {status === "Disponible" && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      status === "Disponible" ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    <CheckCircle
                      className={`w-6 h-6 ${
                        status === "Disponible"
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-semibold ${
                      status === "Disponible"
                        ? "text-green-700"
                        : "text-gray-600"
                    }`}
                  >
                    Disponible
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setStatus("Indisponible")}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  status === "Indisponible"
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {status === "Indisponible" && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      status === "Indisponible" ? "bg-red-100" : "bg-gray-100"
                    }`}
                  >
                    <X
                      className={`w-6 h-6 ${
                        status === "Indisponible"
                          ? "text-red-600"
                          : "text-gray-400"
                      }`}
                    />
                  </div>
                  <span
                    className={`font-semibold ${
                      status === "Indisponible"
                        ? "text-red-700"
                        : "text-gray-600"
                    }`}
                  >
                    Indisponible
                  </span>
                </div>
              </button>
            </div>
          </div>
        </form>

        {/* FOOTER - ACTIONS */}
        <div className="border-t border-gray-200 bg-gray-50 px-8 py-5 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            <span className="text-red-500">*</span> Champs obligatoires
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition-all"
            >
              Annuler
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
