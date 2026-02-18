import {
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  TrendingUp,
} from "lucide-react";
import { StatsPaiement } from "./types";

type Props = {
  stats: StatsPaiement;
};

export default function PaiementStats({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Montant total */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100 hover:shadow-xl transition-shadow col-span-1 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Montant Total Validé
            </p>
            <p className="text-4xl font-bold text-[#8352a5]">
              {stats.montantTotal.toLocaleString()} FCFA
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Sur {stats.totalPaiements} transaction(s)
            </p>
          </div>
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-[#8352a5]" />
          </div>
        </div>
      </div>

      {/* Total paiements */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Total Paiements
            </p>
            <p className="text-3xl font-bold text-blue-600">
              {stats.totalPaiements}
            </p>
          </div>
          <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
            <CreditCard className="w-7 h-7 text-blue-600" />
          </div>
        </div>
      </div>

      {/* En attente */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">En attente</p>
            <p className="text-3xl font-bold text-orange-600">
              {stats.enAttente}
            </p>
          </div>
          <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
            <Clock className="w-7 h-7 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Validés */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Validés</p>
            <p className="text-3xl font-bold text-green-600">{stats.valides}</p>
          </div>
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
        </div>
      </div>

      {/* Échoués */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-red-100 hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Échoués</p>
            <p className="text-3xl font-bold text-red-600">{stats.echoues}</p>
          </div>
          <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-7 h-7 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
