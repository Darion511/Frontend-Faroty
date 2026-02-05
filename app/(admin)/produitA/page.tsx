import ProductsFilters from "../components/ProductsFilters";
import ProductsStats from "../components/ProductsStats";
import ProductsTable from "../components/ProductsTable";
import Sidebar from "../homeA/navbarA";

export default function ProduitsPage() {
  return (
    <section className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-md">
        <Sidebar />
      </aside>
      <div className="flex-1 p-6 space-y-6">
        <h1 className="text-2xl font-bold text-[#8352a5]">
          Gestion des produits
        </h1>

        {/* Filtres */}
        <ProductsFilters />

        {/* Statistiques */}
        <ProductsStats />

        {/* Liste des produits */}
        <ProductsTable />
      </div>
    </section>
  );
}
