import { ShoppingCart, ArrowRight, Clock, CheckCircle } from "lucide-react";

export default function OrdersPreview() {
  const recentOrders = [
    {
      id: "#CMD-001",
      customer: "Jean Dupont",
      product: "T-shirt Premium",
      amount: "25 000 FCFA",
      status: "paye",
      time: "Il y a 2h",
    },
    {
      id: "#CMD-002",
      customer: "Alice Mbock",
      product: "Casquette Faroty",
      amount: "15 000 FCFA",
      status: "en attente",
      time: "Il y a 4h",
    },
    {
      id: "#CMD-003",
      customer: "Paul Kamga",
      product: "Chaussure Nike",
      amount: "45 000 FCFA",
      status: "paye",
      time: "Il y a 6h",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Commandes récentes
            </h2>
            <p className="text-sm text-gray-500">Dernières transactions</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-semibold text-sm">
          Voir tout
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-50 transition-all cursor-pointer border border-gray-100 group"
          >
            {/* Status Icon */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                order.status === "paye"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              {order.status === "paye" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <Clock className="w-5 h-5" />
              )}
            </div>

            {/* Order Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {order.id}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                    order.status === "paye"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status === "paye" ? "Payé" : "En attente"}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">{order.customer}</p>
              <p className="text-xs text-gray-500">{order.product}</p>
            </div>

            {/* Amount & Time */}
            <div className="text-right">
              <p className="font-bold text-gray-900">{order.amount}</p>
              <p className="text-xs text-gray-500 mt-1">{order.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total aujourdhui</span>
          <span className="text-lg font-bold text-gray-900">85 000 FCFA</span>
        </div>
      </div>
    </div>
  );
}
