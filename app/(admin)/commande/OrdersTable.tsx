import { ShoppingBag } from "lucide-react";

import OrderTableRow from "./OrderTableRow";
import { Order } from "../types/Order";

type Props = {
  orders: Order[];
  totalOrders: number;
};

export default function OrdersTable({ orders, totalOrders }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f]">
            <tr>
              <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Image
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-white  uppercase tracking-wider">
                Produit
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Client
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Téléphone
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Quantité
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">
                Statut
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order) => (
                <OrderTableRow key={order.id} order={order} />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-16">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                      <ShoppingBag className="w-10 h-10 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-lg mb-1">
                        Aucune commande trouvée
                      </p>
                      <p className="text-gray-500">
                        Aucune commande ne correspond à vos critères
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {orders.length > 0 && (
        <div className="bg-gray-50 px-8 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Affichage de <span className="font-semibold">1</span> à{" "}
            <span className="font-semibold">{orders.length}</span> sur{" "}
            <span className="font-semibold">{totalOrders}</span> commandes
          </div>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Précédent
            </button>
            <button
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
