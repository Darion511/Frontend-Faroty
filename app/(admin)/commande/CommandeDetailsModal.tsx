"use client";

import {
  X,
  Clock,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Download,
  Printer,
} from "lucide-react";
import { useState } from "react";

import { modifyOrderStatus } from "@/app/services/orderService";
import { Order } from "@/app/types/order";

type Props = {
  commande: Order;
  onClose: () => void;
  onStatusChange: () => void;
};

export default function CommandeDetailsModal({
  commande,
  onClose,
  onStatusChange,
}: Props) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStatut, setCurrentStatut] = useState(commande.status);

  const handleStatusChange = async (
    newStatut: "EN_ATTENTE" | "LIVRE" | "ANNULE",
  ) => {
    if (!confirm(`Changer le statut vers "${newStatut}" ?`)) return;

    setIsUpdating(true);
    try {
      await modifyOrderStatus(commande.id, newStatut);
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

  const handlePrintInvoice = () => {
    alert("Impression de la facture...");
    // Logique d'impression
  };

  const handleDownloadInvoice = () => {
    alert("Téléchargement de la facture...");
    // Logique de téléchargement
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] px-6 py-5">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Détails de la Commande
              </h2>
              <p className="text-purple-100 text-sm">{commande.phone}</p>
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
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Colonne gauche - Informations client */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                  Informations Client
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#8352a5] to-[#6b3d8f] rounded-full flex items-center justify-center text-white font-bold">
                      {commande.firstName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {commande.lastName}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4" />
                        {commande.email}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4" />
                        {commande.phone}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t">
                    <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Adresse de livraison
                    </p>
                    <p className="text-sm text-gray-600">
                      {commande.deliveryAddress}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                  Informations de paiement
                </h3>
                {commande.payment ? (
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Méthode</span>
                      <span className="font-semibold text-gray-900 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        {
                          commande.payment[
                            commande.payment.length > 0
                              ? commande.payment.length - 1
                              : 0
                          ]?.paymentMethod
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Statut</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          commande.payment[
                            commande.payment.length > 0
                              ? commande.payment.length - 1
                              : 0
                          ]?.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : commande.payment[
                                  commande.payment.length > 0
                                    ? commande.payment.length - 1
                                    : 0
                                ]?.paymentStatus === "Pending"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {
                          commande.payment[
                            commande.payment.length > 0
                              ? commande.payment.length - 1
                              : 0
                          ]?.paymentStatus
                        }
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-sm font-semibold text-gray-700">
                        Montant total
                      </span>
                      <span className="text-xl font-bold text-[#8352a5]">
                        {commande.totalAmount.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                ) : (
                  <p>Pas encore payé</p>
                )}
              </div>

              {commande.id && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    Suivi
                  </h3>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <p className="text-sm text-blue-700 font-semibold mb-1">
                      Numéro de suivi
                    </p>
                    <p className="font-mono text-lg text-blue-900">
                      {commande.id}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Colonne droite - Produits et statut */}
            <div className="lg:col-span-2 space-y-6">
              {/* Produits */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                  Produits commandés ({commande.orderItems.length})
                </h3>
                <div className="space-y-3">
                  {commande.orderItems.map((produit) => (
                    <div
                      key={produit.id}
                      className="flex items-center gap-4 bg-gray-50 rounded-xl p-4"
                    >
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {produit.productName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantité: {produit.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#8352a5]">
                          {produit.price.toLocaleString()} FCFA
                        </p>
                        <p className="text-sm text-gray-600">
                          Sous-total:{" "}
                          {(produit.price * produit.quantity).toLocaleString()}{" "}
                          FCFA
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statut actuel */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                  Statut de la commande
                </h3>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  {currentStatut === "EN_ATTENTE" && (
                    <>
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <span className="text-lg font-semibold text-green-700">
                        Commande en attente de livraison
                      </span>
                    </>
                  )}
                  {currentStatut === "LIVRE" && (
                    <>
                      <Truck className="w-6 h-6 text-indigo-600" />
                      <span className="text-lg font-semibold text-indigo-700">
                        Commande Livrée
                      </span>
                    </>
                  )}
                  {currentStatut === "ANNULE" && (
                    <>
                      <XCircle className="w-6 h-6 text-red-600" />
                      <span className="text-lg font-semibold text-red-700">
                        Commande Annulée
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions de changement de statut */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                  Changer le statut
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <button
                    onClick={() => handleStatusChange("EN_ATTENTE")}
                    disabled={isUpdating || currentStatut === "EN_ATTENTE"}
                    className="p-4 border-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-50 hover:border-orange-500"
                  >
                    <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <span className="text-xs font-semibold">En attente</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange("LIVRE")}
                    disabled={isUpdating || currentStatut === "LIVRE"}
                    className="p-4 border-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-50 hover:border-green-500"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <span className="text-xs font-semibold">Livrée</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange("ANNULE")}
                    disabled={isUpdating || currentStatut === "ANNULE"}
                    className="p-4 border-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-50 hover:border-red-500"
                  >
                    <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    <span className="text-xs font-semibold">Annulée</span>
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                  Historique
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        Commande créée
                      </p>
                      <p className="text-xs text-gray-600">
                        {new Date(commande.createdAt).toLocaleString("fr-FR")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
          {/* <div className="flex gap-3">
            <button
              onClick={handlePrintInvoice}
              className="px-4 py-2 text-[#8352a5] hover:bg-purple-50 rounded-lg transition-all font-semibold flex items-center gap-2"
            >
              <Printer className="w-5 h-5" />
              Imprimer
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="px-4 py-2 text-[#8352a5] hover:bg-purple-50 rounded-lg transition-all font-semibold flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Télécharger
            </button>
          </div> */}

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
