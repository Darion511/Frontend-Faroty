import { Search } from "lucide-react";
import { StatutPaiement, MethodePaiement } from "./types";
import { PaymentMethod, PaymentStatus } from "@/app/types/order";

type Props = {
  search: string;
  setSearch: (value: string) => void;
  selectedStatut: PaymentStatus | "Tous";
  setSelectedStatut: (value: PaymentStatus | "Tous") => void;
  selectedMethode: PaymentMethod | "Tous";
  setSelectedMethode: (value: PaymentMethod | "Tous") => void;
};

export default function PaiementFilters({
  search,
  setSearch,
  selectedStatut,
  setSelectedStatut,
  selectedMethode,
  setSelectedMethode,
}: Props) {
  const statuts: (PaymentStatus | "Tous")[] = [
    "Tous",
    "Paid" ,
    "Pending" ,
    "Failed",
  ];

  const methodes: (PaymentMethod | "Tous")[] = [
    "Tous",
    "CASH",
    "MOBILE_MONEY",
    "CARTE_BANCAIRE",
    "PAYPAL",
    "STRIPE",
    "FAROTY",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Recherche */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par transaction, client ou commande..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8352a5] focus:border-transparent transition-all"
          />
        </div>

        {/* Filtre Statut */}
        <select
          value={selectedStatut}
          onChange={(e) =>
            setSelectedStatut(e.target.value as PaymentStatus | "Tous")
          }
          className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8352a5] bg-white"
        >
          {statuts.map((statut) => (
            <option key={statut} value={statut}>
              {statut === "Tous" ? "Tous les statuts" : statut}
            </option>
          ))}
        </select>

        {/* Filtre Méthode */}
        <select
          value={selectedMethode}
          onChange={(e) =>
            setSelectedMethode(e.target.value as PaymentMethod | "Tous")
          }
          className="px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8352a5] bg-white"
        >
          {methodes.map((methode) => (
            <option key={methode} value={methode}>
              {methode === "Tous" ? "Toutes les méthodes" : methode}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
