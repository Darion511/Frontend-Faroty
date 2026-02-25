"use client";

import { X, Tag, CheckCircle } from "lucide-react";
import { useState } from "react";
import { createCategory } from "@/app/services/categoryService";
import { uploadImage } from "@/app/services/uploadImageService";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddCategoryModal({ onClose, onSuccess }: Props) {
  const [nom, setNom] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // validations simples
    if (!nom.trim()) {
      setError("Le nom de la catégorie est requis");
      setIsLoading(false);
      return;
    }

    if (!imageFile) {
      setError("L'image de la catégorie est requise");
      setIsLoading(false);
      return;
    }

    try {
      // 1️⃣ Upload image vers Cloudinary
      const uploadedImageUrl = await uploadImage(imageFile);

      // 2️⃣ Payload final
      const payload = {
        name: nom.trim(),
        imageUrl: uploadedImageUrl,
      };

      // 3️⃣ Création catégorie
      await createCategory(payload);

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Erreur:", error);
      setError(error.message || "Erreur lors de la création de la catégorie");
    }

    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] px-6 py-4 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Tag className="text-white w-6 h-6" />
              <h2 className="text-xl font-bold text-white">
                Nouvelle Catégorie
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Image de la catégorie <span className="text-red-500">*</span>
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
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          {imagePreview && (
            <div className="relative w-full h-40 rounded-xl overflow-hidden border">
              <img
                src={imagePreview}
                alt="Aperçu catégorie"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la catégorie <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              placeholder="Ex: Électronique"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                "..."
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Créer
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
