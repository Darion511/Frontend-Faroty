import { Package, TrendingUp, AlertCircle } from "lucide-react";
import StatCard from "./StatCard";
type Props = {
  totalProducts: number;
  availableProducts: number;
  totalStock: number;
  lowStockProducts: number;
};

export default function StatsSection({
  totalProducts,
  availableProducts,
  totalStock,
  lowStockProducts,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard
        title="Total Produits"
        value={totalProducts}
        icon={Package}
        iconColor="text-purple-600"
        bgColor="bg-purple-100"
        borderColor="border-purple-100"
      />

      <StatCard
        title="Disponibles"
        value={availableProducts}
        icon={TrendingUp}
        iconColor="text-green-600"
        bgColor="bg-green-100"
        borderColor="border-green-100"
      />

      <StatCard
        title="Stock Total"
        value={totalStock}
        icon={() => (
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
        )}
        iconColor="text-blue-600"
        bgColor="bg-blue-100"
        borderColor="border-blue-100"
      />

      <StatCard
        title="Stock Faible"
        value={lowStockProducts}
        icon={AlertCircle}
        iconColor="text-orange-600"
        bgColor="bg-orange-100"
        borderColor="border-orange-100"
      />
    </div>
  );
}
