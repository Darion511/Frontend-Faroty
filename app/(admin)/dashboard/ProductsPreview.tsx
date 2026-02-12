import { Package, ArrowRight, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Product } from "../types/product";

export default function ProductsPreview({ products }: { products: Product[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8352a5] rounded-full flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Top Produits</h2>
            <p className="text-sm text-gray-500">Meilleurs ventes du mois</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-[#8352a5] hover:bg-purple-50 rounded-lg transition-colors font-semibold text-sm">
          Voir tout
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-purple-50 transition-all cursor-pointer group"
          >
            {/* Rank */}
            <div className="w-8 h-8 bg-gradient-to-br from-[#8352a5] to-[#6b3d8f] rounded-full flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </div>

            {/* Image */}
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={product.image || "/placeholder-product.png"}
                alt={product.name}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-[#8352a5] transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.sales} ventes</p>
            </div>

            {/* Stock & Trend */}
            <div className="flex flex-col items-end gap-1">
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  product.stock < 5 ? "text-red-600" : "text-gray-500"
                }`}
              >
                {product.stock < 5 && <AlertCircle className="w-3 h-3" />}
                Stock: {product.stock}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
