import { ShoppingBag, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Order } from "../types/Order";

type Props = {
  orders: Order[];
};

export default function OrdersStats({ orders }: Props) {
  const totalOrders = orders.length;
  const paidOrders = orders.filter((o) => o.statut === "paye").length;
  const pendingOrders = orders.filter((o) => o.statut === "en attente").length;
  const totalQuantity = orders.reduce((sum, o) => sum + o.quantite, 0);

  const stats = [
    {
      title: "Total Commandes",
      value: totalOrders,
      icon: ShoppingBag,
      color: "purple",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      borderColor: "border-purple-100",
    },
    {
      title: "Payées",
      value: paidOrders,
      icon: CheckCircle,
      color: "green",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      borderColor: "border-green-100",
    },
    {
      title: "En Attente",
      value: pendingOrders,
      icon: Clock,
      color: "orange",
      bgColor: "bg-orange-100",
      textColor: "text-orange-600",
      borderColor: "border-orange-100",
    },
    {
      title: "Articles Vendus",
      value: totalQuantity,
      icon: TrendingUp,
      color: "blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      borderColor: "border-blue-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`bg-white rounded-2xl shadow-lg p-6 border ${stat.borderColor} hover:shadow-xl transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </p>
              <p className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
              </p>
            </div>
            <div
              className={`w-14 h-14 ${stat.bgColor} rounded-full flex items-center justify-center`}
            >
              <stat.icon className={`w-7 h-7 ${stat.textColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
