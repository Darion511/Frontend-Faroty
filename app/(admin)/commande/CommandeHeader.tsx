import { ShoppingBag, Download } from "lucide-react";

export default function CommandeHeader() {
  const handleExport = () => {
    alert("Exportation des commandes en cours...");
    // Logique d'exportation CSV/Excel
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] bg-clip-text text-transparent mb-2 flex items-center gap-3">
          <ShoppingBag className="w-10 h-10 text-[#8352a5]" />
          Gestion des Commandes
        </h1>
        <p className="text-gray-600">
          Suivez et gérez toutes les commandes de vos clients
        </p>
      </div>

      <button
        onClick={handleExport}
        className="px-6 py-3 bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] text-white rounded-xl hover:from-[#6b3d8f] hover:to-[#5a2c7a] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center gap-2"
      >
        <Download className="w-5 h-5" />
        Exporter
      </button>
    </div>
  );
}
