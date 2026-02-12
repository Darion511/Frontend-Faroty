import { Plus } from "lucide-react";

type Props = {
  onAddClick: () => void;
};

export default function PageHeader({ onAddClick }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] bg-clip-text text-transparent mb-2">
          Gestion des produits
        </h1>
        <p className="text-gray-600">
          Gérez votre catalogue et vos stocks en temps réel
        </p>
      </div>

      <button
        onClick={onAddClick}
        className="flex items-center gap-2 bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] text-white px-6 py-3 rounded-xl shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
      >
        <Plus size={20} />
        Ajouter un produit
      </button>
    </div>
  );
}
