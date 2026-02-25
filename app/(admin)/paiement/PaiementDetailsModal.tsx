"use client";

import {
  X,
  CheckCircle,
  XCircle,
  Clock,
  RotateCcw,
  Download,
} from "lucide-react";
import { useState } from "react";

import { modifyPaymentStatus } from "@/app/services/paymentService";
import { Payment, PaymentStatus } from "@/app/types/order";

type Props = {
  paiement: Payment;
  onClose: () => void;
  onStatusChange: () => void;
};

export default function PaiementDetailsModal({
  paiement,
  onClose,
  onStatusChange,
}: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatut, setCurrentStatut] = useState(paiement.paymentStatus);

  const handleStatusChange = async (newStatut: PaymentStatus) => {
    if (!confirm(`Changer le statut vers "${newStatut}" ?`)) return;

    setIsUpdating(true);
    try {
      await modifyPaymentStatus(paiement.id, newStatut);
      setCurrentStatut(newStatut);
      onStatusChange();
      alert("Statut mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la mise à jour");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDownloadReceipt = () => {
    alert("Téléchargement du reçu...");
    // Logique de téléchargement
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] px-6 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Détails du Paiement
              </h2>
              <p className="text-purple-100 text-sm">{paiement.id}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Informations principales */}
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Informations de paiement
              </h3>
              <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                <div>
                  <p className="text-sm text-gray-600">Montant</p>
                  <p className="text-2xl font-bold text-[#8352a5]">
                    {paiement.amount.toLocaleString()} FCFA
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Méthode</p>
                  <p className="font-semibold text-gray-900">
                    {paiement.paymentMethod}
                  </p>
                </div>
                {/* {paiement.reference && (
                  <div>
                    <p className="text-sm text-gray-600">Référence</p>
                    <p className="font-mono text-sm text-gray-900">
                      {paiement.reference}
                    </p>
                  </div>
                )} */}
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(paiement.createdAt).toLocaleString("fr-FR")}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Informations client
              </h3>
              <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
                {/* <div>
                  <p className="text-sm text-gray-600">Nom</p>
                  <p className="font-semibold text-gray-900">
                    {paiement.client.nom}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-sm text-gray-900">
                    {paiement.client.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Téléphone</p>
                  <p className="text-sm text-gray-900">
                    {paiement.client.telephone}
                  </p>
                </div> */}
                <div>
                  <p className="text-sm text-gray-600">Commande</p>
                  <p className="font-semibold text-[#8352a5]">
                    {paiement.orderId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statut actuel */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
              Statut actuel
            </h3>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              {currentStatut === "Paid" && (
                <>
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-lg font-semibold text-green-700">
                    Paiement Validé
                  </span>
                </>
              )}
              {currentStatut === "Pending" && (
                <>
                  <Clock className="w-6 h-6 text-orange-600" />
                  <span className="text-lg font-semibold text-orange-700">
                    En attente de validation
                  </span>
                </>
              )}
              {currentStatut === "Failed" && (
                <>
                  <XCircle className="w-6 h-6 text-red-600" />
                  <span className="text-lg font-semibold text-red-700">
                    Paiement Échoué
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Notes */}
          {/* {paiement.notes && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Notes
              </h3>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <p className="text-sm text-gray-700">{paiement.notes}</p>
              </div>
            </div>
          )} */}

          {/* Actions de changement de statut */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
              Changer le statut
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => handleStatusChange("Paid")}
                disabled={isUpdating || currentStatut === "Paid"}
                className="p-4 border-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-50 hover:border-green-500"
              >
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-semibold">Valider</span>
              </button>

              <button
                onClick={() => handleStatusChange("Pending")}
                disabled={isUpdating || currentStatut === "Pending"}
                className="p-4 border-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-500"
              >
                <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <span className="text-sm font-semibold">En attente</span>
              </button>

              <button
                onClick={() => handleStatusChange("Failed")}
                disabled={isUpdating || currentStatut === "Failed"}
                className="p-4 border-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50 hover:border-red-500"
              >
                <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <span className="text-sm font-semibold">Échoué</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
          <button
            onClick={handleDownloadReceipt}
            className="px-4 py-2 text-[#8352a5] hover:bg-purple-50 rounded-lg transition-all font-semibold flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Télécharger le reçu
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl font-semibold transition-all"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
