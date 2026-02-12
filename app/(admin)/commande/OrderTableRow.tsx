import Image from "next/image";

import { Mail, Phone, Package } from "lucide-react";
import { Order } from "../types/Order";

type Props = {
  order: Order;
};

export default function OrderTableRow({ order }: Props) {
  return (
    <tr className="hover:bg-purple-50 transition-all duration-200">
      {/* IMAGE */}
      <td className="px-8 py-5">
        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md bg-gray-100">
          <Image
            src={order.image}
            alt={order.produit}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
      </td>

      {/* PRODUIT */}
      <td className="px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#8352a5] to-[#6b3d8f] rounded-lg flex items-center justify-center text-white font-bold">
            <Package className="w-5 h-5" />
          </div>
          <span className="font-semibold text-gray-900">{order.produit}</span>
        </div>
      </td>

      {/* CLIENT */}
      <td className="px-8 py-5">
        <span className="font-medium text-gray-900">{order.client}</span>
      </td>

      {/* EMAIL */}
      <td className="px-8 py-5">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4 text-[#8352a5]" />
          <span className="text-sm">{order.email}</span>
        </div>
      </td>

      {/* TÉLÉPHONE */}
      <td className="px-8 py-5">
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4 text-[#8352a5]" />
          <span className="text-sm">{order.tel}</span>
        </div>
      </td>

      {/* QUANTITÉ */}
      <td className="px-8 py-5">
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-semibold">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
          {order.quantite}
        </span>
      </td>

      {/* STATUT */}
      <td className="px-8 py-5">
        <span
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-sm ${
            order.statut === "paye"
              ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
              : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full bg-white ${
              order.statut === "paye" ? "animate-pulse" : ""
            }`}
          ></span>
          {order.statut === "paye" ? "PAYÉ" : "EN ATTENTE"}
        </span>
      </td>
    </tr>
  );
}
