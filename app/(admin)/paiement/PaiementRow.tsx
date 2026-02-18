import { Eye } from "lucide-react";
import { Paiement } from "./types";

type Props = {
  paiement: Paiement;
  onViewDetails: (paiement: Paiement) => void;
};

export default function PaiementRow({ paiement, onViewDetails }: Props) {
  const getStatutStyle = () => {
    switch (paiement.statut) {
      case "Validé":
        return "bg-green-100 text-green-700";
      case "En attente":
        return "bg-orange-100 text-orange-700";
      case "Échoué":
        return "bg-red-100 text-red-700";
      case "Remboursé":
        return "bg-blue-100 text-blue-700";
    }
  };

  const getMethodeIcon = () => {
    switch (paiement.methode) {
      case "Mobile Money":
      case "Orange Money":
        return "📱";
      case "Carte bancaire":
        return "💳";
      case "Espèces":
        return "💵";
      case "paypal":
        return "🏦";
    }
  };

  return (
    <tr className="hover:bg-purple-50 transition-all">
      <td className="px-6 py-4">
        <span className="font-semibold text-[#8352a5]">
          {paiement.numeroTransaction}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="font-medium text-gray-900">
          {paiement.commande.numero}
        </span>
      </td>
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold text-gray-900">{paiement.client.nom}</p>
          <p className="text-sm text-gray-500">{paiement.client.email}</p>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="font-bold text-[#8352a5]">
          {paiement.montant.toLocaleString()} FCFA
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-2 text-sm font-medium">
          <span>{getMethodeIcon()}</span>
          {paiement.methode}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatutStyle()}`}
        >
          {paiement.statut}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-600 text-sm">
        {new Date(paiement.date).toLocaleDateString("fr-FR")}
        <br />
        <span className="text-xs text-gray-500">
          {new Date(paiement.date).toLocaleTimeString("fr-FR", {
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
