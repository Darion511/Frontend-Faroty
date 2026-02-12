"use client";

import { Pencil, Trash2, Eye, Package } from "lucide-react";
import Image from "next/image";
import { Product } from "../types/product";

type Props = {
  product: Product;
  onDelete: (id: number) => void;
  onEdit?: (product: Product) => void;
  onView?: (product: Product) => void;
};

export default function ProductTableRow({
  product,
  onDelete,
  onEdit,
  onView,
}: Props) {
  const getStockStyle = () => {
    if (product.stock === 0) {
      return "bg-red-50 text-red-700";
    }
    if (product.stock < 5) {
      return "bg-orange-50 text-orange-700";
    }
    return "bg-blue-50 text-blue-700";
  };

  const getStatusStyle = () => {
    return product.status === "Disponible"
      ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
      : "bg-gradient-to-r from-red-400 to-red-500 text-white";
  };

  return (
    <tr className="hover:bg-purple-50 transition-all duration-200">
      {/* PRODUCT IMAGE */}
      <td className="px-8 py-5">
        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md bg-gray-100 relative">
          <Image
            src={product.image || "/placeholder-product.png"}
            alt={product.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder-product.png";
            }}
          />
        </div>
      </td>

      {/* NAME */}
      <td className="px-8 py-5">
        <span className="font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </span>
      </td>

      {/* PRICE */}
      <td className="px-8 py-5">
        <span className="font-bold text-[#8352a5] whitespace-nowrap">
          {product.price.toLocaleString()} FCFA
        </span>
      </td>

      {/* STOCK */}
      <td className="px-8 py-5">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg font-medium ${getStockStyle()}`}
        >
          <Package className="w-4 h-4" />
          {product.quantity} en stock
        </span>
      </td>

      {/* STATUS */}
      <td className="px-8 py-5">
        <span
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm ${getStatusStyle()}`}
        >
          <span
            className={`w-2 h-2 rounded-full bg-white ${
              product.status === "Disponible" ? "animate-pulse" : ""
            }`}
          />
          {product.status}
        </span>
      </td>

      {/* ACTIONS */}
      <td className="px-8 py-5">
        <div className="flex gap-2 justify-end">
          {/* Edit Button */}
          {onEdit && (
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all group"
              title="Modifier"
              aria-label={`Modifier ${product.name}`}
            >
              <Pencil className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          )}

          {/* View Button */}
          {onView && (
            <button
              onClick={() => onView(product)}
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-all group"
              title="Voir détails"
              aria-label={`Voir les détails de ${product.name}`}
            >
              <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
          )}

          {/* Delete Button */}
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all group"
            title="Supprimer"
            aria-label={`Supprimer ${product.name}`}
          >
            <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </td>
    </tr>
  );
}
