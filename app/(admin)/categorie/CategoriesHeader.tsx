import { Plus } from "lucide-react";

type Props = {
  onAddClick: () => void;
};

export default function CategoriesHeader({ onAddClick }: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] bg-clip-text text-transparent mb-2">
          Gestion des Catégories
        </h1>
        <p className="text-gray-600">
          Gérez et organisez vos catégories de produits
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="px-6 py-3 bg-gradient-to-r from-[#8352a5] to-[#6b3d8f] text-white rounded-xl hover:from-[#6b3d8f] hover:to-[#5a2c7a] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Nouvelle Catégorie
      </button>
    </div>
  );
}
