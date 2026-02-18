import { Package, TrendingUp, AlertCircle } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsSection({
  totalProducts,
  totalOrders,
  lowStockProducts,
}: {
  totalProducts: number;
  totalOrders: number;
  lowStockProducts: number;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
        value={totalOrders}
        icon={TrendingUp}
        iconColor="text-green-600"
        bgColor="bg-green-100"
        borderColor="border-green-100"
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
