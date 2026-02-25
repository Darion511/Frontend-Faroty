"use client";

import { uploadImage } from "@/app/services/uploadImageService";
import { X, Package, DollarSign, Layers, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { createProduct } from "@/app/services/productService";
import { getAllCategories } from "@/app/services/categoryService";
import { Category } from "@/app/types/product";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddProductModal({ onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [brand, setBrand] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [description, setDescription] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);

  // Charger les catégories depuis l'API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories:", err);
        setCategories([]);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validations
    if (!name.trim()) {
      setError("Le nom du produit est requis");
      return;
    }

    if (!brand.trim()) {
      setError("La marque du produit est requise");
      return;
    }

    if (!imageFile) {
      setError("L'image du produit est requise");
      return;
    }

    if (!price || Number(price) <= 0) {
      setError("Le prix doit être supérieur à 0");
      return;
    }

    if (stock === "" || Number(stock) < 0) {
      setError("La quantité en stock est requise");
      return;
    }

    if (!categoryId) {
      setError("Veuillez sélectionner une catégorie");
      return;
    }

    setIsLoading(true);

    try {
      const uploadedImageUrl = await uploadImage(imageFile);
      // Construire l'objet produit selon le type attendu par l'API
      const newProduct = {
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        quantity: Number(stock),
        marque: brand,
        imageUrl: uploadedImageUrl,

        categoryId: categoryId,
      };

      await createProduct(newProduct);

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Erreur lors de l'ajout du produit:", err);
      setError(err.message || "Erreur lors de l'ajout du produit");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* HEADER */}
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
          {/* Message d'erreur */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* IMAGE DU PRODUIT */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
              Image du produit (URL)
            </h3>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                URL de l’image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            {/* Aperçu */}
            {imagePreview && (
              <div className="relative w-full max-w-sm">
                <div className="relative w-full h-64 rounded-xl overflow-hidden border">
                  <img
                    src={imagePreview}
                    alt="Aperçu du produit"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>

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

            {/* CATÉGORIE - Dynamique depuis l'API */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Catégorie <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Layers className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-300 appearance-none bg-white cursor-pointer"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      Aucune catégorie disponible
                    </option>
                  )}
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

          {/* MARQUE */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Marque <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Package className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Ex: HP"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none hover:border-gray-300"
              />
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
              disabled={isLoading}
              className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Annuler
            </button>

            <button
              type="submit"
              form="product-form"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Enregistrement...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Enregistrer
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
