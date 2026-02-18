import { Package, ShoppingCart, CreditCard, AlertTriangle } from "lucide-react";
import StatCard from "../produitA/StatCard";

export default function StatsSection({
  totalProducts,
  totalOrders,
  totalRevenue,
  lowStockProducts,
}: {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: number;
}) {
  const stats = [
    {
      title: "Produits",
      value: totalProducts,
      icon: Package,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-100",
      trend: { value: "+12%", isPositive: true },
    },
    {
      title: "Commandes",
      value: totalOrders,
      icon: ShoppingCart,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-100",
      trend: { value: "+8%", isPositive: true },
    },
    {
      title: "Revenus",
      value: totalRevenue,
      icon: CreditCard,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-green-100",
      trend: { value: "+23%", isPositive: true },
    },
    {
      title: "Rupture de stock",
      value: lowStockProducts,
      icon: AlertTriangle,
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
      borderColor: "border-red-100",
      trend: { value: "-2", isPositive: true },
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconColor={stat.iconColor}
          bgColor={stat.bgColor}
          borderColor={stat.borderColor}
          trend={stat.trend}
        />
      ))}
    </div>
  );
}
