import { Eye } from "lucide-react";

import { Order, Payment } from "@/app/types/order";
import { useEffect, useState } from "react";
import { getOrderById } from "@/app/services/orderService";

type Props = {
  paiement: Payment;
  onViewDetails: (paiement: Payment) => void;
};

export default function PaiementRow({ paiement, onViewDetails }: Props) {
  const getStatutStyle = () => {
    switch (paiement.paymentStatus) {
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Failed":
        return "bg-red-100 text-red-700";
    }
  };

  const getMethodeIcon = () => {
    switch (paiement.paymentMethod) {
      case "CASH":
      case "MOMO":
        return "📱";
      case "OM":
        return "📱";
      case "CARD":
        return "💳";
      case "PAYPAL":
        return "🏦";
      case "FAROTY":
        return "💵";
    }
  };

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrderData = async () => {
      if (!paiement.orderId) return;

      try {
        setLoading(true);

        // Charger le produit
        const orderData = await getOrderById(paiement.orderId);
        if (orderData && !Array.isArray(orderData)) {
          setOrder(orderData);
        }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
        setOrder(null);
      } finally {
        setLoading(false);
      }
    };

    loadOrderData();
  }, [paiement.orderId]);

  return (
    <tr className="hover:bg-purple-50 transition-all">
      <td className="px-6 py-4">
        <span className="font-semibold text-[#8352a5]">{paiement.id}</span>
      </td>
      <td className="px-6 py-4">
        <span className="font-medium text-gray-900">{paiement.orderId}</span>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold text-gray-900">
            {order ? order.firstName + " " + order.lastName : "user"}
          </p>
          <p className="text-sm text-gray-500">{order?.email}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-bold text-[#8352a5]">
          {paiement.amount.toLocaleString()} FCFA
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-2 text-sm font-medium">
          <span>{getMethodeIcon()}</span>
          {paiement.paymentMethod}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatutStyle()}`}
        >
          {paiement.paymentStatus}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600 text-sm">
        {new Date(paiement.createdAt).toLocaleDateString("fr-FR")}
        <br />
        <span className="text-xs text-gray-500">
          {new Date(paiement.createdAt).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => onViewDetails(paiement)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Voir détails"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
