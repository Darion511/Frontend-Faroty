import { Paiement } from "./types";
import PaiementRow from "./PaiementRow";

type Props = {
  paiements: Paiement[];
  onViewDetails: (paiement: Paiement) => void;
  onRefresh: () => void;
};

export default function PaiementTable({
  paiements,
  onViewDetails,
  onRefresh,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                Transaction
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                Commande
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                Client
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                Montant
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                Méthode
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                Date
              </th>
              <th className="px-6 py-4 text-right text-sm font-bold text-white uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paiements.length > 0 ? (
              paiements.map((paiement) => (
                <PaiementRow
                  key={paiement.id}
                  paiement={paiement}
                  onViewDetails={onViewDetails}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-16">
                  <p className="text-gray-500">Aucun paiement trouvé</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {paiements.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
          <span className="text-sm text-gray-700">
            Affichage de {paiements.length} paiement(s)
          </span>
        </div>
      )}
    </div>
  );
}
