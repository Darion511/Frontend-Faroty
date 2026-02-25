"use client";

import Sidebar from "../homeA/navbarA";
import Topbar from "../homeA/Topbar";
import DashboardHeader from "./DashboardHeader";
import MessagesPreview from "./MessagesPreview";
import OrdersPreview from "./OrdersPreview";
import ProductsPreview from "./ProductsPreview";
import SalesChart from "./SalesChart";
import StatsSection from "./StatsSection";
import RevenueChart from "./RevenueChart";
import OrdersStatusChart from "./OrdersStatusChart";

import { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import { getAllProducts } from "@/app/services/productService";
import { Order } from "@/app/types/order";
import { getAllOrders } from "@/app/services/orderService";
import { statistics } from "@/app/types/statistics";
import { getStatistics } from "@/app/services/statisticsService";
import { requireAuth } from "@/app/services/headersHelpers";

// ✅ Valeurs par défaut pour éviter les undefined
const defaultStats: statistics = {
  byPeriod: [],
  summary: {
    totalOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
  },
};

export default function DashboardPage() {
  requireAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [fullOrders, setFullOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<statistics>(defaultStats); // ✅ Initialisé avec defaultStats
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errorOrders, setErrorOrders] = useState<string | null>(null);

  // Chargement des produits
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoadingProducts(true);
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, []);

  // Chargement des commandes
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoadingOrders(true);
        setErrorOrders(null);
        const data = await getAllOrders();

        const recentOrders = Array.isArray(data)
          ? data
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .slice(0, 5)
          : [];
        setFullOrders(Array.isArray(data) ? data : []);
        setOrders(recentOrders);
      } catch (err) {
        console.error("Erreur lors du chargement des commandes:", err);
        setErrorOrders("Impossible de charger les commandes");
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };

    loadOrders();
  }, []);

  // Chargement des statistiques
  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoadingStats(true);

        // ✅ getStatistics() retourne directement les données (pas une Response)
        const data: statistics = await getStatistics();

        setStats({
          byPeriod: Array.isArray(data?.byPeriod) ? data.byPeriod : [],
          summary: data?.summary ?? defaultStats.summary,
        });
      } catch (err) {
        console.error("Erreur lors du chargement des statistiques:", err);
        setStats(defaultStats);
      } finally {
        setLoadingStats(false);
      }
    };

    loadStats();
  }, []);

  // ✅ État de chargement global
  const isLoading = loadingProducts || loadingOrders || loadingStats;

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8352a5] mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">
              Chargement du tableau de bord...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="w-8/10 max-h-screen overflow-auto flex-1">
        {/* TOPBAR */}
        <Topbar />

        {/* MAIN CONTENT */}
        <main className="p-8 space-y-6">
          {/* HEADER */}
          <DashboardHeader />

          {/* STATISTICS */}
          <StatsSection
            totalProducts={products.length}
            totalOrders={fullOrders.length}
            totalRevenue={stats.summary.totalRevenue}
            lowStockProducts={
              products.filter((p) => p.quantity - p.pending === 0).length
            }
          />

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart data={stats.byPeriod} />
            <SalesChart data={stats.byPeriod} />
          </div>

          {/* <OrdersStatusChart summary={stats.summary} /> */}

          {/* PREVIEWS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductsPreview />
            <OrdersPreview
              orders={orders}
              loading={loadingOrders}
              error={errorOrders}
            />
          </div>

          {/* MESSAGES */}
          <MessagesPreview />
        </main>
      </div>
    </div>
  );
}
