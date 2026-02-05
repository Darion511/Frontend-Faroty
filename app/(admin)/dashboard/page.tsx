import { Package, ShoppingCart, CreditCard } from "lucide-react";
import StatCard from "./StatCard";
import Sidebar from "../homeA/navbarA";
import OrdersChart from "../OrdersChart";
import CategoryChart from "../CategoryChart";
import Topbar from "../homeA/Topbar";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg">
        <Sidebar />
      </aside>

      {/* ZONE DROITE */}
      <div className="flex flex-col flex-1">
        {/* TOPBAR */}
        <header className="h-16 bg-white shadow flex items-center px-6">
          <Topbar />
        </header>

        {/* CONTENU PRINCIPAL */}
        <main className="flex-1 p-6">
          {/* TITRE */}
          <h1 className="text-2xl font-bold text-[#8352a5] mb-8">
            Tableau de bord
          </h1>

          {/* CARTES STATISTIQUES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              title="Produits"
              value="120"
              icon={<Package className="text-[#8352a5]" />}
            />

            <StatCard
              title="Commandes"
              value="56"
              icon={<ShoppingCart className="text-[#8352a5]" />}
            />

            <StatCard
              title="Paiements"
              value="1 250 000 FCFA"
              icon={<CreditCard className="text-[#8352a5]" />}
            />
          </div>

          {/* GRAPHIQUES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
            <OrdersChart />
            <CategoryChart />
          </div>
        </main>
      </div>
    </div>
  );
}
