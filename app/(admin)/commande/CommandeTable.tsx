import { Order } from "@/app/types/order";
import CommandeRow from "./CommandeRow";

type Props = {
  commandes: Order[];
  onViewDetails: (commande: Order) => void;
  onRefresh: () => void;
};

export default function CommandeTable({
  commandes = [], // 👈 Valeur par défaut
  onViewDetails,
  onRefresh,
}: Props) {
  // Vérification supplémentaire
  if (!commandes) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f]">
            <tr>
              {/* <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                N° Commande
              </th> */}
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                Client
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                Produits
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                Montant
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase">
                Paiement
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
            {commandes.length > 0 ? (
              commandes.map((commande) => (
                <CommandeRow
                  key={commande.identifiant}
                  commande={commande}
                  onViewDetails={onViewDetails}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-16">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-lg mb-1">
                        Aucune commande trouvée
                      </p>
                      <p className="text-gray-500">
                        Essayez de modifier vos critères de recherche
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {commandes.length > 0 && (
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t">
          <span className="text-sm text-gray-700">
            Affichage de {commandes.length} commande(s)
          </span>
        </div>
      )}
    </div>
  );
}
