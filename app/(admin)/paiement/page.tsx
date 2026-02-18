"use client";

import { useState, useEffect } from "react";
import Sidebar from "../homeA/navbarA";
import Topbar from "../homeA/Topbar";
import PaiementHeader from "./PaiementHeader";
import PaiementStats from "./PaiementStats";
import PaiementFilters from "./PaiementFilters";
import PaiementTable from "./PaiementTable";
import PaiementDetailsModal from "./PaiementDetailsModal";
import { Paiement, StatutPaiement, MethodePaiement } from "./types";

export default function PaiementPage() {
  const [paiements, setPaiements] = useState<Paiement[]>([]);
  const [filteredPaiements, setFilteredPaiements] = useState<Paiement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatut, setSelectedStatut] = useState<StatutPaiement | "Tous">(
    "Tous",
  );
  const [selectedMethode, setSelectedMethode] = useState<
    MethodePaiement | "Tous"
  >("Tous");
  const [selectedPaiement, setSelectedPaiement] = useState<Paiement | null>(
    null,
  );
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Charger les paiements
  const loadPaiements = async () => {
    try {
      setLoading(true);
      const data = await fetchPaiements();
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
      result = result.filter(
        (p) =>
          p.numeroTransaction.toLowerCase().includes(search.toLowerCase()) ||
          p.client.nom.toLowerCase().includes(search.toLowerCase()) ||
          p.commande.numero.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filtrer par statut
    if (selectedStatut !== "Tous") {
      result = result.filter((p) => p.statut === selectedStatut);
    }

    // Filtrer par méthode
    if (selectedMethode !== "Tous") {
      result = result.filter((p) => p.methode === selectedMethode);
    }

    setFilteredPaiements(result);
  }, [search, selectedStatut, selectedMethode, paiements]);

  const stats = calculateStats(paiements);

  const handleViewDetails = (paiement: Paiement) => {
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

          <PaiementStats stats={stats} />

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
