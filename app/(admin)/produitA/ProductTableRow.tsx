"use client";

import {
  Pencil,
  Trash2,
  Eye,
  Package,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { Product } from "@/app/types/product";

type Props = {
  product: Product;
  onDelete: (id: string) => void;
  onEdit?: (product: Product) => void;
  onView?: (product: Product) => void;
};

export default function ProductTableRow({
  product,
  onDelete,
  onEdit,
  onView,
}: Props) {
  // Style du stock selon la quantité
  const getStockStyle = () => {
    if (product.quantity === 0) {
      return {
        bg: "bg-red-50",
        text: "text-red-700",
        label: "Rupture",
      };
    }
    if (product.quantity < 5) {
      return {
        bg: "bg-orange-50",
        text: "text-orange-700",
        label: "Stock faible",
      };
    }
    if (product.quantity < 10) {
      return {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        label: "Stock limité",
      };
    }
    return {
      bg: "bg-green-50",
      text: "text-green-700",
      label: "En stock",
    };
  };

  const stockInfo = getStockStyle();

  return (
    <tr className="hover:bg-purple-50 transition-all duration-200 group">
      {/* PRODUCT IMAGE */}
      <td className="px-8 py-5">
        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md bg-gray-100 relative border-2 border-gray-200 group-hover:border-[#8352a5] transition-colors">
          <img
            src={product.imageUrl}
            alt={product.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
      </td>

      {/* NAME */}
      <td className="px-8 py-5">
        <div>
          <span className="font-semibold text-gray-900 line-clamp-2 block mb-1">
            {product.name}
          </span>
          {product.categoryId && (
            <span className="text-xs text-gray-500 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#8352a5] rounded-full"></span>
              {product.categoryId.id}
            </span>
          )}
        </div>
      </td>

      {/* PRICE */}
      <td className="px-8 py-5">
        <div className="flex flex-col">
          <span className="font-bold text-[#8352a5] whitespace-nowrap">
            {product.price.toLocaleString()} FCFA
          </span>
        </div>
      </td>

      {/* STOCK */}
      <td className="px-8 py-5">
        <div className="flex flex-col gap-1">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold text-sm w-fit ${stockInfo.bg} ${stockInfo.text}`}
          >
            <Package className="w-4 h-4" />
            {product.quantity}
          </span>
          <span className={`text-xs ${stockInfo.text} font-medium`}>
            {stockInfo.label}
          </span>
        </div>
      </td>

      {/* MARQUE */}
      <td className="px-8 py-5">
        <span className="font-regular text-gray-900 line-clamp-2 block mb-1">
          {product.marque}
        </span>
      </td>

      {/* ACTIONS */}
      <td className="px-8 py-5">
        <div className="flex gap-2 justify-end">
          {/* View Button */}
          {onView && (
            <button
              onClick={() => onView(product)}
              className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-lg transition-all group/btn"
              title="Voir détails"
              aria-label={`Voir les détails de ${product.name}`}
            >
              <Eye className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            </button>
          )}

          {/* Edit Button */}
          {onEdit && (
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-blue-600 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition-all group/btn"
              title="Modifier"
              aria-label={`Modifier ${product.name}`}
            >
              <Pencil className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            </button>
          )}

          {/* Delete Button */}
          <button
            onClick={() => {
              if (window.confirm(`Supprimer "${product.name}" ?`)) {
                onDelete(product.id);
              }
            }}
            className="p-2 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-lg transition-all group/btn"
            title="Supprimer"
            aria-label={`Supprimer ${product.name}`}
          >
            <Trash2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </td>
    </tr>
  );
}
