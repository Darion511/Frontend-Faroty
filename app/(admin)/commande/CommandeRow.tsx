import { Eye } from "lucide-react";
import { Order } from "@/app/types/order";

type Props = {
  commande: Order;
  onViewDetails: (commande: Order) => void;
};

export default function CommandeRow({ commande, onViewDetails }: Props) {
  const getStatutStyle = () => {
    switch (commande.status) {
      case "EN_ATTENTE":
        return "bg-green-100 text-green-700";
      case "LIVRE":
        return "bg-blue-100 text-blue-700";
      case "ANNULE":
        return "bg-orange-100 text-orange-700";
    }
  };

  const getPaiementStyle = () => {
    switch (commande.status) {
      case "EN_ATTENTE":
        return "bg-green-100 text-green-700";
      case "LIVRE":
        return "bg-blue-100 text-blue-700";
      case "ANNULE":
        return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <tr className="hover:bg-purple-50 transition-all">
      {/* <td className="px-6 py-4">
        <span className="font-semibold text-[#8352a5]">{commande.id}</span>
      </td> */}
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold text-gray-900">{commande.firstName}</p>
          <p className="text-sm text-gray-500">{commande.email}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-700">
          {commande.orderItems.length} article(s)
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="font-bold text-[#8352a5]">
          {commande.totalAmount.toLocaleString()} FCFA
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaiementStyle()}`}
        >
          {commande.status}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatutStyle()}`}
        >
          {commande.status}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600 text-sm">
        {new Date(commande.createdAt).toLocaleDateString("fr-FR")}
        <br />
        <span className="text-xs text-gray-500">
          {new Date(commande.createdAt).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => onViewDetails(commande)}
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
