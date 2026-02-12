"use client";

import Sidebar from "../homeA/navbarA";
import Topbar from "../homeA/Topbar";
import DashboardHeader from "./DashboardHeader";
import MessagesPreview from "./MessagesPreview";
import OrdersPreview from "./OrdersPreview";
import ProductsPreview from "./ProductsPreview";
import SalesChart from "./SalesChart";
import StatsSection from "./StatsSection";
import { getAllProducts } from "../data/productsData";

import { useState } from "react";
import { Product } from "../types/product";
import { products } from "@/app/(users)/components/data/products";

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]); // 👈 Initialisation avec []
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      // 👇 Vérification que data est bien un tableau
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setProducts([]); // 👈 En cas d'erreur, mettre un tableau vide
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="w-8/10  max-h-screen overflow-auto flex-1">
        {/* TOPBAR */}
        <Topbar />

        {/* MAIN CONTENT */}
        <main className="p-8 space-y-6 ">
          {/* HEADER */}
          <DashboardHeader />

          {/* STATISTICS */}
          <StatsSection />

          {/* SALES CHART */}
          <SalesChart />

          {/* PREVIEWS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductsPreview products={products} />
            <OrdersPreview />
          </div>

          {/* MESSAGES */}
          <MessagesPreview />
        </main>
      </div>
    </div>
  );
}
