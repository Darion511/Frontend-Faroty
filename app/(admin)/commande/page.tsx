// OrdersPage.tsx
"use client";

import { useState } from "react";
import Sidebar from "../homeA/navbarA";
import Topbar from "../homeA/Topbar";

import {
  filterOrdersByDate,
  searchOrders,
  FilterType,
} from "../utils/orderFilters";
import OrdersHeader from "./OrdersHeader";
import OrdersStats from "./OrdersStats";
import SearchAndFilters from "./SearchAndFilters";
import OrdersTable from "./OrdersTable";

export default function OrdersPage() {
  const [filter, setFilter] = useState<FilterType>("jour");
  const [search, setSearch] = useState("");

  // Filtrer par date puis par recherche

  const filteredOrders = searchOrders(dateFilteredOrders, search);

  return (
    <div className="flex max-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="w-8/10  max-h-screen overflow-auto flex-1">
        <Topbar />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* HEADER */}
          <OrdersHeader />

          {/* STATISTICS */}
          <OrdersStats orders={filteredOrders} />

          {/* SEARCH AND FILTERS */}
          <SearchAndFilters
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
          />

          {/* ORDERS TABLE */}
          <OrdersTable
            orders={filteredOrders}
            totalOrders={ordersData.length}
          />
        </main>
      </div>
    </div>
  );
}
