"use client";

import { useState, useEffect } from "react";
import Sidebar from "../homeA/navbarA";
import Topbar from "../homeA/Topbar";
import CommandeHeader from "./CommandeHeader";
import CommandeStats from "./CommandeStats";
// import CommandeFilters from "./CommandeFilters";
import CommandeTable from "./CommandeTable";
import CommandeDetailsModal from "./CommandeDetailsModal";
import { Order } from "@/app/types/order";
import { getAllOrders } from "@/app/services/orderService";
import { FilterType } from "../utils/orderFilters";
import { requireAuth } from "@/app/services/headersHelpers";
// import { Commande, StatutCommande } from "./types";
// import { fetchCommandes, calculateStats } from "../data/commandesData";

export default function CommandePage() {
  requireAuth();

  const [commandes, setCommandes] = useState<Order[]>([]); // 👈 Initialisation avec []
  const [filteredCommandes, setFilteredCommandes] = useState<Order[]>([]); // 👈 Initialisation avec []
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatut, setSelectedStatut] = useState<FilterType>("jour");
  const [selectedCommande, setSelectedCommande] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Charger les commandes
  const loadCommandes = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      // 👇 Vérification que data est bien un tableau
      setCommandes(Array.isArray(data) ? data : []);
      setFilteredCommandes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erreur:", error);
      setCommandes([]); // 👈 En cas d'erreur, tableau vide
      setFilteredCommandes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCommandes();
  }, []);

  // Filtrage
  useEffect(() => {
    let result = [...commandes]; // 👈 Créer une copie

    // Filtrer par recherche
    if (search) {
      result = result.filter(
        (c) =>
          c.phone.toLowerCase().includes(search.toLowerCase()) ||
          c.firstName.toLowerCase().includes(search.toLowerCase()) ||
          c.lastName.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filtrer par statut
    // if (selectedStatut !== "Tous") {
    //   result = result.filter((c) => c.status === selectedStatut);
    // }

    setFilteredCommandes(result);
  }, [search, selectedStatut, commandes]);

  // const stats = calculateStats(commandes);

  const handleViewDetails = (commande: Order) => {
    setSelectedCommande(commande);
    setShowDetailsModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des commandes...</p>
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
          <CommandeHeader />

          <CommandeStats orders={commandes} />

          {/* <CommandeFilters
            search={search}
            setSearch={setSearch}
            filter={selectedStatut}
            setFilter={setSelectedStatut}
          /> */}

          <CommandeTable
            commandes={filteredCommandes}
            onViewDetails={handleViewDetails}
            onRefresh={loadCommandes}
          />
        </main>
      </div>

      {showDetailsModal && selectedCommande && (
        <CommandeDetailsModal
          commande={selectedCommande}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedCommande(null);
          }}
          onStatusChange={loadCommandes}
        />
      )}
    </div>
  );
}
