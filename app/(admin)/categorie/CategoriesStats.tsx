import { Tag, CheckCircle, Package } from "lucide-react";

type Props = {
  totalCategories: number;
  activeCategories: number;
  totalProducts: number;
};

export default function CategoriesStats({
  totalCategories,
  activeCategories,
  totalProducts,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Catégories */}
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
            <Tag className="w-7 h-7 text-[#8352a5]" />
          </div>
        </div>
      </div>

      {/* Catégories Actives */}
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
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
        </div>
      </div>

      {/* Total Produits */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Total Produits
            </p>
            <p className="text-3xl font-bold text-blue-600">{totalProducts}</p>
          </div>
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
            <Package className="w-7 h-7 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
