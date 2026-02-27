"use client";

import { useState, useEffect } from "react";
import Sidebar from "../homeA/navbarA";
import Topbar from "../homeA/Topbar";
import PaiementHeader from "./PaiementHeader";
// import PaiementStats from "./PaiementStats";
import PaiementFilters from "./PaiementFilters";
import PaiementTable from "./PaiementTable";
import PaiementDetailsModal from "./PaiementDetailsModal";

import { getAllPayment } from "@/app/services/paymentService";
import { Payment, PaymentMethod, PaymentStatus } from "@/app/types/order";
import { requireAuth } from "@/app/services/headersHelpers";

export default function PaiementPage() {
  const [paiements, setPaiements] = useState<Payment[]>([]);
  const [filteredPaiements, setFilteredPaiements] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatut, setSelectedStatut] = useState<PaymentStatus | "Tous">(
    "Tous",
  );
  const [selectedMethode, setSelectedMethode] = useState<
    PaymentMethod | "Tous"
  >("Tous");
  const [selectedPaiement, setSelectedPaiement] = useState<Payment | null>(
    null,
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Charger les paiements
  const loadPaiements = async () => {
    requireAuth();
    try {
      setLoading(true);
      const data = await getAllPayment();
      setPaiements(data);
      setFilteredPaiements(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPaiements();
  }, []);

  // Filtrage
  useEffect(() => {
    let result = paiements;

    // Filtrer par recherche
    if (search) {
      result = result.filter((p) =>
        p.identifiant.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filtrer par statut
    if (selectedStatut !== "Tous") {
      result = result.filter((p) => p.paymentStatus === selectedStatut);
    }

    // Filtrer par méthode
    if (selectedMethode !== "Tous") {
      result = result.filter((p) => p.paymentMethod === selectedMethode);
    }

    setFilteredPaiements(result);
  }, [search, selectedStatut, selectedMethode, paiements]);

  // const stats = calculateStats(paiements);

  const handleViewDetails = (paiement: Payment) => {
    setSelectedPaiement(paiement);
    setShowDetailsModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des paiements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Sidebar />

      <div className="w-8/10 max-h-screen overflow-auto flex-1">
        <Topbar />

        <main className="p-8 space-y-6">
          <PaiementHeader />

          {/* <PaiementStats stats={stats} /> */}

          <PaiementFilters
            search={search}
            setSearch={setSearch}
            selectedStatut={selectedStatut}
            setSelectedStatut={setSelectedStatut}
            selectedMethode={selectedMethode}
            setSelectedMethode={setSelectedMethode}
          />

          <PaiementTable
            paiements={filteredPaiements}
            onViewDetails={handleViewDetails}
            onRefresh={loadPaiements}
          />
        </main>
      </div>

      {showDetailsModal && selectedPaiement && (
        <PaiementDetailsModal
          paiement={selectedPaiement}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedPaiement(null);
          }}
          onStatusChange={loadPaiements}
        />
      )}
    </div>
  );
}
